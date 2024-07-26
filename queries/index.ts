import prisma from "@/libs/db";

export default async function getPosts() {
  const posts = await prisma.post.findMany();

  return posts;
}
