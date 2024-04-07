import {
  ArcaveCard,
  BaseButtonMain,
  HStack,
  SemanticColor,
  Typography,
  VStack,
} from "@archivist/ui";
import { css } from "@emotion/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";

import useBookmarkAddModal from "@components/Modal/useBookmarkAddModal";
import useArcaveLink from "src/hooks/useArcaveLink";
import useBookmarkAddDetailModal from "@components/Modal/useBookmarkAddModal/useBookmarkAddDetailModal";
import useAPIGroupLink from "src/services/external/useAPIGroupLink";
import useAPIGroup from "src/services/external/useAPIGroup";
import Tooltip from "@components/Tooltip";

type Props = {
  currentUser: any; // 현재 user 정보
  handleOpenGroupAddModal: () => void; // GroupAddModal 이 열릴 때 발생하는 callback 입니다
};

const ArcaveTabContent = ({ currentUser, handleOpenGroupAddModal }: Props) => {
  const bookmarkAddModal = useBookmarkAddModal({ handleOpenGroupAddModal });

  const { links, hasLink } = useArcaveLink({
    isUser: true,
    userId: currentUser?.userId ?? 0,
  });

  const { groups } = useAPIGroup();
  const { linksWithGroupId, isLoading: isLinksWithGroupIdLoading } =
    useAPIGroupLink(groups);

  const linkDetailModal = useBookmarkAddDetailModal({
    handleOpenGroupAddModal,
  });

  console.log({ linksWithGroupId });

  const findGroupName = (linkId) => {
    const groupId = linksWithGroupId.find(
      (linkWithGroupId) => linkWithGroupId.linkId === linkId
    )?.groupId;

    console.log(
      groupId,
      groups?.find((group) => group.groupId === groupId)?.groupName
    );
    if (groupId) {
      return groups?.find((group) => group.groupId === groupId)?.groupName;
    }
  };

  if (isLinksWithGroupIdLoading) {
    return <>로딩중 입니다</>;
  }
  return (
    <>
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
        <Tooltip text={"링크를 추가해보세요"} open side="bottom">
          <BaseButtonMain
            size={"2"}
            className="w-fit"
            onClick={bookmarkAddModal.show}
          >
            링크 담기 {<PlusIcon />}
          </BaseButtonMain>
        </Tooltip>
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
            ({ linkId, linkUrl, linkName, linkDesc, imgUrl, groupId }) => {
              const handleClickModify = () => {
                linkDetailModal.show({
                  linkId,
                  linkUrl,
                  linkName,
                  linkDesc,
                  groupId,
                  // imgUrl,
                });
              };

              return (
                <ArcaveCard
                  key={linkId}
                  title={linkName}
                  description={linkDesc}
                  groupTitle={findGroupName(linkId)}
                  url={linkUrl}
                  imgSrc={imgUrl}
                  onClickModify={handleClickModify}
                />
              );
            }
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
      {bookmarkAddModal.render()}
      {linkDetailModal.render()}
    </>
  );
};

export default ArcaveTabContent;
