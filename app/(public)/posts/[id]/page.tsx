import prisma from "@/libs/db";
import { getPost } from "@/queries";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";

type PostDetailProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({ take: 4 });

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetail({ params }: PostDetailProps) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Post detail
      </Typography>
      <Typography variant="h6" gutterBottom>
        Title: {post.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Content: {post.content}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Price: {post.price}
      </Typography>
    </Box>
  );
}
