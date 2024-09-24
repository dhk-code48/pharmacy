import React, { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const ratingVariants = {
  default: {
    star: "text-foreground",
    emptyStar: "text-muted-foreground",
  },
  destructive: {
    star: "text-red-500",
    emptyStar: "text-red-200",
  },
  yellow: {
    star: "text-yellow-500",
    emptyStar: "text-muted-foreground",
  },
};

interface StarInputProps {
  rating: number;
  totalStars?: number;
  size?: number;
  fill?: boolean;
  Icon?: React.ReactElement;
  variant?: keyof typeof ratingVariants;
  onChange?: (rating: number) => void; // Handle rating change
  disabled?: boolean; // Add disabled state
}

const StarInput = ({
  rating,
  totalStars = 5,
  size = 20,
  fill = true,
  Icon = <Star />,
  variant = "default",
  onChange,
  disabled = false, // Default is not disabled
}: StarInputProps) => {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null); // State for hover

  const displayRating = hoveredRating !== null ? hoveredRating : rating;

  return (
    <div className={cn("flex items-center gap-2")}>
      {[...Array(totalStars)].map((_, i) => (
        <div
          key={i}
          onClick={() => !disabled && onChange && onChange(i + 1)} // Only allow clicking when not disabled
          onMouseEnter={() => !disabled && setHoveredRating(i + 1)} // Only allow hover when not disabled
          onMouseLeave={() => !disabled && setHoveredRating(null)} // Reset hover state when not disabled
          className={cn("cursor-pointer", disabled && "pointer-events-none")}
        >
          {i < Math.floor(displayRating) ? (
            React.cloneElement(Icon, {
              size,
              className: cn(fill ? "fill-current" : "fill-transparent", ratingVariants[variant].star),
            })
          ) : (
            <div>
              {i === Math.floor(displayRating) && displayRating % 1 > 0 && (
                <PartialStar fillPercentage={displayRating % 1} size={size} className={cn(ratingVariants[variant].star)} Icon={Icon} />
              )}
              {i >= Math.floor(displayRating) + (displayRating % 1 > 0 ? 1 : 0) &&
                React.cloneElement(Icon, {
                  size,
                  className: cn(ratingVariants[variant].emptyStar),
                })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

interface PartialStarProps {
  fillPercentage: number;
  size: number;
  className?: string;
  Icon: React.ReactElement;
}
const PartialStar = ({ ...props }: PartialStarProps) => {
  const { fillPercentage, size, className, Icon } = props;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {React.cloneElement(Icon, {
        size,
        className: cn("fill-transparent", className),
      })}
      <div
        style={{
          position: "absolute",
          top: 0,
          overflow: "hidden",
          width: `${fillPercentage * 100}%`,
        }}
      >
        {React.cloneElement(Icon, {
          size,
          className: cn("fill-current", className),
        })}
      </div>
    </div>
  );
};

export { StarInput };
