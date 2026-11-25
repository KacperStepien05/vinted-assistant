import { Router } from "express"
import { requireAuth } from "../middleware/requireAuth.js"
import { db } from "../db/index.js"
import { items } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";

export const itemsRouter = Router()

itemsRouter.get("/", requireAuth, async (req, res) => {
    const userId = req.session.userId
    if (!userId) {
        res.status(401).json({ error: "Not authenticated" });
        return;
    }

    const userItems = await db
    .select()
    .from(items)
    .where(eq(items.userId, userId))
    .orderBy(desc(items.createdAt))

    res.status(200).json(userItems)
})


const itemsSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().optional(),
    brand: z.string().optional(),
    category: z.string().optional(),
    size: z.string().optional(),
    condition: z.string().optional(),
    buyPrice: z.number().int().nonnegative().optional(),
    listPrice: z.number().int().nonnegative().optional(), 
})


itemsRouter.post("/", requireAuth, async (req, res) => {
    const userId = req.session.userId;
    if(!userId) {
        res.status(401).json({ error: "Not authenticated" });
        return
    }

    const result = itemsSchema.safeParse(req.body);
    if (!result.success) {
        res.status(400).json({ error: result.error.issues[0]?.message ?? "Invalid input" });
        return;
    }

    const [item] = await db
    .insert(items)
    .values({ ...result.data, userId })
    .returning();

    res.status(201).json(item)
})