import modals from "../services/modals";

export const translationContent = async (content, translateTo) => {
  const getContent = await modals.modal.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          {
            text: ` translate the ${content} to user preferred language ${translateTo}
                `,
          },
        ],
      },
    ],
    systemInstruction: "You are good translation guide that help every people",
  });

  console.log("generate content ", getContent.response.text());
};
