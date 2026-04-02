import type { GiftFormData, GiftResult, TonePreference } from "@/lib/types";

const interestKeywordMap = [
  {
    keywords: ["fitness", "run", "gym", "workout", "wellness"],
    theme: "their love of consistency and wellness",
    ideas: ["Custom gym journal", "Engraved water bottle", "Recovery self-care kit"]
  },
  {
    keywords: ["coffee", "tea", "brew"],
    theme: "their everyday ritual around coffee and comfort",
    ideas: ["Ceramic pour-over set", "Personalized coffee tasting journal", "Curated slow-morning kit"]
  },
  {
    keywords: ["art", "design", "draw", "sketch", "creative"],
    theme: "their creative perspective and urge to make things",
    ideas: ["Premium sketchbook", "Artist date experience voucher", "Desk inspiration object"]
  },
  {
    keywords: ["travel", "trip", "adventure", "hike"],
    theme: "their curiosity and appetite for new experiences",
    ideas: ["Adventure memory book", "Compact travel utility pouch", "Map-based keepsake print"]
  },
  {
    keywords: ["book", "read", "journal", "writing"],
    theme: "their reflective side and love of quiet depth",
    ideas: ["Annotated journal set", "Embossed reading log", "Cozy reflection kit"]
  }
];

function pickInterestTheme(interests: string) {
  const lower = interests.toLowerCase();

  for (const entry of interestKeywordMap) {
    if (entry.keywords.some((keyword) => lower.includes(keyword))) {
      return entry;
    }
  }

  return {
    theme: "what naturally matters to them in daily life",
    ideas: ["Personalized daily-use item", "Thoughtful ritual kit", "Keepsake with a practical purpose"]
  };
}

function uniqueIdeas(ideas: string[]) {
  return Array.from(new Set(ideas)).slice(0, 3);
}

function buildDirection(inputs: GiftFormData, tone: TonePreference, angle: number) {
  const traits = new Set(inputs.traits);
  const interestTheme = pickInterestTheme(inputs.interests);
  const relationship = inputs.relationship || "someone important";
  const expression = inputs.expression || "care";

  const practicalBias = traits.has("practical") || tone === "practical";
  const sentimentalBias = traits.has("sentimental") || tone === "sentimental";

  if (relationship === "partner" && sentimentalBias) {
    return "A personalized wellness gift that feels observant and encouraging";
  }

  if (practicalBias) {
    return "A useful gift with a thoughtful personal edge";
  }

  if (expression === "appreciation" || expression === "gratitude") {
    return "A thoughtful gift that clearly shows appreciation";
  }

  if (angle % 2 === 1) {
    return "An experience-led gift that feels personal and memorable";
  }

  if (interestTheme.theme.includes("wellness")) {
    return "A personalized wellness gift that feels motivating";
  }

  if (interestTheme.theme.includes("coffee")) {
    return "A comfort-focused coffee gift that feels considered";
  }

  if (interestTheme.theme.includes("creative")) {
    return "A creative gift that feels personal and inspiring";
  }

  return "A meaningful gift direction that feels personal, not generic";
}

function buildIdeas(inputs: GiftFormData, tone: TonePreference, angle: number) {
  const interestTheme = pickInterestTheme(inputs.interests);
  const traits = new Set(inputs.traits);
  const practicalBias = traits.has("practical") || tone === "practical";
  const sentimentalBias = traits.has("sentimental") || tone === "sentimental";
  const extras: string[] = [];

  if (sentimentalBias) {
    extras.push("Letter-plus-keepsake bundle", "Personalized memory object");
  }

  if (practicalBias) {
    extras.push("Upgraded daily essential", "Organized routine kit");
  }

  if (angle % 2 === 1) {
    extras.unshift("Planned shared experience");
  }

  if (inputs.expression === "encouragement") {
    extras.push("Motivation ritual set");
  }

  return uniqueIdeas([...interestTheme.ideas, ...extras]);
}

function buildWhy(inputs: GiftFormData, tone: TonePreference) {
  const traits = new Set(inputs.traits);
  const interestTheme = pickInterestTheme(inputs.interests);
  const parts: string[] = [];

  if (interestTheme.theme.includes("wellness")) {
    parts.push("Matches their interest in wellness and routine");
  } else if (interestTheme.theme.includes("coffee")) {
    parts.push("Fits the rituals and comforts they already enjoy");
  } else if (interestTheme.theme.includes("creative")) {
    parts.push("Connects to their creative taste and habits");
  } else if (interestTheme.theme.includes("experiences")) {
    parts.push("Aligns with their curiosity and appetite for new experiences");
  } else {
    parts.push("Reflects what they naturally care about");
  }

  if (traits.has("practical") || tone === "practical") {
    parts.push("Feels useful enough to fit into real life");
  }

  if (traits.has("sentimental") || tone === "sentimental") {
    parts.push("Feels personal rather than generic");
  }

  if (inputs.expression === "appreciation" || inputs.expression === "gratitude") {
    parts.push("Clearly expresses recognition and care");
  } else if (inputs.expression === "encouragement") {
    parts.push("Carries a supportive and encouraging tone");
  } else if (inputs.expression === "celebration") {
    parts.push("Keeps the mood celebratory without feeling generic");
  }

  if (inputs.budget) {
    parts.push(`Stays realistic within a ${inputs.budget} range`);
  }

  if (parts.length < 3) {
    parts.push("Feels considered enough to stand out");
  }

  return parts.slice(0, 3);
}

function buildConfidence(inputs: GiftFormData, tone: TonePreference, angle: number) {
  const base = 67 + Math.min(inputs.traits.length * 4, 12);
  const toneBoost = tone === "balanced" ? 6 : 3;
  const contextBoost = inputs.context.trim() ? 8 : 0;
  const score = Math.min(base + toneBoost + contextBoost - angle * 2, 96);

  return {
    score,
    reassurance:
      score >= 82
        ? "Strong fit"
        : score >= 72
          ? "Good fit, with room to refine"
          : "Worth adjusting before deciding"
  };
}

export function generateMockGiftResult(
  inputs: GiftFormData,
  tone: TonePreference = "balanced",
  angle = 0
): GiftResult {
  const direction = buildDirection(inputs, tone, angle);
  const exampleIdeas = buildIdeas(inputs, tone, angle);
  const whyThisWorks = buildWhy(inputs, tone);
  const confidence = buildConfidence(inputs, tone, angle);

  return {
    direction,
    exampleIdeas,
    whyThisWorks,
    confidencePrompt: "Does this feel personal, memorable, and true to them?",
    confidenceScore: confidence.score,
    reassurance: confidence.reassurance
  };
}
