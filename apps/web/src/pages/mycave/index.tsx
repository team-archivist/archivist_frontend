import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Avatar, Flex, Heading, Tabs } from "@radix-ui/themes";
import { useAtom } from "jotai";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import useCurrentUser from "src/hooks/useCurrentUser";

import Chip from "@arcave/components/Chip";
import { BaseButton } from "@arcave/components/common/button";
import { HStack } from "@arcave/components/common/Stack/HStack";
import { VStack } from "@arcave/components/common/Stack/VStack";
import Layout from "@arcave/components/Layout";
import { NavigationBar } from "@arcave/components/NavigationBar";
import ACTabs from "@arcave/components/Tabs/ACTabs";
import BookmarkTabAtom from "@arcave/store/BookmarkTabAtom";
import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";

import ArcaveTabContent from "../../components/TabContents/ArcaveTabContent";
import GroupTabContent from "../../components/TabContents/GroupTabContent";

export enum BookmarkTab {
  ALL = "아케이브",
  GROUP = "내 그룹",
  SAVED = "북마크한 그룹",
}

enum NavigationBarLeftItem {
  LOGO = "logo",
  FEED = "feed",
  MYCAVE = "mycave",
}

enum NavigationBarRightItem {
  Login = "login",
}

const MycavePage = () => {
  const currentPathname = usePathname();
  const { currentUser } = useCurrentUser();
  const [bookmarkTabValue, setBookmarkTabValue] = useAtom(BookmarkTabAtom);
  const router = useRouter();

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
                height: 100%;
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
        currentUser={currentUser}
        rightItems={{
          [NavigationBarRightItem.Login]: (
            <BaseButton
              size={"2"}
              className="w-fit"
              onClick={() => router.push("/")}
            >
              로그인
            </BaseButton>
          ),
        }}
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
          value={bookmarkTabValue as string}
          onValueChange={setBookmarkTabValue}
        >
          <Tabs.Content value={BookmarkTab.ALL}>
            <ArcaveTabContent currentUser={currentUser} />
          </Tabs.Content>
          <Tabs.Content value={BookmarkTab.GROUP}>
            <GroupTabContent />
          </Tabs.Content>
          <Tabs.Content value={BookmarkTab.SAVED}>
            {BookmarkTab.SAVED}
          </Tabs.Content>
        </ACTabs>
      </BookmarkLayout>
    </>
  );
};
export default MycavePage;

const BookmarkLayout = styled(Layout)``;
