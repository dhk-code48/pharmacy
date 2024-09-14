"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC } from "react";

const UsersLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default UsersLayout;
