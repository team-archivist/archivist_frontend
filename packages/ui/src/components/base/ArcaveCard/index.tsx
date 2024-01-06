import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Text } from "@radix-ui/themes";
import { PaletteColor, SemanticColor } from "../../../utils/color";
import { Typography } from "../../../utils/typography";
import { VStack } from "../Stack/VStack";

type Props = {
  title?: string;
  description?: string;
  groupTitle?: string;
};

export const ArcaveCard = ({
  title = "BookmarkTitle",
  description = "Description",
  groupTitle = "GroupTitle",
}: Props) => {
  return (
    <VStack gap={"2"}>
      <Box
        className="h-52 w-72 rounded-lg"
        css={css`
          background-color: ${PaletteColor.Gray[300]};
        `}
      />
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
