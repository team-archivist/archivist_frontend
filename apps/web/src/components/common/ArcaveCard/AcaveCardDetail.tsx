import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { LockClosedIcon, Pencil1Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Text, Avatar, Flex } from "@radix-ui/themes";

import { PaletteColor, SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

import Button from "../Button/Button";
import OutlineButton from "../Button/OutlineButton";
import HStack from "../Stack/HStack";
import VStack from "../Stack/VStack";

type Props = {
  title?: string;
  description?: string;
  groupTitle?: string;
};

/**
 * - 상세 관련 카드입니다
 */
export const ArcaveCardDetail = ({
  title = "BookmarkTitle",
  description = "Description",
  groupTitle = "GroupTitle",
  // thumbnail 관련 props
  thumbnail = {
    isVisibleIcon: true,
    onClickByIcon: () => {},
    imgUrl:
      "https://i.namu.wiki/i/hJsQn0zd7srGpiDkjatRWKHzk7fCY6NRL3ewAcPWLOuxPbJnPP6WmNxhR0vGMN6WNCZek6nvqbM7WkgZrlISt4T0Nefd_lEbWtiwWxwEOa8sJej78QG--R5ZdNNhEMQTm4IKXYn6FRxEFL74-k6DnA.webp",
  },
  // bottom 관련 props
  button = {
    isVisible: true,
    text: "ButtonText",
    isOutline: true,
    onClick: () => {},
  },
  // avatar 관련 props
  avatar = {
    isVisible: true,
    imgUrl:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
  },
}: Props) => {
  return (
    <HStack spacing={16}>
      <Thumbnail className="mr-5 h-[240px] w-[360px] rounded-lg">
        {thumbnail && <img src={thumbnail.imgUrl} style={{ width: '360px', height: '240px' }} />}
        {thumbnail && thumbnail.isVisibleIcon && (
          <ThumbnailIcon
            className="rounded-full"
            align="center"
            justify="center"
            onClick={thumbnail.onClickByIcon}
          >
            <LockClosedIcon
              css={css`
                display: inline-block;
              `}
            />
          </ThumbnailIcon>
        )}
      </Thumbnail>
      <VStack
        justify="space-between"
        css={css`
          max-width: calc(100% - 370px);
        `}
      >
        <VStack>
          {avatar && avatar.isVisible && (
            <HStack alignItems="center" className="mb-2">
              <Avatar
                src={avatar.imgUrl}
                fallback="A"
                radius="full"
                css={css`
                  width: 36px;
                  height: 36px;
                  margin-right: 5px;
                `}
              />
              <AvatarCaption>11</AvatarCaption>
            </HStack>
          )}

          <Title>{title}</Title>
          <GroupTitle>{groupTitle}</GroupTitle>
          <Description>{description}</Description>
        </VStack>
        {button && button.isVisible && button.isOutline ? (
          <OutlineButton size={"2"} className="w-fit" onClick={button.onClick}>
            {button.text} {<Pencil1Icon />}
          </OutlineButton>
        ) : (
          <Button className="w-fit" onClick={button.onClick}>
            {button.text} {<PlusIcon />}
          </Button>
        )}
      </VStack>
    </HStack>
  );
};

const AvatarCaption = styled(Text)`
  ${Typography.Label2[14].Regular}
  color: ${SemanticColor.Text.Normal};
`;

// thumbnail
const Thumbnail = styled(Flex)`
  background-color: ${PaletteColor.Gray[300]};
  width: 360px;
  height: 240px;
  position: relative;
`;

// thumbnail-icon
const ThumbnailIcon = styled(Box)`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 32px;
  height: 32px;
  color: ${SemanticColor.Text.Normal};
  background-color: ${SemanticColor.GRAY[200]};
  cursor: pointer;
`;

const Title = styled(Text)`
  ${Typography.Title1[20].SemiBold}
  color: ${SemanticColor.Text.Normal};
`;

const Description = styled(Text)`
  ${Typography.Body1[16].Regular}
  color: ${SemanticColor.Text.Alternative};
`;

const GroupTitle = styled(Text)`
  ${Typography.Caption1[12].Regular}
  color: ${SemanticColor.Primary.Default};
`;
