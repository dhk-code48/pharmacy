import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return <div className="h-screen flex items-center justify-center relative">{children}</div>;
};

export default AuthLayout;
