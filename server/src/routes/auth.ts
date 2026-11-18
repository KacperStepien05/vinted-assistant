import { Router } from "express"

export const authRouter = Router() 

authRouter.post("/register", async (req, res) => {
    res.status(201).json( { received: req.body } )
})