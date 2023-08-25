import express from "express";
import mongoose from "mongoose";
import { json } from "body-parser";
import { contactRouter } from "./routes/contact/contact";
import cors from "cors";

const port = 3000;

const app = express();
app.use(json());
app.use(cors());
app.use(contactRouter);

// mongodb connection
mongoose
  .connect("mongodb://0.0.0.0:27017/contact")
  .then((result) =>
    app.listen(port, () =>
      console.log(`connected to database and app running on port ${port}`)
    )
  )
  .catch((err) => console.log(err));
