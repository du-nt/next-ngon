import CreatePostForm from "@/components/molecules/CreatePostForm";
import PostsTable from "@/components/molecules/PostsTable";
import getPosts from "@/queries";
import { Grid } from "@mui/material";

export default async function Posts() {
  const posts = await getPosts();

  return (
    <Grid container spacing={4}>
      <Grid item xs={7}>
        <PostsTable posts={posts} />
      </Grid>

      <Grid item xs={5}>
        <CreatePostForm />
      </Grid>
    </Grid>
  );
}
