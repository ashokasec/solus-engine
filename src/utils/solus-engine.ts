// Solus Engine - A utility for rendering JSX email templates.

import React from "react";
import { promises as fs } from 'fs';
import { render } from "@react-email/render";
import path from "path";
import { pathToFileURL } from "url";

const APPLICATION_DIR = process.cwd();
export const TEMPLATES_DIR = path.join(APPLICATION_DIR, "src", "email-store");

/**
 * Renders a JSX email template to HTML.
 * 
 * This function dynamically imports a React JSX email template based on the provided `templateSlug`,
 * and then renders it to an HTML string using the `@react-email/render` library.
 *
 * @param {string} templateSlug - The slug or name of the template to render (without the .tsx extension).
 * 
 * @returns {Promise<string>} - A promise that resolves to the rendered HTML string of the email template.
 * 
 * @example
 * // Example usage:
 * const emailHtml = await renderStoredJsxEmailToHtml("welcome-email");
 * console.log(emailHtml); // Renders the "welcome-email.tsx" template to HTML
 */

export const renderStoredJsxEmailToHtml = async (templateSlug: string) => {
    const templatePath = path.join(TEMPLATES_DIR, `${templateSlug}.tsx`);

    try {
        // Check if the file exists
        await fs.access(templatePath);

        // If file exists, dynamically import the template
        const templateUrl = pathToFileURL(templatePath).href;
        const { default: CurrentTemplate } = await import(templateUrl);

        // Render the template to HTML
        const html = await render(React.createElement(CurrentTemplate), { pretty: true });

        return html;
    } catch (error) {
        console.log(error)
        throw new Error(`Template file "${templateSlug}.tsx" not found in "${TEMPLATES_DIR}"`);
    }
};