import "dotenv/config";
import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import WebSocket from "ws";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required to connect to Neon Postgres.");
}

// Node does not expose a WebSocket constructor in every supported runtime.
// Neon needs one for its stateful Pool (and therefore Drizzle transactions).
// Browsers already provide this API, but server-side code must use `ws`.
neonConfig.webSocketConstructor = WebSocket;

// The HTTP adapter cannot keep a Postgres session, so it cannot run interactive
// transactions. The serverless Pool uses WebSockets, which allows Drizzle's
// `db.transaction()` calls to keep all queries on the same connection.
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle({ client: pool, schema });
