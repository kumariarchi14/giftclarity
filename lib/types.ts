export type TonePreference = "balanced" | "sentimental" | "practical";

export type GiftFormData = {
  relationship: string;
  occasion: string;
  traits: string[];
  interests: string;
  expression: string;
  budget: string;
  context: string;
};

export type GiftResult = {
  direction: string;
  exampleIdeas: string[];
  whyThisWorks: string[];
  confidencePrompt: string;
  confidenceScore: number;
  reassurance: string;
};

export type GiftSession = {
  inputs: GiftFormData;
  result: GiftResult;
  tone: TonePreference;
  alternativeCount: number;
  generatedAt: string;
};
