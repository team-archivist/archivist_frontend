import Link from "next/link";
import React from "react";
import {css} from "@emotion/react";
import ARCAVE_LOGO from "@assets/icons/logo.svg";
import styled from "@emotion/styled";
import Layout from "@components/Layout";
import {BaseButtonMain, NavigationBar} from "@archivist/ui";
import {usePathname} from "next/navigation";
import {Avatar, Flex, Heading, Tabs, Text} from "@radix-ui/themes";
import VStack from "@components/Stack/VStack";
import HStack from "@components/Stack/HStack";
import Chip from "@components/Chip";
import {PlusIcon} from "@radix-ui/react-icons";
import BookmarkCard from "@components/BookmarkCard";
import ACTabs from "@components/Tabs/ACTabs";

enum BookmarkTab {
  ALL = "전체",
}

enum NavigationBarLeftItem {
  LOGO = "logo",
  FEED = "feed",
  MYCAVE = "mycave",
}

/**
 * - 그룹 상세 페이지 입니다
 */
export const CategoryDetailPage = () => {
  const currentPathname = usePathname();
  return (
    <>
      <NavigationBar
        currentPath={currentPathname?.split( '/' )[1]}
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
        </Flex>
        <ACTabs
          tabsList={Object.values(BookmarkTab)}
          defaultValue={BookmarkTab.ALL}
        >
          <Tabs.Content value={BookmarkTab.ALL}>
            <Flex width="100%" justify={"between"}>
              <Text>총 링크의 수 개의 링크</Text>
              <BaseButtonMain
                size={"2"}
                className="w-fit"
              >
                링크 담기 {<PlusIcon />}
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
    </>
  )
}
export default CategoryDetailPage;

const BookmarkLayout = styled(Layout)``;