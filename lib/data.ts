import type { GiftFormData } from "@/lib/types";

export const personalityOptions = [
  "creative",
  "practical",
  "minimal",
  "fitness-focused",
  "sentimental",
  "adventurous"
];

export const relationshipOptions = [
  "friend",
  "partner",
  "sibling",
  "parent",
  "colleague",
  "other"
];

export const occasionOptions = [
  "birthday",
  "anniversary",
  "celebration",
  "festival",
  "casual",
  "other"
];

export const expressionOptions = [
  "care",
  "appreciation",
  "celebration",
  "encouragement",
  "surprise",
  "gratitude"
];

export const demoScenarios: Array<{ label: string; value: GiftFormData }> = [
  {
    label: "Anniversary partner",
    value: {
      relationship: "partner",
      occasion: "anniversary",
      traits: ["sentimental", "fitness-focused"],
      interests: "Morning runs, journaling, wellness routines, and personal wellness gifts.",
      expression: "appreciation",
      budget: "$50-$100",
      context:
        "They have been incredibly consistent this year and I want the gift to feel personal, calm, and genuinely observant."
    }
  },
  {
    label: "Practical sibling",
    value: {
      relationship: "sibling",
      occasion: "birthday",
      traits: ["practical", "minimal", "creative"],
      interests: "Home coffee, organizing spaces, sketching on weekends.",
      expression: "care",
      budget: "$25-$60",
      context:
        "They never ask for much, but they light up when something is useful and still feels like it was picked just for them."
    }
  },
  {
    label: "Thoughtful colleague",
    value: {
      relationship: "colleague",
      occasion: "celebration",
      traits: ["practical"],
      interests: "Team rituals, stationery, hosting small gatherings, staying organized.",
      expression: "gratitude",
      budget: "$20-$40",
      context:
        "I want to thank them for making work calmer for everyone without making the gift feel too personal."
    }
  }
];
