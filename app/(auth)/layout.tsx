"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, useLayoutEffect } from "react";

import EmptyLayout from "@/components/templates/EmptyLayout";
import useBoundStore from "@/store";

export default function AuthRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  const from = searchParams.get("from") || "/";

  useLayoutEffect(() => {
    isAuthenticated && router.replace(from);
  }, [from, isAuthenticated, router]);

  return <EmptyLayout>{children}</EmptyLayout>;
}
