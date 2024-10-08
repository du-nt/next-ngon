import { cookies } from "next/headers";

export async function GET() {
  const accessToken = cookies().get("access_token")?.value;

  if (!accessToken) {
    return new Response(null, { status: 401 });
  }

  const user = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return Response.json(user);
}
