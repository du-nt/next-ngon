import getPosts from "@/queries";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import NextLink from "next/link";
import Image from "next/image";
import { dynamicBlurDataUrl } from "@/utils";

export const revalidate = 0;

export default async function Home() {
  const { data: posts } = await getPosts({ page: "0", perPage: "10000" });

  const placeholders = await Promise.all(
    posts.map(({ image }) => dynamicBlurDataUrl(image))
  );

  return (
    <Box>
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Grid container spacing={2} alignItems="stretch">
          {posts.map((post, index) => (
            <Grid item xs={6} sm={4} lg={3} key={post.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                <CardMedia>
                  <Box
                    style={{
                      position: "relative",
                      width: "100%",
                      height: 204,
                    }}
                  >
                    <Image
                      fill
                      priority
                      sizes="100%"
                      alt={post.title}
                      src={post.image}
                      style={{ objectFit: "cover" }}
                      placeholder="blur"
                      blurDataURL={placeholders[index]}
                    />
                  </Box>
                </CardMedia>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.content}
                  </Typography>
                </CardContent>

                <CardActions disableSpacing sx={{ marginTop: "auto" }}>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <Button
                    size="small"
                    LinkComponent={NextLink}
                    href={`/posts-ssr/${post.id}`}
                  >
                    Detail
                  </Button>

                  <Typography sx={{ marginLeft: "auto" }}>
                    ฿ {post.price}
                  </Typography>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
