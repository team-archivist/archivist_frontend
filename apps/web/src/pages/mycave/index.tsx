import { BaseButtonMain, NavigationBar } from "@archivist/ui";
import React from "react";
import styled from "@emotion/styled";
import Layout from "@components/Layout";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Tabs,
  Text,
} from "@radix-ui/themes";
import VStack from "@components/Stack/VStack";
import ACTabs from "@components/Tabs/ACTabs";
import { PlusIcon } from "@radix-ui/react-icons";
import useBookmarkAddModal from "@components/Modal/useBookmarkAddModal";
import BookmarkCard from "@components/BookmarkCard";
import HStack from "@components/Stack/HStack";

import ARCAVE_LOGO from "@assets/icons/logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { css } from "@emotion/react";

import Chip from "@components/Chip";

enum BookmarkTab {
  ALL = "전체",
  GROUP = "북마크 모음",
  SAVED = "저장",
}

enum NavigationBarLeftItem {
  LOGO = "logo",
  FEED = "feed",
  MYCAVE = "mycave",
}

const MycavePage = (props: Props) => {
  const bookmarkAddModal = useBookmarkAddModal();
  const currentPathname = usePathname();
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
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
            radius="full"
            size="7"
          />
          <VStack className={"my-4"} gap="1">
            <Heading size="5">세봉</Heading>
            <HStack gap="2">
              <Chip>외국어</Chip>
              <Chip>자기계발</Chip>
              <Chip>취미</Chip>
            </HStack>
          </VStack>
        </Flex>
        <ACTabs
          tabsList={Object.values(BookmarkTab)}
          defaultValue={BookmarkTab.ALL}
        >
          <Tabs.Content value={BookmarkTab.ALL}>
            <Flex width="100%" justify={"between"}>
              <Text>총 n개의 북마크</Text>
              <BaseButtonMain
                size={"2"}
                className="w-fit"
                onClick={bookmarkAddModal.show}
              >
                북마크 추가하기 {<PlusIcon />}
              </BaseButtonMain>
            </Flex>
            <HStack>
              <BookmarkCard />
              <BookmarkCard />
              <BookmarkCard />
              <BookmarkCard />
            </HStack>
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
