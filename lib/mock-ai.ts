import type { GiftFormData, GiftResult, TonePreference } from "@/lib/types";

const interestKeywordMap = [
  {
    keywords: ["fitness", "run", "gym", "workout", "wellness"],
    theme: "their love of consistency and wellness",
    ideas: [
      "Engraved steel water bottle",
      "Resistance band set",
      "Cork yoga mat",
      "Gym progress journal",
      "Whey shaker bottle",
      "Recovery massage roller"
    ]
  },
  {
    keywords: ["coffee", "tea", "brew"],
    theme: "their everyday ritual around coffee and comfort",
    ideas: [
      "South Indian filter coffee set",
      "Stoneware tea mug set",
      "Brass tea infuser",
      "Coffee tasting journal",
      "Manual milk frother",
      "Handcrafted coaster set"
    ]
  },
  {
    keywords: ["art", "design", "draw", "sketch", "creative"],
    theme: "their creative perspective and urge to make things",
    ideas: [
      "Linen-bound sketchbook",
      "Brush pen set",
      "Watercolor postcard kit",
      "Illustration desk lamp",
      "Fine liner set",
      "Art print portfolio folder"
    ]
  },
  {
    keywords: ["travel", "trip", "adventure", "hike"],
    theme: "their curiosity and appetite for new experiences",
    ideas: [
      "Passport wallet",
      "Travel utility pouch",
      "Scratch travel map",
      "Weekend duffel organizer",
      "Portable luggage scale",
      "Trip memory journal"
    ]
  },
  {
    keywords: ["book", "read", "journal", "writing"],
    theme: "their reflective side and love of quiet depth",
    ideas: [
      "Embossed reading journal",
      "Book annotation tabs set",
      "Clip-on reading lamp",
      "Linen bookmark set",
      "Writing desk folio",
      "Hardcover reflection notebook"
    ]
  },
  {
    keywords: ["stationery", "organize", "organization", "planner", "desk"],
    theme: "their love of order, clarity, and thoughtful tools",
    ideas: [
      "Hardcover weekly planner",
      "Brass pen set",
      "Canvas desk organizer",
      "Acrylic memo board",
      "Minimal cable organizer",
      "Desk tray set"
    ]
  },
  {
    keywords: ["host", "hosting", "gathering", "dinner", "party"],
    theme: "their enjoyment of hosting and bringing people together",
    ideas: [
      "Stoneware serving platter",
      "Mango wood snack board",
      "Linen napkin set",
      "Copper snack bowls",
      "Recipe card set",
      "Dessert plate set"
    ]
  },
  {
    keywords: ["music", "song", "playlist", "guitar"],
    theme: "their connection to music and shared mood",
    ideas: [
      "Vinyl-style Bluetooth speaker",
      "Personalized playlist plaque",
      "Desk headphone stand",
      "Acoustic guitar capo set",
      "Album memory journal",
      "Portable mini speaker"
    ]
  },
  {
    keywords: ["cooking", "kitchen", "baking", "recipe"],
    theme: "their joy in cooking and sharing food",
    ideas: [
      "Recipe journal",
      "Masala dabba spice box",
      "Apron with name embroidery",
      "Ceramic baking dish",
      "Wooden serving spoon set",
      "Kitchen conversion magnet"
    ]
  }
];

