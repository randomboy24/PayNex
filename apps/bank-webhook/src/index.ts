import express from "express";
import db from "@repo/db";

const app = express();
app.use(express.json());

app.post("/hdfcWebHook", async (req, res) => {
  // add zod validation here
  // check if this request actually came from hdfc bank, use a webhook secret here
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.status(200).json({
      message: "captured",
    });
  } catch (err) {
    res.status(411).json({
      message: "failed",
    });
  }
});
