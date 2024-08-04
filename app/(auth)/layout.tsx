"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PropsWithChildren, Suspense, useLayoutEffect } from "react";

import EmptyLayout from "@/components/templates/EmptyLayout";
import useBoundStore from "@/store";
import Spinner from "@/components/atoms/Spinner";

const SessionProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  const from = searchParams.get("from") || "/";

  useLayoutEffect(() => {
    isAuthenticated && router.replace(from);
  }, [from, isAuthenticated, router]);

  return <EmptyLayout>{children}</EmptyLayout>;
};

export default function AuthRoute({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<Spinner />}>
      <SessionProvider></SessionProvider>
      {children}
    </Suspense>
  );
}
