import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("access_token")?.value;

  if (!accessToken) {
    cookies().delete("access_token");
    cookies().delete("refresh_token");

    return new Response(null, { status: 401 });
  }

  cookies().delete("access_token");
  cookies().delete("refresh_token");

  const user = {
    success: true,
  };

  return Response.json(user);
}
