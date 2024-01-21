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

type Props = {
  currentUser: any;
};

const ArcaveTabContent = ({ currentUser, handleOpenGroupAddModal }: Props) => {
  const bookmarkAddModal = useBookmarkAddModal({ handleOpenGroupAddModal });

  const { links, hasLink } = useArcaveLink({
    isUser: true,
    userId: currentUser?.userId ?? 0,
  });

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
        <BaseButtonMain
          size={"2"}
          className="w-fit"
          onClick={bookmarkAddModal.show}
        >
          링크 담기 {<PlusIcon />}
        </BaseButtonMain>
      </HStack>
      {hasLink ? (
        <HStack
          gap={"5"}
          className={"flex-wrap"}
          css={css`
            width: 1224px;
          `}
        >
          {links?.map(({ linkId, linkUrl, linkName, linkDesc, imgUrl }) => (
            <ArcaveCard
              key={linkId}
              title={linkName}
              description={linkDesc}
              url={linkUrl}
              imgSrc={imgUrl}
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
    </>
  );
};

export default ArcaveTabContent;
