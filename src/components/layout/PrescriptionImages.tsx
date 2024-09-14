import { Media } from "@prisma/client";
import React, { useState } from "react";
import { Lens } from "../ui/lens";
import { CldImage } from "next-cloudinary";
import { cn } from "@/lib/utils";

const PrescriptionImages = ({ images }: { images: Media[] }) => {
  const [selectedImage, setSelectedImage] = useState<Media>(images[0]);

  return (
    <div className="space-y-3 space-x-3">
      <Lens lensSize={500} zoomFactor={2}>
        <CldImage width={800} height={1200} alt="prescription" src={selectedImage.image} className="w-72 bg-accent object-contain" />
      </Lens>
      <div className="flex flex-wrap-reverse gap-4 border p-2 rounded-xl bg-accent w-fit">
        {images.map((image) => {
          return (
            <CldImage
              width={800}
              height={1200}
              alt="prescription"
              onClick={() => setSelectedImage(image)}
              src={image.image}
              className={cn(
                "w-16 bg-accent object-contain rounded-xl hover:ring-4 ring-offset-2 border-primary",
                selectedImage.id === image.id && "ring-4"
              )}
              key={"prescription-images-" + image.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PrescriptionImages;
