import {
  BaseButtonMain,
  ArcaveCard,
  HStack,
  NavigationBar,
  VStack,
  Typography,
  SemanticColor,
} from "@archivist/ui";
import React from "react";

import styled from "@emotion/styled";
import Layout from "@components/Layout";
import { Avatar, Flex, Heading, Tabs, Text } from "@radix-ui/themes";

import ACTabs from "@components/Tabs/ACTabs";
import { PlusIcon } from "@radix-ui/react-icons";
import useBookmarkAddModal from "@components/Modal/useBookmarkAddModal";

import ARCAVE_LOGO from "@assets/icons/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { css } from "@emotion/react";

import Chip from "@components/Chip";

import useCurrentUser from "src/hooks/useCurrentUser";
import useArcaveLink from "src/hooks/useArcaveLink";

enum BookmarkTab {
  ALL = "아케이브",
  GROUP = "내 그룹",
  SAVED = "북마크한 그룹",
}

enum NavigationBarLeftItem {
  LOGO = "logo",
  FEED = "feed",
  MYCAVE = "mycave",
}

const MycavePage = () => {
  const bookmarkAddModal = useBookmarkAddModal();
  const currentPathname = usePathname();
  const { currentUser } = useCurrentUser();

  const { links, hasLink } = useArcaveLink({
    isUser: true,
    userId: currentUser?.userId ?? 0,
  });

  if (!currentUser) {
    return "로딩 중";
  }

  return (
    <>
      <NavigationBar
        currentPath={currentPathname.slice(1)}
        leftItems={{
          [NavigationBarLeftItem.LOGO]: (
            <Link
              href={"/feed"}
              css={css`
                display: flex;
                align-items: center;
              `}
            >
              <ARCAVE_LOGO />
            </Link>
          ),
          [NavigationBarLeftItem.FEED]: <Link href={"/feed"}>홈피드</Link>,
          [NavigationBarLeftItem.MYCAVE]: (
            <Link href={"/mycave"}>마이케이브</Link>
          ),
        }}
        rightItems={{}}
      />
      <BookmarkLayout>
        <Flex gap="4" className="my-8">
          <Avatar
            src={
              currentUser.imgUrl ??
              `https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop`
            }
            fallback={currentUser.nickname[0] ?? "?"}
            radius="full"
            size="7"
          />
          <VStack className={"my-4"} gap="1">
            <Heading size="5">{currentUser.nickname}</Heading>
            <HStack gap="2">
              {currentUser.categories.map((category) => (
                <Chip key={category}>{category}</Chip>
              ))}
            </HStack>
          </VStack>
        </Flex>
        <ACTabs
          tabsList={Object.values(BookmarkTab)}
          defaultValue={BookmarkTab.ALL}
        >
          <Tabs.Content value={BookmarkTab.ALL}>
            <HStack width="100%" justify={"between"} className="my-5">
              <div
                css={css`
                  ${Typography.Title2[17].Regular}
                `}
              >
                총
                <Text
                  css={css`
                    color: ${SemanticColor.Primary.Default};
                  `}
                >
                  {` ${hasLink ? links?.length : 0} `}
                </Text>
                개의 링크
              </div>
              <BaseButtonMain
                size={"2"}
                className="w-fit"
                onClick={bookmarkAddModal.show}
              >
                링크 담기 {<PlusIcon />}
              </BaseButtonMain>
            </HStack>
            {hasLink ? (
              <HStack
                gap={"5"}
                className={"flex-wrap"}
                css={css`
                  width: 1224px;
                `}
              >
                {links?.map(
                  ({ linkId, linkUrl, linkName, linkDesc, imgUrl }) => (
                    <ArcaveCard
                      key={linkId}
                      title={linkName}
                      description={linkDesc}
                      url={linkUrl}
                      imgSrc={imgUrl}
                    />
                  )
                )}
              </HStack>
            ) : (
              <VStack
                width={"100%"}
                align={"center"}
                justify={"center"}
                className="h-60"
              >
                <Text
                  css={css`
                    ${Typography.Title1[20].Regular}
                  `}
                  align={"center"}
                >
                  링크가 없습니다. <br />
                  우측 버튼을 눌러서 추가하세요
                </Text>
              </VStack>
            )}
          </Tabs.Content>
          <Tabs.Content value={BookmarkTab.GROUP}>
            {BookmarkTab.GROUP}
          </Tabs.Content>
          <Tabs.Content value={BookmarkTab.SAVED}>
            {BookmarkTab.SAVED}
          </Tabs.Content>
        </ACTabs>
      </BookmarkLayout>
      {bookmarkAddModal.render()}
    </>
  );
};

export default MycavePage;

const BookmarkLayout = styled(Layout)``;
