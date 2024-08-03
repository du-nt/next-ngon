"use client";

import { useQueryWithCb } from "@/hooks/useCustomQuery";
import axiosInstance from "@/libs/axios_instance";
import useBoundStore from "@/store";
import { Button, FormControlLabel, useColorScheme } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NextLink from "next/link";
import ThemeSwitch from "../atoms/ThemeSwitch";
import { ChangeEvent } from "react";

export default function AAA() {
  const { data } = useQueryWithCb({
    queryKey: ["user/me"],
    enabled: false,
  });
  const { mode, setMode } = useColorScheme();
  const queryClient = useQueryClient();
  const unAuthenticate = useBoundStore((state) => state.unAuthenticate);

  const handleChangeTheme = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const newTheme = checked ? "dark" : "light";

    setMode(newTheme);
  };

  const { mutate } = useMutation({
    mutationFn: () => axiosInstance.get("auth/logout"),
    onSuccess: () => {
      queryClient.removeQueries();
      unAuthenticate();
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <>
      <FormControlLabel
        control={
          <ThemeSwitch checked={mode === "dark"} onChange={handleChangeTheme} />
        }
        label="Mode"
        sx={{ marginRight: 0, userSelect: "none" }}
      />

      <Button
        LinkComponent={NextLink}
        href={data ? undefined : "/login"}
        onClick={data ? handleLogout : undefined}
        color="inherit"
      >
        {data ? "Logout" : "Login"}
      </Button>
    </>
  );
}
