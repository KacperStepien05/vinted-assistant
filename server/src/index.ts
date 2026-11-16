import express from "express";

const app = express()

const PORT = Number(process.env.PORT ?? 3000)

app.get("/health", (_req, res) => {
    res.json( {status: "ok"} )
})

app.listen(PORT, function(err) {
    if(err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
    console.log("Server running on PORT", PORT);
})
