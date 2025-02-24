// Package Imports
import express from "express";
import bodyParser from 'body-parser';

// Routes
import RENDER_ROUTE from "@/routes/render"

// Declarations and Initializations
const app = express();
const PORT = Bun.env.PORT || 5050

// Optimization Middleware Setup
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

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