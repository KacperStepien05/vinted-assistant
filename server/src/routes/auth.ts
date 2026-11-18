import { Router } from "express"
import { z } from "zod";


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

    res.status(201).json({ email })

})





