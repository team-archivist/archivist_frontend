import Image, { ImageProps } from "next/image";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface UserProfileImageProps {
  containerClassName?: string;
  onClick?: () => void;
}

export default function UserProfileImage({
  className,
  containerClassName,
  onClick,
  src,
  ...props
}: UserProfileImageProps & Partial<ImageProps>) {
  const resolvedSrc = useMemo(() => {
    if (typeof src === "string") {
      if (src.startsWith("/image")) {
        return `${process.env.NEXT_PUBLIC_IMAGE_HOST}${src}`;
      }
    }
    return src;
  }, [src]);

  return (
    <div
      className={twMerge(
        "rounded-full w-24 h-24 overflow-hidden relative bg-gray-300",
        onClick && "cursor-pointer",
        containerClassName,
      )}
      onClick={onClick}
      {...props}
    >
      <Image
        fill
        className={twMerge("object-cover", className)}
        alt="profile image"
        src={resolvedSrc}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...(props as any)}
      />
    </div>
  );
}
