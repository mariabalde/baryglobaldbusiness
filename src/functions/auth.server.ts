import { config as loadEnv } from "dotenv";
import { getRequestHeader, setResponseHeader } from "@tanstack/react-start/server";

// In local development, ensure values saved in .env win over values left in a
// terminal session from an earlier run. Production continues to use the host's
// configured secrets.
loadEnv({ override: process.env.NODE_ENV !== "production" });

const encoder = new TextEncoder();
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;

type AdminSession = { email: string; exp: number };

function env(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required server secret: ${name}`);
  return value;
}

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function fromBase64Url(value: string) {
  const padded = value
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function hmac(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(env("SESSION_SECRET")),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value)));
}

function cookieName() {
  return process.env.NODE_ENV === "production" ? "__Host-bgb-admin" : "bgb-admin";
}

function readCookie(name: string) {
  const raw = getRequestHeader("cookie");
  if (!raw) return null;
  for (const entry of raw.split(/;\s*/)) {
    const index = entry.indexOf("=");
    if (index !== -1 && entry.slice(0, index) === name) return entry.slice(index + 1);
  }
  return null;
}

export async function issueAdminSession(email: string) {
  const payload = toBase64Url(
    encoder.encode(
      JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS }),
    ),
  );
  const token = `${payload}.${toBase64Url(await hmac(payload))}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  setResponseHeader(
    "Set-Cookie",
    `${cookieName()}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure}`,
  );
}

export function clearAdminSession() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  setResponseHeader(
    "Set-Cookie",
    `${cookieName()}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secure}`,
  );
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = readCookie(cookieName());
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = toBase64Url(await hmac(payload));
  if (signature.length !== expected.length) return null;
  let mismatch = 0;
  for (let index = 0; index < signature.length; index += 1)
    mismatch |= signature.charCodeAt(index) ^ expected.charCodeAt(index);
  if (mismatch !== 0) return null;
  try {
    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as AdminSession;
    return session.exp > Math.floor(Date.now() / 1000) && session.email === env("ADMIN_EMAIL")
      ? session
      : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) throw new Error("Non autorisé");
  return session;
}

export async function verifyAdminPassword(password: string) {
  // ADMIN_PASSWORD_HASH format: pbkdf2$iterations$base64url-salt$base64url-hash
  const [algorithm, iterationRaw, saltRaw, hashRaw] = env("ADMIN_PASSWORD_HASH").split("$");
  if (algorithm !== "pbkdf2" || !iterationRaw || !saltRaw || !hashRaw) return false;
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const derived = new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: fromBase64Url(saltRaw),
        iterations: Number(iterationRaw),
      },
      key,
      256,
    ),
  );
  const expected = fromBase64Url(hashRaw);
  if (derived.length !== expected.length) return false;
  let mismatch = 0;
  for (let index = 0; index < derived.length; index += 1)
    mismatch |= derived[index] ^ expected[index];
  return mismatch === 0;
}
