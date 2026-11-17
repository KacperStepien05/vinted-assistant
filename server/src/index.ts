import express from "express";
import { sql } from "drizzle-orm";
import { db } from "./db/index.js";

const app = express()

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

