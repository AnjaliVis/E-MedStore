import express from "express";

import Wallet from "../models/walletModel.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";

//get history

//recharge wallet
router.post("/recharge", protect, async (req, res) => {
  try {
    const user = await Wallet.findOne({ userId: req.user._id });

    if (!user) {
      console.log("no User");
      const wallet = new Wallet({
        userId: req.user._id,
        balance: req.body.amount,
        transactions: req.body,
      });

      const updatedWallet = await wallet.save();

      res.status(201).json(wallet.balance);
    } else {
      console.log("User");

      await Wallet.updateOne(
        { userId: req.user._id },

        {
          $inc: { balance: req.body.amount },
          $push: { transactions: req.body },
        }
      );
      res.status(201).json(user.balance);
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.get("/balance", protect, async (req, res) => {
  const user = await Wallet.findOne({ userId: req.user._id });

  if (user) {
    const wallet = await Wallet.find({ userId: req.user._id });
    console.log(wallet);
    res.status(200).json(wallet[0].balance);
  } else {
    res.status(400).json({ msg: "No wallet for user" });
  }
});

router.get("/transactions", protect, async (req, res) => {
  const user = await Wallet.findOne({ userId: req.user._id });

  if (user) {
    const wallet = await Wallet.find({ userId: req.user._id });
    console.log(wallet);
    res.status(200).json(wallet[0].transactions);
  } else {
    res.status(400).json({ msg: "No wallet for user" });
  }
});

export default router;
