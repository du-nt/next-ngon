"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useLayoutEffect } from "react";

import DefaultLayout from "@/components/templates/DefaultLayout";
import useBoundStore from "@/store";

export default function ProtectRoute({ children }: PropsWithChildren) {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  useLayoutEffect(() => {
    !isAuthenticated && router.replace(`/login?from=${pathname}`);
  }, [isAuthenticated, pathname, router]);

  return <DefaultLayout>{children}</DefaultLayout>;
}
