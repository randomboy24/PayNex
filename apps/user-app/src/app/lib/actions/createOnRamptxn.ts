"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db";
import { hash } from "crypto";

export async function createOnRampTxn({
  amount,
  provider,
}: {
  amount: number;
  provider: string;
}) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session.user.user_id;
    const token = Math.random().toString();
    const res = await db.onRampTransaction.create({
      data: {
        status: "Processing",
        provider: "HDFC",
        amount,
        token,
        userId,
      },
    });
    console.log(res);
    if (res) {
      return "succeed";
    } else {
      return "failed";
    }
  } catch (err) {
    console.log("Error: " + err);
    return "something went wrong";
  }
}
