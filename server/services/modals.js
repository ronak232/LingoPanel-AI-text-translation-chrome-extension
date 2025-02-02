import {
  GoogleGenerativeAI,
  HarmCategory,
} from "@google/generative-ai";

const api_key = process.env.GEMINI_API;

const gemini = new GoogleGenerativeAI(api_key);
const modal = gemini.getGenerativeModel({
  modal: "gemini-1.5-flash",
  generationConfig: {
    maxOutputTokens: 1024,
    temperature: 0.1,
  },
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    },
  ],
});

export default { modal };
