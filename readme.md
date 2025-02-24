# Solus Engine

Solus Engine is a Node.js-based service that renders JSX email templates into HTML using `@react-email/render`.

## Features

- Accepts JSX email templates via API.
- Saves the templates as files for processing.
- Renders JSX templates into plain HTML.

## Behind the scenes

Now, you might be thinking that I'm just using @react-email/render to convert JSX into an email template and have overcomplicated the whole thing just to look cool. You might also consider other ways to build this, like doing everything directly in Next.js (both frontend and backend).

At first glance, that might seem like a viable option. However, I’ve tried and tested this approach, and it simply doesn’t work in production. It will only function in the development environment because everything runs on TypeScript with Hot Module Replacement (HMR). But in production, there are several roadblocks:

- TypeScript & JSX Compilation Issues – In production, Next.js compiles TypeScript and JSX into plain JavaScript. Since the templates rely on JSX, they won’t be recognized at runtime.

- ESM Import Restrictions – Next.js expects dynamic imports to have a static path or a proper ES module. Trying something like import(templateUrl) with a variable doesn’t work because Next.js doesn’t know the file path in advance.

- Module Import Issues – Even if Next.js somehow managed to recognize the JSX file, it would still fail when trying to import required packages inside the email template at runtime.

I’ve explored this approach in depth, but it simply doesn’t hold up in production. That’s why a different method is necessary.

This is why a different approach is needed to handle email template rendering dynamically in a scalable way.

