import CatHand from "@arcave/assets/images/cat-hand.svg";
import HomeFeedCard from "@arcave/components/Card/HomeFeedCard";
import { NavigationBar } from "@arcave/components/NavigationBar";
import Link from "next/link";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface HomeFeedViewProps {
  topGroups?: any[];
  middleGroups?: any[];
  bottomGroups?: any[];
  topLinks?: any[];
  middleLinks?: any[];
  bottomLinks?: any[];
  allLinks?: any[];
}

export default function HomeFeedView({
  className,
  topGroups,
  middleGroups,
  bottomGroups,
  topLinks,
  middleLinks,
  bottomLinks,
  allLinks,
  ...props
}: HTMLAttributes<HTMLDivElement> & HomeFeedViewProps) {
  return (
    <div className={twMerge("flex flex-col pb-[120px]", className)} {...props}>
      <NavigationBar />

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
            <Link
              href="/landing"
              target={"_blank"}
              className="rounded-full h-12 px-6 py-3 text-white text-16 leading-[1.5em] tracking-[-0.01em] bg-[#FF6625] self-start"
            >
              아케이브 알아보기
            </Link>
          </div>

          <CatHand className="w-[322px] aspect-[322/250]" />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="max-w-[970px] px-8 w-full flex flex-col py-6 space-y-6">
          {topGroups && topGroups.length > 0 && (
            <div className="flex flex-col pb-9">
              <div className="py-6 text-32 font-bold text-text-normal">
                TOP GROUPS
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {topGroups.map((group, index) => {
                  return (
                    <Link
                      href={`/group/${group.groupId}`}
                      target="_blank"
                      key={index}
                    >
                      <HomeFeedCard
                        imageContainerClassName="h-[300px]"
                        userProfileImageUrl=""
                        userName=""
                        title={group.groupName}
                        description={group.groupDesc}
                        categories={group.categories}
                        imageUrl={group.imgUrl}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {middleGroups && middleGroups.length > 0 && (
            <div className="flex flex-col pb-9">
              <div className="py-6 text-32 font-bold text-text-normal">
                MIDDLE GROUPS
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {middleGroups.map((group, index) => {
                  return (
                    <Link
                      href={`/group/${group.groupId}`}
                      target="_blank"
                      key={index}
                    >
                      <HomeFeedCard
                        key={index}
                        imageContainerClassName="h-[300px]"
                        userProfileImageUrl=""
                        userName=""
                        title={group.groupName}
                        description={group.groupDesc}
                        categories={group.categories}
                        imageUrl={group.imgUrl}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {bottomGroups && bottomGroups.length > 0 && (
            <div className="flex flex-col pb-9">
              <div className="py-6 text-32 font-bold text-text-normal">
                BOTTOM GROUPS
              </div>
              <div className="gap-6 grid grid-cols-1">
                {bottomGroups.map((group, index) => {
                  return (
                    <Link
                      href={`/group/${group.groupId}`}
                      target="_blank"
                      key={index}
                    >
                      <HomeFeedCard
                        key={index}
                        imageContainerClassName="lg:w-[447px]"
                        horizontal
                        userProfileImageUrl=""
                        userName=""
                        title={group.groupName}
                        description={group.groupDesc}
                        categories={group.categories}
                        imageUrl={group.imgUrl}
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {topLinks && topLinks.length > 0 && (
            <div className="flex flex-col pb-9">
              <div className="py-6 text-32 font-bold text-text-normal">
                TOP LINKS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {topLinks.map((link, index) => {
                  return (
                    <Link key={index} href={link.linkUrl} target={"_blank"}>
                      <HomeFeedCard
                        imageContainerClassName="h-[200px]"
                        withCategory={false}
                        withProfile={false}
                        imageUrl={link.imgUrl}
                        title={link.linkName}
                        description={link.linkDesc}
                        userName=""
                        userProfileImageUrl=""
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {middleLinks && middleLinks.length > 0 && (
            <div className="flex flex-col pb-9">
              <div className="py-6 text-32 font-bold text-text-normal">
                MIDDLE LINKS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {middleLinks.map((link, index) => {
                  return (
                    <Link key={index} href={link.linkUrl} target={"_blank"}>
                      <HomeFeedCard
                        imageContainerClassName="h-[200px]"
                        withCategory={false}
                        withProfile={false}
                        imageUrl={link.imgUrl}
                        title={link.linkName}
                        description={link.linkDesc}
                        userName=""
                        userProfileImageUrl=""
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {bottomLinks && bottomLinks.length > 0 && (
            <div className="flex flex-col pb-9">
              <div className="py-6 text-32 font-bold text-text-normal">
                BOTTOM LINKS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {bottomLinks.map((link, index) => {
                  return (
                    <Link key={index} href={link.linkUrl} target={"_blank"}>
                      <HomeFeedCard
                        imageContainerClassName="h-[200px]"
                        withCategory={false}
                        withProfile={false}
                        imageUrl={link.imgUrl}
                        title={link.linkName}
                        description={link.linkDesc}
                        userName=""
                        userProfileImageUrl=""
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {allLinks && allLinks.length > 0 && (
            <div className="flex flex-col pb-9">
              <div className="py-6 text-32 font-bold text-text-normal">
                ALL LINKS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
                {allLinks.map((link, index) => {
                  if (!link.linkUrl) {
                    return null;
                  }
                  return (
                    <Link key={index} href={link.linkUrl} target={"_blank"}>
                      <HomeFeedCard
                        imageContainerClassName="h-[200px]"
                        withCategory={false}
                        withProfile={false}
                        imageUrl={link.imgUrl}
                        title={link.linkName}
                        description={link.linkDesc}
                        userName=""
                        userProfileImageUrl=""
                      />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
