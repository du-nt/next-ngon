import prisma from "@/libs/db";
import { Prisma } from "@prisma/client";

type QueryFilters = {
  page?: string;
  perPage?: string;
};

export default async function getPosts(filters: QueryFilters = {}) {
  const { page, perPage } = filters;

  const limit = perPage ? Number(perPage) : 5;
  const skip = Number(page) * (limit || 0) || 0;

  const [posts, count] = await prisma.$transaction([
    prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.post.count(),
  ]);

  return {
    pagination: {
      total: count,
    },
    data: posts,
  };
}

export async function getPost(id: string) {
  const post = prisma.post.findUnique({
    where: { id: Number(id) },
  });

  return post;
}
