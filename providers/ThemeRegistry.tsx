"use client";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";

import { lightTheme } from "@/libs/theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "dayjs/locale/ja";
import { SnackbarKey, SnackbarProvider } from "notistack";
import SnackbarCloseButton from "@/components/atoms/SnackbarCloseButton";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import useBoundStore from "@/store";

export default function ThemeRegistry({ children }: PropsWithChildren) {
  const login = useBoundStore((state) => state.login);
  useCustomQuery(["api/user/me"], { onSuccess: login });

  const snackbarAction = (snackbarKey: SnackbarKey) => (
    <SnackbarCloseButton snackbarKey={snackbarKey} />
  );

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />

      <SnackbarProvider
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        autoHideDuration={3000}
        disableWindowBlurListener
        preventDuplicate
        action={snackbarAction}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"ja"}>
          <Container maxWidth="xl">{children}</Container>
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
