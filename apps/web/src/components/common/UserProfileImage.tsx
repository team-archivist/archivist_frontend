import Image, { ImageProps } from "next/image";
import { twMerge } from "tailwind-merge";

interface UserProfileImageProps {
  containerClassName?: string;
  onClick?: () => void;
}

export default function UserProfileImage({
  className,
  containerClassName,
  onClick,
  ...props
}: UserProfileImageProps & Partial<ImageProps>) {
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
        {...(props as any)}
      />
    </div>
  );
}
