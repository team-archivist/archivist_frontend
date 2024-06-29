import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import { css } from "@emotion/react";
import { Avatar, Box, Flex } from "@radix-ui/themes";
import Link from "next/link";

interface NavigationBarProps {
  leftItems?: any;
  rightItems?: any;
  currentPath?: string;
  currentUser?: any;
}

const DEFAULT_LEFT_ITEMS = {
  LOGO: (
    <Link href={"/"}>
      <ARCAVE_LOGO className="w-14 h-3 object-contain" />
    </Link>
  ),
  "": <Link href="/">홈피드</Link>,
  mycave: <Link href="/mycave">마이케이브</Link>,
};

export const NavigationBar = ({
  currentUser,
  rightItems,
  currentPath,
  leftItems,
}: NavigationBarProps) => {
  if (!leftItems) {
    leftItems = DEFAULT_LEFT_ITEMS;
  }

  const renderItem = (items: any[]) => {
    return Object.entries(items).map(([path, component]: any[]) => {
      console.log(path, component);
      const isCurrentPath = currentPath === path;
      return (
        <li
          key={path}
          className={`${isCurrentPath ? "text-white" : "text-gray-600"}`}
        >
          {component}
        </li>
      );
    });
  };

  return (
    <Flex
      className="h-14 w-full items-center bg-gray-800 px-8 text-white flex flex-row"
      align="center"
    >
      <ul className="flex-1">
        <Flex gap="4">{leftItems && renderItem(leftItems)}</Flex>
      </ul>
      <Box>
        <Flex gap="4">
          {currentUser ? (
            <span>
              <span
                css={css`
                  display: inline-block;
                  margin-right: 20px;
                `}
              >
                +
              </span>
              <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                fallback="A"
                radius="full"
                css={css`
                  width: 36px;
                  height: 36px;
                  margin-right: 5px;
                `}
              />
            </span>
          ) : (
            rightItems &&
            Object.entries(rightItems).map(([key, component]) => {
              return <li key={key}>{component}</li>;
            })
          )}
        </Flex>
      </Box>
    </Flex>
  );
};
