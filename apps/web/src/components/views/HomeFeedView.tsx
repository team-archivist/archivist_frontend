import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import CatHand from "@arcave/assets/images/cat-hand.svg";
import HomeFeedCard from "@arcave/components/Card/HomeFeedCard";
import { NavigationBar } from "@arcave/components/NavigationBar";
import Footer from "@arcave/layout/Footer";
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

      <div className="flex flex-col items-center">
        <div className="max-w-[970px] px-8 w-full flex flex-col py-6 space-y-6">
          <div className="flex flex-col pb-9">
            <div className="py-6 text-32 font-bold text-text-normal">
              Group Section Title
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HomeFeedCard imageContainerClassName="h-[300px]" />
              <HomeFeedCard imageContainerClassName="h-[300px]" />
            </div>
          </div>

          <div className="flex flex-col pb-9">
            <div className="py-6 text-32 font-bold text-text-normal">
              Group Section Title
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <HomeFeedCard imageContainerClassName="h-[200px]" />
              <HomeFeedCard imageContainerClassName="h-[200px]" />
              <HomeFeedCard imageContainerClassName="h-[200px]" />
            </div>
          </div>

          <div className="flex flex-col pb-9">
            <div className="py-6 text-32 font-bold text-text-normal">
              Group Section Title
            </div>
            <div className="gap-6 grid grid-cols-1">
              <HomeFeedCard imageContainerClassName="lg:w-[447px]" horizontal />
              <HomeFeedCard imageContainerClassName="lg:w-[447px]" horizontal />
              <HomeFeedCard imageContainerClassName="lg:w-[447px]" horizontal />
            </div>
          </div>

          <div className="flex flex-col pb-9">
            <div className="py-6 text-32 font-bold text-text-normal">
              Group Section Title
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
              <HomeFeedCard
                imageContainerClassName="h-[200px]"
                withCategory={false}
                withProfile={false}
              />
              <HomeFeedCard
                imageContainerClassName="h-[200px]"
                withCategory={false}
                withProfile={false}
              />
              <HomeFeedCard
                imageContainerClassName="h-[200px]"
                withCategory={false}
                withProfile={false}
              />
              <HomeFeedCard
                imageContainerClassName="h-[200px]"
                withCategory={false}
                withProfile={false}
              />
              <HomeFeedCard
                imageContainerClassName="h-[200px]"
                withCategory={false}
                withProfile={false}
              />
              <HomeFeedCard
                imageContainerClassName="h-[200px]"
                withCategory={false}
                withProfile={false}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
