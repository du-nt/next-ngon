"use client";

import { redirect, useSearchParams } from "next/navigation";
import { PropsWithChildren, useLayoutEffect } from "react";

import EmptyLayout from "@/components/templates/EmptyLayout";
import useBoundStore from "@/store";

export default function AuthRoute({ children }: PropsWithChildren) {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);
  const searchParams = useSearchParams();

  const from = searchParams.get("from") || "/";

  useLayoutEffect(() => {
    isAuthenticated && redirect(from);
  }, [from, isAuthenticated]);

  return <EmptyLayout>{children}</EmptyLayout>;
}
