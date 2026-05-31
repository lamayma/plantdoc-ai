# PlantDoc Rules

## Project Shape

- This project is a static landing page plus supporting local automation files.
- Keep the first viewport product-first: explain the system, not a photo-upload demo.
- Use the existing single-file HTML approach unless there is a strong reason to split it.

## UI / UX

- Prefer calm, dense, professional SaaS styling over marketing-page decoration.
- Use real bitmap assets for the hero when the subject matters.
- Keep typography restrained and legible. Avoid oversized decorative UI.
- Do not reintroduce photo galleries, upload cards, or carousels unless the user explicitly asks.
- Keep the primary CTA obvious and the navigation short.
- Make empty space intentional and preserve clear visual hierarchy on desktop and mobile.

## Styling

- Use CSS variables for colors, radius, shadows, and spacing.
- Avoid hardcoded one-off color values if a token already exists.
- Keep backgrounds subtle and layered, but avoid bokeh/orb decoration.
- Keep controls compact and consistent with the existing dark botanical palette.

## Automation / n8n

- The `n8n-workflow.json` file is part of the product, not an example.
- Do not rely on strict JSON output from `llava-phi3`; prefer tolerant text parsing.
- Keep webhook contracts stable and remove endpoints that the site no longer uses.
- Favor local-first flows: Ollama on localhost, n8n orchestration, SQLite storage.

## Assets

- Keep project-specific assets in the project root or a dedicated asset folder.
- Reuse existing assets before generating new ones.
- Name new assets clearly and avoid placeholder filenames in production-facing code.

## Verification

- Check desktop layout first, then mobile layout.
- Verify that text never overlaps itself or nearby content.
- If the page claims a runtime or integration, make sure the code path exists.
