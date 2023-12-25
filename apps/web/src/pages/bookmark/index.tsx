import { BaseButtonMain, NavigationBar } from "@archivist/ui";
import React from "react";
import styled from "@emotion/styled";
import Layout from "@components/Layout";
import { Avatar, Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";
import VStack from "@components/Stack/VStack";
import ACTabs from "@components/Tabs/ACTabs";
import { PlusIcon } from "@radix-ui/react-icons";
import useBookmarkAddModal from "@components/Modal/useBookmarkAddModal";
import BookmarkCard from "@components/BookmarkCard";

enum BookmarkTab {
  ALL = "전체",
  GROUP = "북마크 모음",
  SAVED = "저장",
}

const Bookmark = (props: Props) => {
  const bookmarkAddModal = useBookmarkAddModal();
  return (
    <>
      <NavigationBar />
      <BookmarkLayout>
        <Flex gap="4">
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            fallback="A"
            radius="full"
            size="7"
          />
          <VStack>세봉</VStack>
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
            <BookmarkCard />
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

export default Bookmark;

const BookmarkLayout = styled(Layout)``;
