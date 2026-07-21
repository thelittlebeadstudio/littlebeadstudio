import express from "express";
import { getItems, getItemById, createItem } from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getItems);
router.get("/:id", getItemById);
router.post("/", createItem); // left open for when you build an admin page later

export default router;
