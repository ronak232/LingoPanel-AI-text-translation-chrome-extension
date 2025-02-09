import expresss from "express";
import { translationContent } from "../content/translation.js";

export const routes = expresss.Router();

routes.post("/api/translate", async (req, res) => {
  // const { user_id } = req.user;
  const { translationText, textLang } = req.body;
  if (translationText) {
    const data = await translationContent(translationText, textLang);
    console.log("response text from gemini ", data);
    res.status(200).json(data);
  } else {
    res.status(500).json({
      err: "Something wrong",
    });
  }
});
