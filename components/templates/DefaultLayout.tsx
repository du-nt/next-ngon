import { PropsWithChildren } from "react";
import { AppBar, Box, Toolbar } from "@mui/material";

import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import cn from "@/libs/cn";

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <Box>
      <AppBar
        component="nav"
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Header />
      </AppBar>

      <Box className="flex">
        <Box component="main" className="grow">
          <Toolbar />

          <Box className={cn("bg-red-100")}>{children}</Box>

          <AppBar position="static" color="secondary">
            <Toolbar variant="dense">
              <Footer />
            </Toolbar>
          </AppBar>

          <Toolbar />
        </Box>
      </Box>
    </Box>
  );
}
