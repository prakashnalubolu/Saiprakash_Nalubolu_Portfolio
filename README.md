# Saiprakash Nalubolu — Portfolio

Personal portfolio built with React, Vite, Tailwind CSS and TypeScript. Sections include intro, experience, education, achievements, projects (with links and images), references, and contact.

## Local Development

1) Install deps

```sh
npm install
```

2) Run dev server

```sh
npm run dev
```

3) Build

```sh
npm run build
```

## Contact Form Email (Vercel)

This project includes a Vercel Serverless Function at `/api/contact` to send emails via Resend.

On Vercel, set these environment variables:

- `RESEND_API_KEY`
- `CONTACT_TO` (destination email)
- `CONTACT_FROM` (e.g., `Portfolio <onboarding@resend.dev>` or your domain sender)

The form will POST to `/api/contact` and you will receive an email with the details.

## Project Images

Place project preview images in `public/projects/` and name them:

- `kitchbot.jpg`, `samethalu.jpg`, `toxicity.jpg`, `ocr.jpg`, `tsa.jpg`, `pokemon.jpg`

## License

Private repository. All rights reserved.
