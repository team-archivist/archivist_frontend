import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface HomeFeedCardProps {
  imageContainerClassName?: string;
  withProfile?: boolean;
  horizontal?: boolean;
  withCategory?: boolean;
  title?: string;
  imageUrl?: string;
  userProfileImageUrl?: string;
  userName?: string;
  description?: string;
  categories?: string[];
}

export default function HomeFeedCard({
  className,
  imageContainerClassName,
  withProfile = true,
  horizontal = false,
  withCategory = true,
  imageUrl,
  title,
  userName,
  userProfileImageUrl,
  description,
  categories,
  ...props
}: HTMLAttributes<HTMLDivElement> & HomeFeedCardProps) {
  return (
    <div
      className={twMerge(
        "flex flex-col space-y-3",
        horizontal &&
          "lg:flex-row lg:space-y-0 lg:space-x-3 flex flex-col space-y-3",
        className,
      )}
      {...props}
    >
      <div
        className={twMerge(
          "w-full aspect-[441/300] relative rounded-[16px] overflow-hidden",
          horizontal && "aspect-[447/300]",
          imageContainerClassName,
        )}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}${imageUrl || ""}` || ""}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />

        {withProfile && (
          <div className="h-[21.3%] absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[#000]" />
        )}

        {withProfile && (
          <div className="absolute bottom-0 inset-x-0 px-4 pt-3 pb-4 flex flex-row space-x-2 items-center">
            <div className="rounded-full bg-gray-300 relative w-9 h-9 overflow-hidden">
              <Image
                src={
                  userProfileImageUrl ||
                  `${process.env.NEXT_PUBLIC_IMAGE_HOST}/image/userDefaultImg.png`
                }
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-white text-[16px] leading-[1.5em] tracking-[-0.012em]">
              {userName}
            </div>
          </div>
        )}
      </div>

      <div
        className={twMerge("space-y-1 flex flex-col", horizontal && "flex-1")}
      >
        <div className="line-clamp-1 text-20 font-semibold text-text-normal">
          {title}
        </div>
        <div className="line-clamp-2 text-text-alternative  text-16">
          {description}
        </div>
        {withCategory && (
          <div className="line-clamp-1 text-primary-default text-12 break-all">
            {categories?.map((category: any, index: number) => {
              return <span key={index}>{category}</span>;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
