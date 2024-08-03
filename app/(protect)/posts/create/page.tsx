import CreatePostForm from "@/components/molecules/CreatePostForm";
import PostsTable from "@/components/molecules/PostsTable";
import getPosts from "@/queries";
import { Grid } from "@mui/material";

type PostProps = {
  searchParams: { [key: string]: string | undefined };
};

export default async function Posts({ searchParams }: PostProps) {
  const page = searchParams.page;
  const perPage = searchParams.per_page;

  const { data: posts, pagination } = await getPosts({ page, perPage });

  return (
    <Grid container spacing={4}>
      <Grid item xs={7}>
        <PostsTable posts={posts} total={pagination.total} />
      </Grid>

      <Grid item xs={5}>
        <CreatePostForm />
      </Grid>
    </Grid>
  );
}
