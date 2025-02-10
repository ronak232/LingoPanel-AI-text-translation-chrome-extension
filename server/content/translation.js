import { GenerativeModal } from "../services/modals.js";

export const translationContent = async (content, translateTo) => {
  console.log("content", content, translateTo);
  try {
    const getContent = await GenerativeModal.geminiModalInit();

    const result = await getContent.generateContent({
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
    const aiResponse = result.response.text();
    console.log("ai response ", aiResponse);
    return aiResponse;
  } catch (error) {
    throw new Error("Something went wrong")
  }
};
