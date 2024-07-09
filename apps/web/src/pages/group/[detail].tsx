import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useEffect, useState } from "react";

import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import { ArcaveCard } from "@arcave/components/common/ArcaveCard";
import { ArcaveCardDetail } from "@arcave/components/common/ArcaveCard/AcaveCardDetail";
import Button from "@arcave/components/common/Button/Button";
import ACSkeleton from "@arcave/components/common/Skeleton";
import HStack from "@arcave/components/common/Stack/HStack";
import VStack from "@arcave/components/common/Stack/VStack";
import Layout from "@arcave/components/Layout";
import { NavigationBar } from "@arcave/components/NavigationBar";
import ACTabs from "@arcave/components/Tabs/ACTabs";
import { SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

import useArcaveGroup from "../../hooks/useArcaveGroup";
import useArcaveGroupLink from "../../hooks/useArcaveGroupLink";
import useCurrentUser from "../../hooks/useCurrentUser";
import { usePathname } from "next/navigation";

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
 * - 그룹 상세 페이지 입니다
 */
const GroupDetailPage = () => {
  const currentPathname = usePathname();
  const { currentUser } = useCurrentUser();

  const [groupId, setGroupId] = useState<number>();

  const { group, hasGroup } = useArcaveGroup({
    isUser: false,
    groupId,
  });
  const { links, hasLink } = useArcaveGroupLink({
    groupId,
  });

  useEffect(() => {
    if (!currentPathname) {
      return;
    }
    const [_, pathName, groupId] = currentPathname.split("/");
    setGroupId(Number(groupId));
  }, [currentPathname]);

  if (!currentUser) {
    return <ACSkeleton count={3} />;
  }

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
            title={group?.groupName || ""}
            groupTitle={group?.categories?.join(" ")}
            description={group?.groupDesc || ""}
            avatar={{ isVisible: true }}
            thumbnail={{
              imgUrl: `${process.env.NEXT_PUBLIC_API_URL}${group?.imgUrl}`,
            }}
            button={{
              isVisible: true,
              text: "링크 그룹 수정하기",
              onClick: () => {},
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
                </Text>
              </VStack>
            )}
          </Tabs.Content>
        </ACTabs>
      </BookmarkLayout>
    </>
  );
};
export default GroupDetailPage;

const BookmarkLayout = styled(Layout)``;
