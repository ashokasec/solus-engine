import { decodeFromBase64 } from "@/utils/base-64-transform";
import { renderStoredJsxEmailToHtml, TEMPLATES_DIR } from "@/utils/solus-engine";
import type { Request, Response } from "express";
import { mkdir } from "fs/promises";
import { writeFile, exists } from "fs/promises";

export const saveAndRenderEmailTemplate = async (req: Request, res: Response) => {
    // Destructuring the request body
    const { templateSlug, emailTemplate: endcodedEmailTemplate } = req.body;
    console.log("chekin")

    // Validation check for missing fields
    if (!templateSlug || !endcodedEmailTemplate) {
        return res.status(400).json({ error: "Both 'templateSlug' and 'emailTemplate' are required" });
    }

    if (typeof templateSlug !== "string" || templateSlug.trim() === "") {
        return res.status(400).json({ error: "'templateSlug' must be a non-empty string" });
    }

    if (typeof endcodedEmailTemplate !== "string" || endcodedEmailTemplate.trim() === "") {
        return res.status(400).json({ error: "'endcodedEmailTemplate' must be a non-empty string" });
    }

    // Save the email template file
    try {
        const emailTemplate = decodeFromBase64(endcodedEmailTemplate)
        await mkdir(TEMPLATES_DIR, { recursive: true });
        await writeFile(`${TEMPLATES_DIR}/${templateSlug}.tsx`, emailTemplate, "utf-8");
        console.log("File saved successfully!");
        const html = await renderStoredJsxEmailToHtml(templateSlug);

        return res.status(200).json({ html: html });
    } catch (error) {
        console.error("Error saving file:", error);
        return res.status(500).json({ error: "Failed to save the email template" });
    }
};


export const renderStoredEmailTemplate = async (req: Request, res: Response) => {
    // Access the templateSlug from the query parameters
    const templateSlug = req.headers['powder-email-code'];

    // Check if templateSlug exists
    if (!templateSlug || typeof templateSlug !== "string") {
        return res.status(400).json({ error: "Template slug is required and must be a string" });
    }

    try {
        // Render the email template to HTML
        const html = await renderStoredJsxEmailToHtml(templateSlug);

        // Send the rendered HTML as a response
        res.send(html);
    } catch (error) {
        console.error("Error rendering the email template:", error);
        res.status(500).json({ error: "Failed to render the email template" });
    }
};