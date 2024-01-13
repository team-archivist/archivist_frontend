import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {Box, Button, Text, Avatar, Flex} from "@radix-ui/themes";
import { PaletteColor, SemanticColor } from "@utils/color";
import { Typography } from "@utils/typography";
import { HStack } from "../Stack/HStack";
import { VStack } from "../Stack/VStack";
import {ButtonIcon, LockClosedIcon, Pencil1Icon, PlusIcon} from "@radix-ui/react-icons";
import {BaseButtonMain} from "@components/base/button";
import {BaseButtonMainOutline} from "@components/base/button/BaseButtonMainOutline";

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
   isVisibleIcon : true,
   onClickByIcon : () => {}
 },
 // bottom 관련 props
 button = {
   text : "ButtonText",
   isOutline : true,
   onClick : () => {},
 },
 // avatar 관련 props
 avatar = {
   isVisible : true,
   imgUrl : "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
 }
}: Props) => {
  return (
    <HStack gap={"2"}>
      <Thumbnail className="h-[240px] w-[360px] rounded-lg mr-5">
        {
          thumbnail && thumbnail.isVisibleIcon &&
          <ThumbnailIcon
            className="rounded-full" align="center" justify="center"
            onClick={ thumbnail.onClickByIcon }
          >
            <LockClosedIcon css={css`
            display: inline-block
          `} />
          </ThumbnailIcon>
        }
      </Thumbnail>
      <VStack justify="between" css={css`max-width: calc( 100% - 370px )`}>
        <VStack >
          { avatar && avatar.isVisible &&
            <HStack align="center" className="mb-2">
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
          }

          <Title>{title}</Title>
          <GroupTitle>{groupTitle}</GroupTitle>
          <Description>{description}</Description>
        </VStack>
        { button && button.isOutline ?
          <BaseButtonMainOutline
            size={"2"}
            className="w-fit"
            onClick={ button.onClick }
          >
            {button.text} {<Pencil1Icon />}
          </BaseButtonMainOutline>  :
          <BaseButtonMain
            size={"2"}
            className="w-fit"
            onClick={ button.onClick }
          >
            {button.text} {<PlusIcon />}
          </BaseButtonMain>
        }
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
  position : relative;
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
  cursor : pointer;
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