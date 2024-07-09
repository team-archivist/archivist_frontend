import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import UserProfileImage from "@arcave/components/common/UserProfileImage";
import LoginUserModel from "@arcave/model/LoginUserModel";
import { Box, Flex } from "@radix-ui/themes";
import Link from "next/link";
import { useMemo } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";

interface NavigationBarProps {
  leftItems?: any;
  rightItems?: any;
  currentPath?: string;
  currentUser?: LoginUserModel;
}

export const NavigationBar = ({
  currentUser,
  rightItems,
  currentPath,
  leftItems,
}: NavigationBarProps) => {
  const DEFAULT_LEFT_ITEMS = useMemo<any>(
    () => ({
      LOGO: (
        <Link href={"/"}>
          <ARCAVE_LOGO className="w-14 h-3 object-contain" />
        </Link>
      ),
      "": <Link href="/">홈피드</Link>,
      mycave: <Link href="/mycave">마이케이브</Link>,
    }),
    [],
  );

  const DEFAULT_RIGHT_ITEMS_NO_USER = useMemo<any>(
    () => ({
      LOGIN: (
        <button className="rounded-full h-[36px] bg-primary-default text-white text-14 px-4">
          로그인
        </button>
      ),
    }),
    [],
  );

  if (!leftItems) {
    leftItems = DEFAULT_LEFT_ITEMS;
  }

  const renderLeftItem = (items: any[]) => {
    return Object.entries(items).map(([path, component]: any[]) => {
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

  const renderRightItem = (items: any[]) => {
    return Object.entries(items).map(([key, component]) => {
      return <li key={key}>{component}</li>;
    });
  };

  return (
    <Flex
      className="h-14 w-full items-center bg-gray-800 px-8 text-white flex flex-row"
      align="center"
    >
      <ul className="flex-1">
        <Flex gap="4">{leftItems && renderLeftItem(leftItems)}</Flex>
      </ul>
      <Box>
        <Flex gap="4">
          {currentUser ? (
            <button className="flex flex-row items-center space-x-4">
              <div className="p-2">
                <PlusIcon className="w-4 h-4 text-white" />
              </div>
              <UserProfileImage
                containerClassName="w-9 h-9"
                src={currentUser.imgUrl}
              />
            </button>
          ) : rightItems ? (
            renderRightItem(rightItems)
          ) : (
            renderRightItem(DEFAULT_RIGHT_ITEMS_NO_USER)
          )}
        </Flex>
      </Box>
    </Flex>
  );
};
