import { Router } from "express"
import { z } from "zod";
import bcrypt from "bcrypt";
import { users } from "../db/schema.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";

export const authRouter = Router() 

const registerSchema = z.object({
    email: z.string().trim().toLowerCase().pipe(z.email("Invalid email")),
    password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password cannot exceed 64 characters")
});

authRouter.post("/register", async (req, res) => {
    const result = registerSchema.safeParse(req.body)

    if(!result.success) {
        res.status(400).json({ errors: z.flattenError(result.error) })
        return
    }

    const { email, password } = result.data
    
    const existing = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email));

        if (existing.length > 0) {
        res.status(409).json({ error: "Email already registered" });
        return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const [user] = await db
        .insert(users)
        .values({ email, passwordHash })
        .returning({     
            id: users.id,
            email: users.email,
            createdAt: users.createdAt, 
        });

    if (!user) {
        throw new Error("User insert returned no row");
    }

    res.status(201).json({ id: user.id, email: user.email, createdAt: user.createdAt})
})





