import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PlusIcon } from "@radix-ui/react-icons";
import { Flex, Tabs, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import { ArcaveCard } from "@arcave/components/common/ArcaveCard";
import { ArcaveCardDetail } from "@arcave/components/common/ArcaveCard/AcaveCardDetail";
import Button from "@arcave/components/common/Button/Button";
import HStack from "@arcave/components/common/Stack/HStack";
import VStack from "@arcave/components/common/Stack/VStack";
import Layout from "@arcave/components/Layout";
import useBookmarkAddModal from "@arcave/components/Modal/useBookmarkAddModal";
import useGroupAddModal from "@arcave/components/Modal/useGroupAddModal";
import { NavigationBar } from "@arcave/components/NavigationBar";
import ACTabs from "@arcave/components/Tabs/ACTabs";
import useArcaveGroup from "@arcave/hooks/useArcaveGroup";
import useArcaveGroupLink from "@arcave/hooks/useArcaveGroupLink";
import { SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

import useCurrentUser from "../../../hooks/useCurrentUser";

enum BookmarkTab {
  ALL = "전체",
}

enum NavigationBarLeftItem {
  LOGO = "logo",
  FEED = "feed",
  MYCAVE = "mycave",
}
enum NavigationBarRightItem {
  Login = "login",
}

/**
 * - 내 그룹 상세 페이지 입니다
 */
const UserGroupDetailPage = () => {
  const currentPathname = usePathname();
  const { currentUser } = useCurrentUser();
  const [currentGroup, setCurrentGroup] = useState(null);
  const router = useRouter();

  const { group, hasGroup } = useArcaveGroup({
    isUser: true,
    userId: currentUser?.userId ?? 0,
  });
  const { links, hasLink } = useArcaveGroupLink({
    groupId: currentGroup?.groupId,
  });

  const groupAddModal = useGroupAddModal();
  const handleOpenGroupAddModal = () => {};
  const bookmarkAddModal = useBookmarkAddModal({ handleOpenGroupAddModal });

  useEffect(() => {
    if (!currentPathname || !group) {
      return;
    }
    const groupId = currentPathname?.split("/").pop();
    const _currentGroup = group?.find((g) => g.groupId === Number(groupId));
    if (!_currentGroup) {
      window.alert("해당 회원의 그룹이 아니거나 그룹이 없습니다");
      router.back();
    }
    setCurrentGroup(_currentGroup);
  }, [group]);

  if (!currentUser) {
    return "로딩 중";
  }

  // 그룹 수정하기 클릭시
  const handleClickGroupEdit = () => {
    if (!currentGroup) {
      window.alert("현재 그룹이 없습니다");
      return;
    }
    const { categories, groupDesc, groupId, groupName, isGroupPublic } =
      currentGroup;

    groupAddModal.show({
      groupName,
      groupDescription: groupDesc || "",
      groupCategories: categories || [],
      groupId,
      groupIsPrivate: !isGroupPublic,
    });
  };

  return (
    <>
      <NavigationBar
        currentPath={"mycave"}
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
            <Button
              size={"2"}
              className="w-fit"
              onClick={() => router.push("/")}
            >
              로그인
            </Button>
          ),
        }}
      />
      <BookmarkLayout>
        <Flex gap="4" className="my-8">
          <ArcaveCardDetail
            title={currentGroup?.groupName || ""}
            groupTitle={currentGroup?.categories.join(" ")}
            description={currentGroup?.groupDesc || ""}
            avatar={{ isVisible: false }}
            thumbnail={{
              imgUrl: `${process.env.NEXT_PUBLIC_API_URL}${currentGroup?.imgUrl}`,
            }}
            button={{
              isVisible: true,
              text: "그룹 수정하기",
              isOutline: true,
              onClick: () => handleClickGroupEdit(),
            }}
          />
        </Flex>
        <ACTabs
          tabsList={Object.values(BookmarkTab)}
          defaultValue={BookmarkTab.ALL}
        >
          <Tabs.Content value={BookmarkTab.ALL}>
            <Flex width="100%" justify={"between"} className="my-5">
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
                  {`${hasLink ? links?.length : 0}`}
                </Text>
                개의 링크
              </div>
              <Button
                size={"2"}
                className="w-fit"
                onClick={bookmarkAddModal.show}
              >
                링크 담기 {<PlusIcon />}
              </Button>
            </Flex>
            {hasLink ? (
              <HStack gap={"5"}>
                {links?.map((link, idx) => (
                  <ArcaveCard
                    title={link.linkName || ""}
                    description={link.linkDesc || ""}
                    url={link.linkUrl}
                    imgSrc={link.imgUrl}
                    key={idx}
                  />
                ))}
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
            {bookmarkAddModal.render()}
            {groupAddModal.render()}
          </Tabs.Content>
        </ACTabs>
      </BookmarkLayout>
    </>
  );
};
export default UserGroupDetailPage;

const BookmarkLayout = styled(Layout)``;
