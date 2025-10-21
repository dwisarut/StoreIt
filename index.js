import express from "express";
import mongoose from "mongoose";
import storageRoute from "./route/item.route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const mongoURI = process.env.MONGODB_URI;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/storage", storageRoute);

app.get("/", (req, res) => {
  res.send("It's working as god intended!");
});

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
      console.log(`Server running at port 3000`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
