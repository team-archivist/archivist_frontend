import { css } from "@emotion/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";

import { ArcaveCard } from "@arcave/components/common/ArcaveCard";
import Button from "@arcave/components/common/Button/Button";
import HStack from "@arcave/components/common/Stack/HStack";
import VStack from "@arcave/components/common/Stack/VStack";
import useBookmarkAddDetailModal from "@arcave/components/Modal/useBookmarkAddDetailModal";
import useBookmarkAddModal from "@arcave/components/Modal/useBookmarkAddModal";
import useGroupAddModal from "@arcave/components/Modal/useGroupAddModal";
import Tooltip from "@arcave/components/Tooltip";
import useArcaveLink from "@arcave/hooks/useArcaveLink";
import useAPIGroup from "@arcave/services/external/useAPIGroup";
import useAPIGroupLink from "@arcave/services/external/useAPIGroupLink";
import { SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

import ACSkeleton from "../common/Skeleton";

type Props = {
  currentUser: any; // 현재 user 정보
};

const ArcaveTabContent = ({ currentUser }: Props) => {
  const groupAddModal = useGroupAddModal();

  const handleOpenGroupAddModal = () => {
    groupAddModal.show();
  };

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

  const findGroupName = (linkId) => {
    const groupId = linksWithGroupId.find(
      (linkWithGroupId) => linkWithGroupId.linkId === linkId,
    )?.groupId;

    if (groupId) {
      return groups?.find((group) => group.groupId === groupId)?.groupName;
    }
  };

  if (isLinksWithGroupIdLoading) {
    return <ACSkeleton count={3} />;
  }

  return (
    <>
      <HStack justify={"space-between"} className="my-5">
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
        <Tooltip text={"링크를 추가해보세요"} placement="bottom">
          <Button size={"2"} className="w-fit" onClick={bookmarkAddModal.show}>
            링크 담기 {<PlusIcon />}
          </Button>
        </Tooltip>
      </HStack>
      {hasLink ? (
        <HStack
          spacing={20}
          className={"flex-wrap"}
          css={css`
            width: 1224px;
          `}
        >
          {links?.map(
            ({ linkId, linkUrl, linkName, linkDesc, imgUrl, groupList }) => {
              const handleClickModify = () => {
                linkDetailModal.show(
                  {
                    linkId,
                    linkUrl,
                    linkName,
                    linkDesc,
                    groupList,
                    imgUrl,
                  },
                  "MODIFY",
                );
              };

              return (
                linkUrl && (
                  <ArcaveCard
                    key={linkId}
                    title={linkName}
                    description={linkDesc}
                    groupTitle={findGroupName(linkId)}
                    url={linkUrl}
                    imgSrc={imgUrl}
                    onClickModify={handleClickModify}
                  />
                )
              );
            },
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
      {groupAddModal.render()}
    </>
  );
};

export default ArcaveTabContent;
