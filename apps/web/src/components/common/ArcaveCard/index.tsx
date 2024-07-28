import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useState } from "react";

import LinkIcon from "@arcave/assets/icons/link.svg";
import PencilIcon from "@arcave/assets/icons/pencil.svg";
import { PaletteColor, SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

import HoverCard from "./HoverCard";
import HStack from "../Stack/HStack";
import VStack from "../Stack/VStack";

type Props = {
  title?: string;
  description?: string;
  groupTitle?: string | string[];
  url?: string;
  imgSrc?: string;
  onClickModify: (params) => void;
};

const withStopPropagation = (callback) => {
  return (event: React.MouseEvent) => {
    event.stopPropagation();
    callback(event);
  };
};

const withPreventDefault = (callback) => {
  return (event: React.MouseEvent) => {
    event.preventDefault();
    callback(event);
  };
};

export const ArcaveCard = ({
  title = "BookmarkTitle",
  description = "Description",
  groupTitle,
  url,
  imgSrc,
  onClickModify,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickCard = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!url) {
      return;
    }
    // FIXME: 아래 로직 문제 없는지 체크 필요
    let _url = url;
    if (!_url.includes("https://")) {
      _url = `https://${url}`;
    }
    window.open(_url);
  };

  const renderGroupTitle = () => {
    if (groupTitle instanceof Array) {
      return groupTitle.join(", ");
    }
    return groupTitle;
  };

  return (
    <VStack
      spacing={16}
      onClick={handleClickCard}
      className="w-72"
      css={css`
        cursor: pointer;
      `}
    >
      <Link href={url}>
        <Box
          className="flex h-52 w-72 items-end justify-end rounded-lg"
          css={css`
            background-color: ${PaletteColor.Gray[300]};
            ${imgSrc &&
            css`
              background-image: url(${process.env
                .NEXT_PUBLIC_API_URL}${imgSrc});
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
            `};
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered && (
            <HStack className="m-2 h-fit" spacing={8}>
              <Button
                radius="full"
                className="h-8 w-8 p-0"
                css={css`
                  background-color: ${PaletteColor.Gray[200]};
                  cursor: pointer;
                `}
                onClick={withPreventDefault(withStopPropagation(onClickModify))}
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
      </Link>
      <VStack>
        <Title>{title}</Title>
        <HoverCard value={description}>
          <Description>{description}</Description>
        </HoverCard>
        {groupTitle && <GroupTitle>{renderGroupTitle()}</GroupTitle>}
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

  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
`;

const GroupTitle = styled(Text)`
  ${Typography.Caption1[12].Regular}
  color: ${SemanticColor.Primary.Default};
`;
