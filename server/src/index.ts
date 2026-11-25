import express from "express";
import { sql } from "drizzle-orm";
import { db } from "./db/index.js";
import { authRouter } from "./routes/auth.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { itemsRouter } from "./routes/items.js"

const app = express()
app.set("trust proxy", 1);

const PgSession = connectPgSimple(session);

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET is not set. Add it to server/.env.");
}

app.use(
  session({
    store: new PgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
);

app.use(express.json())
app.use("/auth", authRouter)
app.use("/items", itemsRouter);

const PORT = Number(process.env.PORT ?? 3000)

app.get("/health", async (_req, res) => {
    try {
        await db.execute(sql`SELECT 1`);
        res.json( {status: "ok", db: "ok"} ) 
    } catch (err) {
        console.error("Health check: database unreachable", err)
        res.status(503).json( {status: "error", db: "down"} )
    }
})


app.listen(PORT, (err) => {
    if(err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
    console.log("Server running on PORT", PORT);
})

