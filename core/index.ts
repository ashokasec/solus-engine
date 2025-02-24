// Solus Engine - A utility for rendering JSX email templates.

import React from "react";
import { promises as fs } from 'fs';
import { render } from "@react-email/render";
import path from "path";
import { pathToFileURL } from "url";

const APPLICATION_DIR = process.cwd();

/**
 * Renders a JSX email template to HTML.
 *
 * This function dynamically imports a React JSX email template,
 * and then renders it to an HTML string using the `@react-email/render` library.
 *
 * @returns {Promise<string>} - A promise that resolves to the rendered HTML string of the email template.
 *
 * @example
 * // Example usage:
 * const emailHtml = await renderEmailTemplate();
 * console.log(emailHtml); // Renders the "email-template.tsx" template to HTML
 */

export const renderEmailTemplate = async () => {
    const template = path.join(APPLICATION_DIR, "email-template.tsx");

    let fileExists = true;
    try {
        await fs.access(template);
    } catch {
        fileExists = false;
    }

    if (!fileExists) {
        throw new Error("Template file not found.");
    }

    const templateUrl = pathToFileURL(template).href;
    const importedModule = await import(templateUrl);

    if (!importedModule || !importedModule.default) {
        throw new Error("Failed to import email-template.tsx");
    }

    const CurrentTemplate = importedModule.default;
    if (typeof CurrentTemplate !== "function") {
        throw new Error(`email-template.tsx does not export a valid React component.`);
    }

    const html = await render(React.createElement(CurrentTemplate), { pretty: true });
    return html;
};

const result = await renderEmailTemplate()