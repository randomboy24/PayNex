"use client";
import { House } from "lucide-react";
import { ArrowLeftRight } from "lucide-react";
import { Clock3 } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div className="grid grid-cols-6">
      <div className="pt-10 text-xl font-bold flex flex-col gap-y-10 pl-4 col-span-1">
        <div
          className="flex gap-x-2 hover:cursor-pointer"
          onClick={() => {
            router.push("dashboard/");
          }}
        >
          <House />
          <span>Home</span>
        </div>
        <div
          className="flex gap-x-2 hover:cursor-pointer"
          onClick={() => {
            router.push("/transfer");
          }}
        >
          <ArrowLeftRight />
          <span>Transfer</span>
        </div>
        <div
          className="flex gap-x-2 hover:cursor-pointer"
          onClick={() => {
            router.push("/transactions");
          }}
        >
          <Clock3 />
          <span>Transactions</span>
        </div>
      </div>
      <div className="col-span-5">{children}</div>
    </div>
  );
}
