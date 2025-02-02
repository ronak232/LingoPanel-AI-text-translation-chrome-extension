import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.listen(8000, () => {
  console.log("listening on port 8000");
});
