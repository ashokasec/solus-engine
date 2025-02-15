import express, { type Request, type Response } from "express";
import {
  renderStoredEmailTemplate,
  saveAndRenderEmailTemplate,
} from "@/controllers/render";

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
  try {
    await saveAndRenderEmailTemplate(req, res);
  } catch (error) {
    console.error("Error in the route handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

route.get("/", async (req: Request, res: Response) => {
  try {
    await renderStoredEmailTemplate(req, res);
  } catch (error) {
    console.error("Error in the route handler:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default route;
