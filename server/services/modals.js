import * as dotenv from "dotenv";
dotenv.config();
import { GoogleGenerativeAI, HarmCategory } from "@google/generative-ai";

export class GenerativeModal {
  constructor(modal) {
    this.modal = modal;
  }
  static async geminiModalInit() {
    const apikey = process.env.GEMINI_API_KEY;
    const gemini = new GoogleGenerativeAI(
      "AIzaSyCbiL5mH6VGCOP4I0t_975wBZMAe-zOwyk"
    );
    const modal = await gemini.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are a professional translation assistant named Ceaser. Your responsibilities are:
          • Analyze the provided text to determine its context and nature (e.g., news article, paragraph, comment, technical explanation).
          • Identify the situation described by the text and understand the intended tone and purpose.
          • Translate the text precisely into the user's preferred language, preserving:
            - The literal meaning.
            - The underlying sentiment and tone.
            - Any cultural nuances or stylistic elements.
            - Just simply do translation like (google translate) whatever user send request for translation don't need context multiple meanings just language translation 
          • Ensure that your translation meets the user's expectations by being both accurate and contextually appropriate.
          • If the text appears to be domain-specific (such as technical, legal, or informal social media content), adjust the translation style and terminology accordingly.
      `,
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
    return modal;
  }
}
