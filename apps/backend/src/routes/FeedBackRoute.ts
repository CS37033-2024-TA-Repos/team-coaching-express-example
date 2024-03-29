import express, { Router, Request, Response } from "express";
import client from "../bin/database-connection.ts";
import { FeedBack } from "database";

const router: Router = express.Router();

// const database: FeedBack[] = [];

router.post("/", async function (req: Request, res: Response): Promise<void> {
  const feedback: FeedBack = req.body;
  try {
    await client.feedBack.create({
      data: feedback,
    });
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "error" });
  }
});

router.get("/", async function (req: Request, res: Response): Promise<void> {
  const feedback: FeedBack[] = await client.feedBack.findMany();
  res.json(feedback);
});

router.get(
  "/:index",
  async function (req: Request, res: Response): Promise<void> {
    const index = parseInt(req.params.index);
    const feedback: FeedBack | null = await client.feedBack.findUnique({
      where: {
        id: index,
      },
    });
    if (feedback !== null) res.json(feedback);
    else {
      console.error("could not find feedback with id " + index);
      res
        .status(400)
        .json({ message: "could not find feedback with id " + index });
    }
  },
);

export default router;
