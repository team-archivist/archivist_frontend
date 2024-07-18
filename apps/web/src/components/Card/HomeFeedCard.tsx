import Image from "next/image";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface HomeFeedCardProps {
  imageContainerClassName?: string;
  withProfile?: boolean;
  horizontal?: boolean;
  withCategory?: boolean;
  imageUrl?: string;
  userProfileImageUrl?: string;
}

export default function HomeFeedCard({
  className,
  imageContainerClassName,
  withProfile = true,
  horizontal = false,
  withCategory = true,
  imageUrl,
  userProfileImageUrl,
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
        <Image src={imageUrl || ""} alt="" fill className="object-cover" />

        {withProfile && (
          <div className="h-[21.3%] absolute inset-x-0 bottom-0 bg-gradient-to-b from-[rgba(0,0,0,0)] to-[#000]" />
        )}

        {withProfile && (
          <div className="absolute bottom-0 inset-x-0 px-4 pt-3 pb-4 flex flex-row space-x-2 items-center">
            <div className="rounded-full bg-gray-300 relative w-9 h-9 overflow-hidden">
              <Image
                src={userProfileImageUrl || ""}
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="text-white text-[16px] leading-[1.5em] tracking-[-0.012em]">
              한세봉
            </div>
          </div>
        )}
      </div>

      <div
        className={twMerge("space-y-1 flex flex-col", horizontal && "flex-1")}
      >
        <div className="line-clamp-1 text-20 font-semibold text-text-normal">
          그룹 타이틀
        </div>
        <div className="line-clamp-2 text-text-alternative  text-16">
          인간이 언제부터 수영하고 또, 가르치고 배우게 되었는지 확실하지
          않다. 수영의 발생에 대한 기록은 명확하지 않지만, 고대부터..인간이
          언제부터 수영하고 또, 가르치고 배우게 되었는지 확실하지 않다. 수영의
          발생에 대한 기록은 명확하지 않지만, 고대부터..
        </div>
        {withCategory && (
          <div className="line-clamp-1 text-primary-default text-12 break-all">
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
            <span>Category </span>
          </div>
        )}
      </div>
    </div>
  );
}
