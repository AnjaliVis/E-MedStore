import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  date: {
    default: Date.now(),
    type: Date,
  },
});
const Transactions = mongoose.model("Transaction", TransactionSchema);

const WalletSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    balance: { type: Number },
    transactions: [TransactionSchema],
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", WalletSchema);

export default Wallet;
