import MenuIcon from "@mui/icons-material/Menu";
import { Box, IconButton, Skeleton, Toolbar, Typography } from "@mui/material";

import LanguageSwitcher from "@/components/molecules/LanguageSwitcher";
import dynamic from "next/dynamic";
import NextLink from "next/link";
const AAA = dynamic(() => import("../molecules/AAA"), {
  ssr: false,
  loading: () => <Skeleton width={78} height={38} variant="rounded" />,
});

export default function Header() {
  return (
    <Toolbar>
      <IconButton
        aria-label="delete"
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
      >
        <MenuIcon />
      </IconButton>

      <Typography
        href="/"
        variant="h6"
        noWrap
        component={NextLink}
        sx={{ flexGrow: 1, textDecoration: "none" }}
        color="inherit"
      >
        MUI
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", columnGap: 2 }}>
        <LanguageSwitcher />
        <AAA />
      </Box>
    </Toolbar>
  );
}
