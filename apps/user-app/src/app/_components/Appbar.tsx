"use client";

import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";

export const Appbar = () => {
  const router = useRouter();
  const session = useSession();
  return (
    <div className="border-b border-white flex justify-between items-center h-20 px-14">
      <div
        className="font-bold text-white text-xl hover:scale-105 hover:cursor-pointer"
        onClick={() => router.push("/")}
      >
        Paynex
      </div>
      <div>
        {session.data?.user ? (
          <button
            className="bg-white text-black rounded-lg h-7 w-20 hover:text-white hover:bg-gray-700"
            onClick={() => {
              localStorage.setItem(
                "sessioindata",
                JSON.stringify(session.data)
              );
              signOut();
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-white text-black rounded-lg h-7 w-20 hover:text-white hover:bg-gray-700"
            onClick={() => {
              signIn();
            }}
          >
            Signin
          </button>
        )}
      </div>
    </div>
  );
};
