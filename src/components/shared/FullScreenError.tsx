import React, { FC } from "react";

const FullScreenError: FC<{ title: string; description: string }> = ({ description, title }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg">{description}</p>
    </div>
  );
};

export default FullScreenError;
