import ThemePreview from "@/components/layout/ThemePreview";
import React from "react";

const ThemeSettings = () => {
  return (
    <div className="border p-4 rounded-xl">
      <strong>Theme</strong>
      <p className="text-sm text-muted-foreground">Select the theme for the application.</p>
      <div className="flex mt-5 gap-10 flex-wrap">
        <ThemePreview type="light" />
        <ThemePreview type="dark" />
        <ThemePreview type="system" />
      </div>
    </div>
  );
};

export default ThemeSettings;
