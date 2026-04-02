# GiftClarity

GiftClarity is a minimal AI-assisted gifting decision app for helping users choose a meaningful gift direction before picking a product.

It is intentionally not a marketplace, shopping catalog, or discount experience. The product focuses on reducing uncertainty and helping the user feel socially confident in their choice.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Local storage for session persistence
- Isolated server route for AI generation with deterministic mock fallback

## Project structure

```text
app/
  api/generate/route.ts
  gift/page.tsx
  summary/page.tsx
  page.tsx
components/
  gift-flow.tsx
  ui.tsx
lib/
  ai.ts
  data.ts
  mock-ai.ts
  storage.ts
  types.ts
```

## Setup

1. Install Node.js 20 or newer.
2. Install dependencies:

```bash
npm install
```

3. Optional: add a real AI key in `.env.local`:

```bash
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
```

If no API key is present, the app uses deterministic local logic so the flow still works for demos.

## Run locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

## What is included

- Landing page with product positioning and CTA
- Guided multi-step gifting form
- Gift Direction + Example Ideas + Why This Works + Confidence Prompt output
- Try another angle and refine flow
- Summary page with copy and download
- Local session persistence
- Demo-ready preset scenarios

## Suggested demo inputs

### 1. Anniversary partner

- Relationship: `partner`
- Occasion: `anniversary`
- Traits: `sentimental`, `fitness-focused`, `introvert`
- Interests: `Morning runs, journaling, wellness routines`
- Intent: `appreciation`
- Budget: `$50-$100`
- Context: `They have been consistent all year and I want the gift to feel personal and observant.`

Expected direction: personalized, meaningful, fitness-adjacent.

### 2. Practical sibling

- Relationship: `sibling`
- Occasion: `birthday`
- Traits: `practical`, `minimal`, `creative`
- Interests: `Home coffee, organizing spaces, sketching`
- Intent: `care`
- Budget: `$25-$60`
- Context: `They love useful gifts but still notice small thoughtful details.`

Expected direction: useful-but-thoughtful with a personal edge.

### 3. Appreciative colleague

- Relationship: `colleague`
- Occasion: `celebration`
- Traits: `practical`, `extrovert`
- Interests: `Stationery, hosting team rituals, staying organized`
- Intent: `gratitude`
- Budget: `$20-$40`
- Context: `I want to thank them without making the gift feel too intimate.`

Expected direction: warm, appreciative, and appropriately professional.
