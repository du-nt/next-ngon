"use client";

import { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeRegistry from "./ThemeRegistry";

export const queryClient = new QueryClient();

export default function RootProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeRegistry>{children}</ThemeRegistry>
    </QueryClientProvider>
  );
}
