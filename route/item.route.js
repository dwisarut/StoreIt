import express from "express";
import {
  getItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controller/item.controller.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getSingleItem);

router.post("/", createItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;
