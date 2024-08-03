import { Box, Typography } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import NextLink from "next/link";

export default function About() {
  return (
    <Box>
      <Button variant="contained" LinkComponent={NextLink} href="/">
        Go to the home page
      </Button>
      <Typography>About page</Typography>
    </Box>
  );
}
