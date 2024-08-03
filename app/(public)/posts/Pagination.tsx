"use client";

import { useRouter, useSearchParams } from "next/navigation";
import MuiPagination from "@mui/material/Pagination";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Post } from "@prisma/client";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Image from "next/image";
import NextLink from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";

type PaginationProps = {
  posts: Post[];
  placeholders: string[];
};

export default function Pagination({ posts, placeholders }: PaginationProps) {
  //   const searchParams = useSearchParams();
  //   const router = useRouter();

  //   const page = searchParams.get("page") || 1;

  //   const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
  //     router.push(`?page=${value}`);
  //   };

  return (
    <>
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
                    href={`/posts/${post.id}`}
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

      <MuiPagination count={10} />
    </>
  );
}
