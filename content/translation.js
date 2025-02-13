import { GenerativeModal } from "../services/modals.js";

export const translationContent = async (content, translateTo) => {
  console.log("content", content, translateTo);
  try {
    const getContent = await GenerativeModal.geminiModalInit();

    const result = getContent.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `translate the ${content} in user preferred language ${translateTo}`,
            },
          ],
        },
      ],
    });
    const aiResponse = (await result).response.text();
    return aiResponse;
  } catch (error) {
    console.error("error for generating ", error)
    throw new Error("Something went wrong")
  }
};
