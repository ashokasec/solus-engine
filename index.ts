// Package Imports
import express, { type NextFunction, type Request, type Response } from "express";
import bodyParser from 'body-parser';

// Routes
import RENDER_ROUTE from "@/routes/render"

// Declarations and Initializations
const app = express();
const PORT = Bun.env.PORT || 5050

// Optimization Middleware Setup
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req: Request, res: Response, next: NextFunction) => {
    const INCOMING_API_KEY = req.header("Authorization")?.split(" ")[1];
    console.log(Bun.env.SOLUS_API_KEY)
    if (!INCOMING_API_KEY) {
        res.status(401).json({ error: "Unauthorized: No token provided" });
        return
    }
    if (INCOMING_API_KEY === Bun.env.SOLUS_API_KEY) {
        return next()
    }
    res.status(401).json({ error: "Forbidden: Invalid API Key" });
    return
})

// Applications Routes
app.use("/render", RENDER_ROUTE)

// Starting the App
app.listen(PORT, async () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(`🥲 Failed to start the server on port ${PORT}`);
    }
});