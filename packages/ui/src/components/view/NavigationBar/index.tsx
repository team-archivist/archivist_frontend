import { Box, Flex } from "@radix-ui/themes";

const NavigationBar = (props: Props) => {
  return (
    <Flex className="h-14 w-full justify-between px-32 bg-gray-800 text-white">
      <ul>
        <Flex gap="4">
          <li>로고</li>
          <li>홈피드</li>
          <li>마이케이브</li>
        </Flex>
      </ul>
      <Box>
        <Flex gap="4">
          <span>+</span>
          아바타
        </Flex>
      </Box>
    </Flex>
  );
};

export default NavigationBar;
