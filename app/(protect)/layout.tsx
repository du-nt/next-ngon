"use client";

import { redirect, usePathname } from "next/navigation";
import { PropsWithChildren, useLayoutEffect } from "react";

import EmptyLayout from "@/components/templates/EmptyLayout";
import useBoundStore from "@/store";

export default function ProtectRoute({ children }: PropsWithChildren) {
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  const pathname = usePathname();

  useLayoutEffect(() => {
    !isAuthenticated && redirect(`/login?from=${pathname}`);
  }, [isAuthenticated, pathname]);

  return <EmptyLayout>{children}</EmptyLayout>;
}
