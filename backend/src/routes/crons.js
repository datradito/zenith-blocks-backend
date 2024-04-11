import express from "express";

const router = express.Router();

router.get("/crons", (req, res) => {
  res.send("Hey this is my Cron running 🥳");
});

export const CronRouter = router;
