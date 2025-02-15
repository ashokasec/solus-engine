# Solus Engine

Solus Engine is a Node.js-based service that renders JSX email templates into HTML using `@react-email/render`.

## Features

- Accepts JSX email templates via API.
- Saves the templates as files for processing.
- Renders JSX templates into plain HTML.
- Optimized for efficiency using `compression`.

## Flow of Execution

1. **Receiving the Request:**
   - The server listens for `POST /render` requests containing a Base64-encoded JSX email template and a template slug.
   - The request body is parsed, and basic validation is performed to ensure necessary fields are present.

2. **Decoding and Storing the Template:**
   - The Base64-encoded JSX template is decoded into its original JSX format.
   - The decoded JSX file is saved in the `src/email-store/` directory under the provided template slug.

3. **Rendering the Email Template:**
   - The stored JSX file is dynamically imported and rendered into HTML using `@react-email/render`.
   - The rendered HTML output is sent back in the response.

4. **Retrieving Stored Templates:**
   - A `GET /render` request with the `powder-email-code` header retrieves a stored email template by its slug.
   - The corresponding JSX file is located and rendered into HTML before being returned in the response.

## Installation

### Prerequisites

- Node.js (v18+ recommended)
- Bun runtime

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/ashokasec/solus-engine.git
   cd solus-engine
   ```
2. Install dependencies:
   ```sh
   bun install --use-lockfile
   ```
3. Start the server:
   ```sh
   bun run dev
   ```

## API Usage

### 1. Render Email from JSX Code

#### Endpoint: `POST /render`

##### Request Body:

```json
{
  "templateSlug": "welcome-email",
  "emailTemplate": "<Base64 Encoded react-email JSX code>"
}
```

##### Response:

```json
{
  "html": "<Rendered HTML Output>"
}
```

### 2. Retrieve Stored Email Template

#### Endpoint: `GET /render`

##### Headers:

```json
{
  "powder-email-code": "welcome-email"
}
```

##### Response:

```html
<!DOCTYPE html>...
```

## Security Considerations

Currently, Solus Engine does not implement any sandboxing or strict validation mechanisms for JSX execution. This means uploaded JSX code runs with the same privileges as the server. Users should be aware of potential security risks, such as executing untrusted code, and take necessary precautions when using this service.