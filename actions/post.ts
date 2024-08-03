"use server";

import prisma from "@/libs/db";
import { revalidateTag } from "next/cache";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const content = formData.get("content");
  const image = formData.get("image");
  const price = formData.get("price");

  // Validation
  if (!title || !content || !image || !price) {
    throw new Error("Title and content are required");
  }

  await prisma.post.create({
    data: {
      title: title.toString(),
      content: content.toString(),
      image: image.toString(),
      authorId: 1,
      price: Number(price),
    },
  });

  revalidateTag("posts");
}
