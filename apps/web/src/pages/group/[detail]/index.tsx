import Link from "next/link";
import React ,{useEffect,useState} from "react";
import {css} from "@emotion/react";
import ARCAVE_LOGO from "@assets/icons/logo_white.svg";
import styled from "@emotion/styled";
import Layout from "@components/Layout";
import {
  BaseButtonMain,
  NavigationBar,
  VStack,
  HStack,
  ArcaveCard,
  ArcaveCardDetail, SemanticColor, Typography,
} from "@archivist/ui";
import {usePathname} from "next/navigation";
import {Avatar, Flex, Heading, Tabs, Text} from "@radix-ui/themes";
import Chip from "@components/Chip";
import {PlusIcon} from "@radix-ui/react-icons";
import ACTabs from "@components/Tabs/ACTabs";
import useCurrentUser from "../../../hooks/useCurrentUser";
import useArcaveGroup from "../../../hooks/useArcaveGroup";
import useArcaveGroupLink from "../../../hooks/useArcaveGroupLink";

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
export const GroupDetailPage = () => {
  const currentPathname = usePathname();
  const { currentUser } = useCurrentUser();

  const [groupId ,setGroupId ] = useState<number>();

  const {group ,hasGroup } = useArcaveGroup( {
    isUser : false,
    groupId,
  } );
  const { links , hasLink } = useArcaveGroupLink ( {
    groupId,
  } );

  useEffect( () => {
    if (!currentPathname){
      return;
    }
    const [_ ,pathName ,groupId ] = currentPathname.split('/');
    setGroupId( Number( groupId ) );
  } , [currentPathname] );

  if (!currentUser) {
    return "로딩 중";
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
        rightItems={{}}
      />
      <BookmarkLayout>
        <Flex gap="4" className="my-8">
          <ArcaveCardDetail
            title={group?.groupName||""}
            groupTitle={group?.categories.join( " " )}
            description={group?.groupDesc||""}
            avatar={ { isVisible : true } }
            thumbnail={{ imgUrl : `${process.env.NEXT_PUBLIC_API_URL}${group?.imgUrl}` }}
            button={ {
              isVisible : true,
              text : "링크 그룹 수정하기" ,
              onClick : () => {}
          } }
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
                {links?.map((link, idx) =>
                  <ArcaveCard
                    title={ link.linkName || '' }
                    description={ link.linkDesc || '' }
                    url={link.linkUrl}
                    imgSrc={link.imgUrl}
                    key={idx}
                  />)}
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
            ) }

          </Tabs.Content>
        </ACTabs>
      </BookmarkLayout>
    </>
  )
}
export default GroupDetailPage;

const BookmarkLayout = styled(Layout)``;