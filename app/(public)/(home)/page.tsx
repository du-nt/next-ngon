import getPosts from "@/queries";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <Grid container spacing={2} alignItems="stretch">
      {posts.map((post) => (
        <Grid item xs={6} sm={4} lg={3} key={post.id}>
          <Card sx={{ maxWidth: 345 }} className="h-full flex flex-col">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={post.title}
              subheader="September 14, 2016"
            />
            <CardMedia
              component="img"
              height="104"
              image={post.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="mt-auto">
              <IconButton
                aria-label="add to favorites"
                LinkComponent={Link}
                href="/login"
              >
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
