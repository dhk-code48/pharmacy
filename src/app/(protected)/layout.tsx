"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();
const ProtectedLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ProtectedLayout;
