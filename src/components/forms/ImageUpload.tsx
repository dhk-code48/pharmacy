"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CldImage, CldUploadWidget } from "next-cloudinary";

import { Button } from "@/components/ui/button";

import { Icons } from "../shared/Icons";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: (string | undefined)[];
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, multiple, value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-4">
        {value &&
          value.map(
            (url) =>
              url && (
                <div key={url} className="relative size-[200px] overflow-hidden rounded-md">
                  <div className="absolute right-2 top-2 z-10">
                    <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="sm">
                      <Icons.delete className="size-4" />
                    </Button>
                  </div>
                  <Image fill className="object-cover" alt="Image" src={url} />
                </div>
              )
          )}
      </div>
      <CldUploadWidget
        onSuccess={(result) =>
          // @ts-ignore
          onChange(result?.info?.secure_url || "")
        }
        options={{
          multiple: multiple ? true : false,
          showAdvancedOptions: true,
          cropping: true,
          sources: ["local", "url", "image_search", "google_drive", "facebook", "dropbox", "instagram", "shutterstock", "istock", "unsplash"],
          styles: {
            palette: {
              window: "#ffffff",
              sourceBg: "#f4f4f5",
              windowBorder: "#90a0b3",
              tabIcon: "#000000",
              inactiveTabIcon: "#555a5f",
              menuIcons: "#555a5f",
              link: "#0433ff",
              action: "#339933",
              inProgress: "#0433ff",
              complete: "#339933",
              error: "#cc0000",
              textDark: "#000000",
              textLight: "#fcfffd",
            },
          },
        }}
        uploadPreset="xgb1gl2r"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button type="button" disabled={disabled} variant="secondary" onClick={onClick}>
              <Icons.upload className="mr-2 size-4" />
              {value.length >= 1 && multiple ? "Upload more Image" : "Upload an Image"}
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageUpload;
