# Binks Homes

Custom home builder website for Binks Homes.

## Local development

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open [http://localhost:5173](http://localhost:5173)

## Forms

Contact and warranty submissions are sent to `admin@binkshomes.org` via FormSubmit.
Update the address in `src/lib/formConfig.js` if needed.

On first use, submit a test form and confirm the activation email sent to that inbox.

## Deploy

The site deploys to AWS S3 + CloudFront via GitHub Actions (manual workflow dispatch).
Configure these GitHub secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`,
`AWS_REGION`, `S3_BUCKET`, and `CLOUDFRONT_DISTRIBUTION_ID`.

## Build

```bash
npm run build
```

Output is written to `dist/`.
