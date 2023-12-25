import { PaletteColor, SemanticColor } from "@archivist/ui";
import VStack from "@components/Stack/VStack";
import { css } from "@emotion/react";
import { Box, Text } from "@radix-ui/themes";

type Props = {
  title: string;
  description: string;
  groupTitle: string;
};

const BookmarkCard = ({}: Props) => {
  return (
    <VStack>
      <Box
        className="w-72 h-52 rounded-lg"
        css={css`
          background-color: ${PaletteColor.Gray[300]};
        `}
      />
      <VStack>
        <Text style={{ color: SemanticColor.Text.Normal }}>BookmarkTitle</Text>
        <Text style={{ color: SemanticColor.Text.Alternative }}>
          Description
        </Text>
        <Text style={{ color: SemanticColor.Primary.Default }}>GroupTitle</Text>
      </VStack>
    </VStack>
  );
};

export default BookmarkCard;
