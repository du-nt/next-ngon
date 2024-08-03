import { cookies } from "next/headers";

export async function GET() {
  const refreshToken = cookies().get("refresh_token")?.value;

  if (!refreshToken) {
    cookies().delete("access_token");
    cookies().delete("refresh_token");

    return new Response(null, { status: 401 });
  }

  const user = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return Response.json(user);
}
