import path from "path";
import { generateUniqueName } from "../../dict";
import type { Request, Response } from "express";
import { spawn } from "child_process";
import { promises as fs } from "fs";

const CURRENT_DIR = process.cwd()
const TEMPLATE_DIR = path.join(CURRENT_DIR, "templates");

const encodeToBase64 = (data: string): string => {
    return Buffer.from(data).toString('base64');
};

const decodeFromBase64 = (base64Data: string): string => {
    return Buffer.from(base64Data, 'base64').toString('utf-8');
};

export async function fileExists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}

export function getNewTemplatePath(name: string) {
    return path.join(TEMPLATE_DIR, `${name}.solus`)
}

export async function saveTemplateAndRenderIt(req: Request, res: Response) {
    const { data: encodedData } = req.body;
    const filename = generateUniqueName()
    await Bun.write(`${getNewTemplatePath(filename)}`, decodeFromBase64(encodedData))
    return filename
}

export async function renderTemplateWithDocker(filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const templatePath = getNewTemplatePath(filename);
        console.log(`Running Docker with template: ${templatePath}`);

        const process = spawn("docker", [
            "run",
            "--rm",
            "-v",
            `${templatePath}:/home/app/email-template.tsx`,
            "solus-engine-core",
        ]);

        let output = "";
        let errorOutput = "";

        process.stdout.on("data", (data) => {
            output += data.toString();
        });

        process.stderr.on("data", (data) => {
            errorOutput += data.toString();
            console.error("Docker Error:", data.toString());
        });

        process.on("close", (code) => {
            if (code === 0) {
                resolve(output.trim());
            } else {
                reject(new Error(`Docker process failed with code ${code}: ${errorOutput}`));
            }
        });

        process.on("error", (err) => {
            reject(err);
        });
    });
}