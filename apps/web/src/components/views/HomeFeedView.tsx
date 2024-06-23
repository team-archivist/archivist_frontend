import CatHand from "@arcave/assets/images/cat-hand.svg";
import { NavigationBar } from "@arcave/components/NavigationBar";
import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface HomeFeedViewProps {}

export default function HomeFeedView({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & HomeFeedViewProps) {
  return (
    <div className={twMerge("flex flex-col", className)} {...props}>
      <NavigationBar
        leftItems={{
          logo: (
            <Link href={"/"}>
              <ARCAVE_LOGO className="w-14 h-3 object-contain" />
            </Link>
          ),
        }}
        rightItems={{}}
      />

      <div className="bg-[#F6F6F4] flex items-center justify-center">
        <div className="w-full max-w-[970px] flex flex-row items-center justify-between px-8 py-[55px] flex-wrap">
          <div className="flex flex-col space-y-3">
            <div className="font-bold text-[40px] leading-[1.2em] tracking-[-0.024em] text-text-normal">
              관심가는 순간
              <br />
              조각조각 모음, 아케이브
            </div>
            <div className="text-[16px] leading-[1.625em] tracking-[-0.01em] text-text-alternative">
              관심가는 페이지, 놓치지 말고 아케이브 하세요. <br />
              좋아하는 것을 조각조각 모아 내 취향을 찾아보세요.
            </div>
            <button className="rounded-full h-12 px-6 py-3 text-white text-16 leading-[1.5em] tracking-[-0.01em] bg-[#FF6625] self-start">
              아케이브 알아보기
            </button>
          </div>

          <CatHand clsasName="w-[322px] aspect-[322/250]" />
        </div>
      </div>
    </div>
  );
}
