import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { PaletteColor, SemanticColor } from "../../../utils/color";
import { Typography } from "../../../utils/typography";
import { VStack } from "../Stack/VStack";
import { HStack } from "../Stack/HStack";

import PencilIcon from "../../../assets/icons/pencil.svg?react";
import LinkIcon from "../../../assets/icons/link.svg?react";
import { useState } from "react";

type Props = {
  title?: string;
  description?: string;
  groupTitle?: string;
  url?: string;
  imgSrc?: string;
};

export const ArcaveCard = ({
  title = "BookmarkTitle",
  description = "Description",
  groupTitle = "GroupTitle",
  url,
  imgSrc,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickCard = () => {
    if (url) {
      window.open(url);
    }
  };

  return (
    <VStack
      gap={"2"}
      onClick={handleClickCard}
      className="w-72"
      css={css`
        cursor: pointer;
      `}
    >
      <Box
        className="flex h-52 w-72 items-end justify-end rounded-lg"
        css={css`
          background-color: ${PaletteColor.Gray[300]};
          ${imgSrc &&
          css`
            background-image: url(${process.env.NEXT_PUBLIC_API_URL}${imgSrc});
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
          `};
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered && (
          <HStack className="m-2 h-fit" gap={"1"}>
            <Button
              radius="full"
              className="h-8 w-8 p-0"
              css={css`
                background-color: ${PaletteColor.Gray[200]};
                cursor: pointer;
              `}
            >
              <PencilIcon />
            </Button>
            <Button
              radius="full"
              className="h-8 w-8 p-0"
              css={css`
                background-color: ${PaletteColor.Gray[200]};
                cursor: pointer;
              `}
            >
              <LinkIcon />
            </Button>
          </HStack>
        )}
      </Box>
      <VStack>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <GroupTitle>{groupTitle}</GroupTitle>
      </VStack>
    </VStack>
  );
};

const Title = styled(Text)`
  ${Typography.Title1[20].Regular}
  color: ${SemanticColor.Text.Normal};
`;

const Description = styled(Text)`
  ${Typography.Body2[15].Regular}
  color: ${SemanticColor.Text.Alternative};
`;

const GroupTitle = styled(Text)`
  ${Typography.Caption1[12].Regular}
  color: ${SemanticColor.Primary.Default};
`;
