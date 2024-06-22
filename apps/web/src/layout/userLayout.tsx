import { css } from "@emotion/react";
import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import ARCAVE_LOGO from "@arcave/assets/icons/logo_black.svg";
import { SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

const UserLayout = ({ children }: PropsWithChildren) => {
  const currentPathname = usePathname();
  if (!currentPathname) {
    return <></>;
  }

  const [_, currentPath] = currentPathname?.split("/");
  const isUseFooter =
    currentPath && currentPath !== "login" && currentPath !== "landing";

  return (
    <>
      {children}
      {isUseFooter && (
        <Box
          css={css`
            position: absolute;
            bottom: 0;
            width: 100%;
            background-color: #f5f5f5;
          `}
        >
          <Box
            className="px-6 sm:px-8 py-10 sm:py-14 space-y-4"
            css={css`
              max-width: 970px;
              margin: auto;
            `}
          >
            <ARCAVE_LOGO />
            <div className="flex flex-col sm:space-y-0 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <Link
                  href="https://www.notion.so/1be62413018d4dd7bcb264eda505635c"
                  target="_blank"
                  css={css`
                    color: ${SemanticColor.Text.Alternative};
                    ${Typography.Label2[14].Regular};
                    cursor: pointer;
                  `}
                >
                  이용약관
                </Link>
                <Text
                  className="sm:block hidden"
                  css={css`
                    color: ${SemanticColor.Text.Disable};
                    font-size: 11px;
                    line-height: 1.9;
                  `}
                >
                  &nbsp;|&nbsp;
                </Text>
                <Link
                  href="https://www.notion.so/e566e1eac53a4a859a38e878d461fda2"
                  target="_blank"
                  css={css`
                    color: ${SemanticColor.Text.Alternative};
                    ${Typography.Label2[14].Regular};
                    cursor: pointer;
                  `}
                >
                  개인정보처리방침
                </Link>
                <Text
                  className="sm:block hidden"
                  css={css`
                    color: ${SemanticColor.Text.Disable};
                    font-size: 11px;
                    line-height: 1.9;
                  `}
                >
                  &nbsp;|&nbsp;
                </Text>
                <Link
                  href="https://www.notion.so/Help-Support-203a2e43cb36438a95b52e8fa86c6c41"
                  target="_blank"
                  css={css`
                    color: ${SemanticColor.Text.Alternative};
                    ${Typography.Label2[14].Regular};
                    cursor: pointer;
                  `}
                >
                  help & support
                </Link>
              </div>
              <Box>
                <Text
                  css={css`
                    color: ${SemanticColor.Text.Alternative};
                    ${Typography.Label2[14].Regular};
                  `}
                >
                  Contact team.arcave@gmail.com
                </Text>
              </Box>
              <Box>
                <Text
                  css={css`
                    color: ${SemanticColor.Text.Normal};
                    font-weight: 500;
                  `}
                >
                  Copyright ⓒ Arcave All rights reserved.
                </Text>
              </Box>
            </div>
          </Box>
        </Box>
      )}
    </>
  );
};
export default UserLayout;
