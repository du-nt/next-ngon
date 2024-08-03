"use client";

import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { CssVarsProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";

import SnackbarCloseButton from "@/components/atoms/SnackbarCloseButton";
import { useQueryWithCb } from "@/hooks/useCustomQuery";
import { theme } from "@/libs/theme";
import useBoundStore from "@/store";
import "dayjs/locale/ja";
import { SnackbarKey, SnackbarProvider } from "notistack";

export default function ThemeRegistry({ children }: PropsWithChildren) {
  const authenticate = useBoundStore((state) => state.authenticate);

  useQueryWithCb({
    queryKey: ["user/me"],
    onSuccess: authenticate,
    retry: 0,
  });

  const snackbarAction = (snackbarKey: SnackbarKey) => (
    <SnackbarCloseButton snackbarKey={snackbarKey} />
  );

  return (
    <CssVarsProvider theme={theme}>
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
    </CssVarsProvider>
  );
}