function shuffle<T>(items: T[]) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function buildGenericIdeas(inputs: GiftFormData, tone: TonePreference, angle: number) {
  const traits = new Set(inputs.traits);
  const ideas: string[] = [];

  if (traits.has("practical") || tone === "practical") {
    ideas.push(
      "Hardcover weekly planner",
      "Insulated stainless steel tumbler",
      "Canvas cable organizer",
      "Laptop sleeve",
      "Desk organizer tray",
      "Portable charger"
    );
  }

  if (traits.has("sentimental") || tone === "sentimental") {
    ideas.push(
      "Engraved keepsake box",
      "Custom photo frame",
      "Handwritten recipe journal",
      "Personalized star map print",
      "Memory jar set",
      "Name-engraved photo stand"
    );
  }

  if (traits.has("creative")) {
    ideas.push(
      "Linen-bound sketchbook",
      "Desk art print",
      "Watercolor postcard set",
      "Brush lettering set",
      "Color swatch notebook",
      "Creative prompt cards"
    );
  }

  if (traits.has("adventurous")) {
    ideas.push(
      "Scratch travel map",
      "Trail essentials pouch",
      "Compact picnic blanket",
      "Road trip snack caddy",
      "Travel journal kit",
      "Compact binoculars"
    );
  }

  if (traits.has("minimal")) {
    ideas.push(
      "Stoneware bedside tray",
      "Slim leather notebook",
      "Soft knit throw blanket",
      "Ceramic incense holder",
      "Neutral tote bag",
      "Minimal desk clock"
    );
  }

  if (inputs.expression === "appreciation" || inputs.expression === "gratitude") {
    ideas.push(
      "Engraved thank-you pen",
      "Soy candle jar",
      "Personal note card set",
      "Handcrafted chocolate box",
      "Brass bookmark",
      "Tea sampler gift tin"
    );
  }

  if (inputs.expression === "encouragement") {
    ideas.push(
      "Habit tracker planner",
      "Morning affirmation card set",
      "Desk motivation calendar",
      "Goal-setting workbook",
      "Mini vision board kit",
      "Wellness check-in journal"
    );
  }

  if (inputs.relationship === "colleague") {
    ideas.push("Brass pen set", "Desk organizer tray", "Tea sampler box", "Work tote organizer", "Coffee mug warmer");
  }

  if (inputs.relationship === "partner") {
    ideas.push(
      "Custom photo frame",
      "Monogrammed travel pouch",
      "Couple memory journal",
      "Date-night jar",
      "Personalized playlist plaque",
      "Polaroid photo album"
    );
  }

  if (inputs.relationship === "parent") {
    ideas.push(
      "Recipe journal",
      "Garden tool tote",
      "Personalized tea mug",
      "Devotional book stand",
      "Copper water bottle",
      "Handloom shawl"
    );
  }

  if (inputs.relationship === "sibling" || inputs.relationship === "friend") {
    ideas.push(
      "Portable mini speaker",
      "Board game set",
      "Custom phone case",
      "Snack hamper",
      "Movie night box",
      "Desk neon light"
    );
  }

  if (inputs.occasion === "festival") {
    ideas.push(
      "Diya gift set",
      "Dry fruit gift box",
      "Festive mithai hamper",
      "Handmade toran",
      "Brass urli bowl",
      "Scented candle duo"
    );
  }

  if (inputs.occasion === "birthday" || inputs.occasion === "celebration") {
    ideas.push(
      "Mini cake stand",
      "Celebration photo frame",
      "Customized name mug",
      "Instant camera album",
      "Keepsake memory box"
    );
  }

  if (angle % 2 === 1) {
    ideas.unshift("Pottery workshop pass", "Museum membership pass", "Cafe tasting voucher");
  }

  return uniqueIdeas(shuffle(ideas));
}

function pickInterestTheme(interests: string) {
  const lower = interests.toLowerCase();

  for (const entry of interestKeywordMap) {
    if (entry.keywords.some((keyword) => lower.includes(keyword))) {
      return entry;
    }
  }

  return {
    theme: "what naturally matters to them in daily life",
    ideas: []
  };
}

function uniqueIdeas(ideas: string[]) {
  return Array.from(new Set(ideas));
}

function buildItemTag(title: string, why: string) {
  if (title.toLowerCase().includes("journal") || title.toLowerCase().includes("memory") || title.toLowerCase().includes("keepsake")) {
    return "Personal";
  }

  if (title.toLowerCase().includes("kit") || title.toLowerCase().includes("set")) {
    return "Thoughtful";
  }

  if (why.toLowerCase().includes("useful") || why.toLowerCase().includes("routine")) {
    return "Useful";
  }

  return "Meaningful";
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
    extras.push("Engraved keepsake box", "Custom photo frame");
  }

  if (practicalBias) {
    extras.push("Insulated stainless steel tumbler", "Canvas cable organizer");
  }

  if (angle % 2 === 1) {
    extras.unshift("Pottery class booking for two");
  }

  if (inputs.expression === "encouragement") {
    extras.push("Habit tracker planner");
  }

  const genericIdeas = buildGenericIdeas(inputs, tone, angle);
  const combined = uniqueIdeas([...shuffle(interestTheme.ideas), ...shuffle(extras), ...genericIdeas]);

  return shuffle(combined).slice(0, 3);
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

function buildGiftItems(inputs: GiftFormData, ideas: string[], whyThisWorks: string[]) {
  const interestTheme = pickInterestTheme(inputs.interests);
  const contextNote = inputs.context.trim();

  return ideas.slice(0, 3).map((idea, index) => {
    const why = whyThisWorks[index] ?? "It fits the recipient context well.";
    const detailBase =
      interestTheme.theme.includes("wellness")
        ? "Supports their routines in a way that feels considered and easy to use."
        : interestTheme.theme.includes("coffee")
          ? "Builds on a ritual they already enjoy, so it feels familiar but upgraded."
          : interestTheme.theme.includes("creative")
            ? "Gives them something they can enjoy, use, or return to beyond one moment."
            : interestTheme.theme.includes("experiences")
              ? "Keeps the gift grounded in what excites them rather than a generic category."
              : "Turns your direction into a concrete item that still feels personal.";

    const contextSuffix = contextNote ? ` It also reflects the detail you shared: ${contextNote}.` : "";

    return {
      title: idea,
      description: `${detailBase}${contextSuffix}`.trim(),
      whySuggested: why,
      tag: buildItemTag(idea, why)
    };
  });
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
  const giftItems = buildGiftItems(inputs, exampleIdeas, whyThisWorks);
  const confidence = buildConfidence(inputs, tone, angle);

  return {
    direction,
    exampleIdeas,
    giftItems,
    whyThisWorks,
    confidencePrompt: "Does this feel personal, memorable, and true to them?",
    confidenceScore: confidence.score,
    reassurance: confidence.reassurance
  };
}
