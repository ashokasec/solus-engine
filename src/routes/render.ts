import { fileExists, getNewTemplatePath, renderTemplateWithDocker, saveTemplateAndRenderIt } from "@/controllers/render";
import express, { type Request, type Response } from "express";

const route = express.Router();

route.get("/", async (req: Request, res: Response) => {
    const slug = req.query.id as string

    if (!slug || slug.length < 22 || slug.length > 30 || !/^[A-Za-z0-9-]+$/.test(slug)) {
        res.status(404).send("Not Found");
        return
    }

    const templatePath = getNewTemplatePath(slug)
    if (!(await fileExists(templatePath))) {
        res.status(404).send("Not Found");
        return
    }

    try {
        const html = await renderTemplateWithDocker(slug);
        res.status(200).send(html)
    } catch (error) {
        const err = error as Error
        console.error("Error in the route handler:", error);
        res.status(500).json({
            success: false,
            message: Bun.env.SERVER_ENV === "production" ? "Internal Server Error" : err.message,
        });
    }
});

route.post("/", async (req: Request, res: Response) => {
    try {
        const filename = await saveTemplateAndRenderIt(req, res)
        res.status(201).json({ "msg": "file created", filename: filename })
    } catch (error) {
        const err = error as Error
        console.error("Error in the route handler:", error);
        res.status(500).json({
            success: false,
            message: Bun.env.SERVER_ENV === "production" ? "Internal Server Error" : err.message,
        });
    }
});

export default route;