import { pbkdf2Sync, randomBytes } from "node:crypto";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const iterations = 310_000;
const input = createInterface({ input: stdin, output: stdout });
const password = await input.question("Mot de passe administrateur (12 caractères minimum) : ");
input.close();

if (password.length < 12) {
  throw new Error("Le mot de passe doit contenir au moins 12 caractères.");
}

const salt = randomBytes(16);
const hash = pbkdf2Sync(password, salt, iterations, 32, "sha256");
const base64url = (value: Buffer) => value.toString("base64url");
console.log(`pbkdf2$${iterations}$${base64url(salt)}$${base64url(hash)}`);
