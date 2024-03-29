import express, { Router } from "express";
import { FeedBack } from "common/src/Feedback.ts";

const router: Router = express.Router();

const database: FeedBack[] = [];

router.post("/", (req, res) => {
  const feedback: FeedBack = req.body as FeedBack;
  database.push(feedback);
  console.log(database);
  res.status(200).json({ message: "success" });
});

router.get("/", (req, res) => {
  res.json(database);
});

router.get("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (isNaN(index)) {
    return res.status(400).json({ message: "not a number" });
  }
  if (index < 0 || index >= database.length) {
    return res.status(400).json({ message: "out of bounds" });
  }
  res.json(database[index]);
});

export default router;
