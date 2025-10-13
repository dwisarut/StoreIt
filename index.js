import express from "express";
import mongoose from "mongoose";
import storageRoute from "./route/item.route.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ express: false }));

app.use("/api/storage", storageRoute);

app.get("/", (req, res) => {
  res.send("It's working as god intended!");
});

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to the database!");
    app.listen(3000, () => {
      console.log(`Server running at port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed");
  });
