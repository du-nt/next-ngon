"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, Suspense, useLayoutEffect } from "react";

import DefaultLayout from "@/components/templates/DefaultLayout";
import useBoundStore from "@/store";
import Spinner from "@/components/atoms/Spinner";

const SessionProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useBoundStore((state) => state.isAuthenticated);

  useLayoutEffect(() => {
    !isAuthenticated && router.replace(`/login?from=${pathname}`);
  }, [isAuthenticated, pathname, router]);

  return <DefaultLayout>{children}</DefaultLayout>;
};

export default function ProtectRoute({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<Spinner />}>
      <SessionProvider>{children}</SessionProvider>
    </Suspense>
  );
}
