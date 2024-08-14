import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  const externalResponse = await fetch(
    "https://js-post-api.herokuapp.com/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  );

  if (externalResponse.ok) {
    const { accessToken, expiredAt } = await externalResponse.json();

    cookies().set("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      expires: new Date(expiredAt),
    });

    return NextResponse.json({ message: "Login successful" });
  }

  return NextResponse.json(
    { message: "Login failed" },
    { status: externalResponse.status }
  );
}
