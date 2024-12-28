import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export async function GET(req: any) {
  const session = await getServerSession(authOptions);
  console.log(
    "---------------------------------- ---------------------------    "
  );
  console.log(session?.user);
  if (session?.user) {
    return NextResponse.json({
      session,
    });
  } else {
    return NextResponse.json({
      message: "you are not logged in",
    });
  }
}
