"use client";

import { useEffect, useState } from "react";
import db from "@repo/db";
import { useSession } from "next-auth/react";
import { createOnRampTxn } from "../lib/actions/createOnRamptxn";

export function AddMoney() {
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState("HDFC");
  const [isLoading, setIsLoading] = useState(true);
  const session = useSession();
  useEffect(() => {
    if (session) setIsLoading(false);
  }, [session.data]);
  if (isLoading) return <div>Loading....</div>;
  return (
    <div className="mt-10 border rounded-lg w-[37vw] p-8">
      <div className="text-xl">Add Money</div>
      <hr className="mt-2" />
      <div className="mt-2 ">
        <label htmlFor="Amount">Amount</label>
        <br />
        <input
          type="number"
          placeholder="Amount"
          id="Amount"
          className="pl-2 w-[100%] h-10 rounded-lg mt-2 text-black"
          onChange={(e) => {
            setAmount(parseInt(e.target.value));
          }}
        />
      </div>
      <div className="mt-6">
        <div>Bank</div>
        <select
          className="text-black w-[100%] h-10 rounded-lg mt-2"
          onChange={(e) => {
            setProvider(e.target.value);
          }}
        >
          <option value="HDFC">HDFC</option>
          <option value="AXIS">AXIS</option>
        </select>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="border bg-white text-black h-10 w-24 rounded-lg justif justify-center"
          onClick={async () => {
            console.log(provider);
            const res = await createOnRampTxn({
              amount: amount * 100,
              provider,
            });
            console.log(res);
          }}
        >
          Add Money
        </button>
      </div>
    </div>
  );
}
