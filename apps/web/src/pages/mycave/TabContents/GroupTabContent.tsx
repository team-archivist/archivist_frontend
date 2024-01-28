import {
  ArcaveCard,
  BaseButtonMain,
  HStack,
  SemanticColor,
  Typography,
  VStack,
} from "@archivist/ui";
import useGroupAddModal from "@components/Modal/useGroupAddModal";

import { css } from "@emotion/react";
import { PlusIcon } from "@radix-ui/react-icons";
import { Text } from "@radix-ui/themes";
import useAPIGroup from "src/services/external/useAPIGroup";

type Props = {};

const GroupTabContent = ({ currentUser }: Props) => {
  // const { links, hasLink } = useGroups({
  //   isUser: true,
  //   userId: currentUser?.userId ?? 0,
  // });

  const groupAddModal = useGroupAddModal();
  const { groups } = useAPIGroup();

  const hasGroups = groups?.length > 0;

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
            {` ${hasGroups ? groups.length : 0} `}
          </Text>
          개의 그룹
        </div>
        <BaseButtonMain
          size={"2"}
          className="w-fit"
          onClick={groupAddModal.show}
        >
          그룹 추가하기 {<PlusIcon />}
        </BaseButtonMain>
      </HStack>
      {hasGroups ? (
        <HStack
          gap={"5"}
          className={"flex-wrap"}
          css={css`
            width: 1224px;
          `}
        >
          {groups?.map(
            ({
              groupId,
              groupName,
              groupDesc,
              imgUrl,
              categories,
              isGroupPublic,
            }) => {
              const handleClickModify = () => {
                console.log({ groupName, groupDesc });
                groupAddModal.show({
                  groupName,
                  groupId,
                  groupDescription: groupDesc,
                  groupIsPrivate: isGroupPublic,
                  groupCategories: categories,
                });
              };

              return (
                <ArcaveCard
                  key={groupId}
                  title={groupName}
                  description={groupDesc}
                  groupTitle={categories}
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
            그룹이 없습니다. <br />
            우측 버튼을 눌러서 추가하세요
          </Text>
        </VStack>
      )}
      {groupAddModal.render()}
    </>
  );
};

export default GroupTabContent;
