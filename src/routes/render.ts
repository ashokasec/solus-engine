import { renderTemplateWithDocker, saveTemplateAndRenderIt } from "@/controllers/render";
import express, { type Request, type Response } from "express";

const route = express.Router();

route.get("/", async (req: Request, res: Response) => {
    try {
        const html = await renderTemplateWithDocker("sample");
        res.status(200).json({ html });
    } catch (error) {
        console.error("Error in the route handler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

route.post("/", async (req: Request, res: Response) => {
    try {
        await saveTemplateAndRenderIt(req, res)
    } catch (error) {
        console.error("Error in the route handler:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default route;