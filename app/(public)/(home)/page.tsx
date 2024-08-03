import { Box, Button, Stack } from "@mui/material";
import NextLink from "next/link";

export default function Home() {
  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" LinkComponent={NextLink} href="/about">
          About
        </Button>
        <Button variant="contained" LinkComponent={NextLink} href="/posts">
          Posts
        </Button>

        <Button
          variant="contained"
          LinkComponent={NextLink}
          href="/posts/create"
        >
          Create post
        </Button>
      </Stack>
    </Box>
  );
}
