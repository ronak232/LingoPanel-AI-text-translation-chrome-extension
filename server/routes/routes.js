import expresss from "express";
import { translationContent } from "../content/translation";

const routes = expresss.Router();

routes.post("/api/translate", async (req, res) => {
  const { user_id } = req.user;
  const { translationText, textLang } = req.body;
  if (user_id) {
    const data = translationContent(translationText, textLang);
    res.status(200).json(data);
  } else {
    res.status(500).json({
      err: "Something wrong",
    });
  }
});
