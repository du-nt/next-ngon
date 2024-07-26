"use client";

import { logout } from "@/actions/auth";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { Button } from "@mui/material";
import NextLink from "next/link";

export default function AAA() {
  const { data, refetch } = useCustomQuery(["api/user/me"], {
    refetchOnMount: false,
  });

  const handleLogout = async () => {
    await logout();
    refetch();
  };

  return (
    <Button
      LinkComponent={NextLink}
      href={!data ? "/login" : undefined}
      onClick={handleLogout}
      color="inherit"
    >
      {data ? "Logout" : "Login"}
    </Button>
  );
}
