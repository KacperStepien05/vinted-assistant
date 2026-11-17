import { drizzle } from "drizzle-orm/node-postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Copy server/.env.example to server/.env and fill it in.");
}

export const db = drizzle(databaseUrl);