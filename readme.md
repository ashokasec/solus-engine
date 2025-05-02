# Solus Engine

**Solus Engine** is a Node.js-based service that renders JSX email templates into HTML using `@react-email/render`.

## Features

- Accepts JSX email templates via API.
- Saves the templates as files for processing.
- Renders JSX templates into plain HTML.

## Behind the scenes

Now, you might be thinking that I’m just using **@react-email/render** to convert JSX into an email template and have overcomplicated the whole thing just to look cool. You might also consider other ways to build this, like doing everything directly in **Next.js** (both frontend and backend).

At first glance, that might seem like a viable option. However, I’ve tried and tested this approach, and it simply **doesn’t work in production**. It will only function in the development environment because everything runs on **TypeScript** with **Hot Module Replacement (HMR)**. But in production, there are several roadblocks:

- **TypeScript & JSX Compilation Issues** – In production, Next.js compiles TypeScript and JSX into plain JavaScript. Since the templates rely on JSX, they won’t be recognized at runtime.

- **ESM Import Restrictions** – Next.js expects dynamic imports to have a static path or a proper ES module. Trying something like `import(templateUrl)` with a variable doesn’t work because Next.js doesn’t know the file path in advance.

- **Module Import Issues** – Even if Next.js somehow managed to recognize the JSX file, it would still fail when trying to import required packages inside the email template at runtime.

I’ve explored this approach in depth, but it simply doesn’t hold up in production. That’s why a different method is necessary.

This is why a different approach is needed to handle email template rendering dynamically in a scalable way.

**_I WAS WRONG_ :)**

## Deprecated: Solus Engine Integration

After spending a lot of time building **Solus Engine**, I came to the realization that it wasn’t the most efficient solution for rendering React-based email templates. The approach ended up being **too expensive** to maintain, especially when scaling. The use of **Docker containers** for every template just added too much overhead.

So, what’s the deal? Well, here’s the twist—I initially created **Solus Engine** out of pure curiosity. I was excited to build something new and different, and I went all in on it. It worked, but it wasn’t long before I discovered something **100x better**—**Babel in the browser**. I didn’t even know it was possible to directly render JSX code in the browser until I dug deeper.

In the end, **Solus Engine** is now **deprecated** for this use case. If you’re looking to dynamically render JSX email templates, there are much simpler and more **cost-effective solutions** available. I recommend exploring **Babel in the browser** or other in-browser templating options.

It was a fun experiment, and I learned a lot in the process. Sometimes, building something just to realize there's a better solution is the best way to grow.
