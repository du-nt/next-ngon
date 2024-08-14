import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  cookies().delete("access_token");

  return NextResponse.json({ message: "Logout successful" });
}
