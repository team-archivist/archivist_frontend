import { Box, Flex } from "@radix-ui/themes";

export const NavigationBar = ({ leftItems, rightItems, currentPath }) => {
  return (
    <Flex
      className="h-14 w-full justify-between bg-gray-800 px-8 text-white"
      align="center"
    >
      <ul>
        <Flex gap="4">
          {leftItems &&
            Object.entries(leftItems).map(([path, component]) => {
              const isCurrentPath = currentPath === path;
              return (
                <li
                  key={path}
                  className={`${
                    isCurrentPath ? "text-white" : "text-gray-600"
                  }`}
                >
                  {component}
                </li>
              );
            })}
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
