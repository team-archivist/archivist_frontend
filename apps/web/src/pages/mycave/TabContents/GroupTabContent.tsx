import {
  BaseButtonMain,
  HStack,
  SemanticColor,
  Typography,
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
      {groupAddModal.render()}
    </>
  );
};

export default GroupTabContent;
