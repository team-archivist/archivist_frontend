import { css } from "@emotion/react";
import { Box, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BaseButton } from "@arcave/components/common/button";
import { HStack } from "@arcave/components/common/Stack/HStack";
import { NavigationBar } from "@arcave/components/NavigationBar";
import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import useKakaoLogin from "@arcave/hooks/useKakaoLogin";
import { SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

enum NavigationBarLeftItem {
  LOGO = "logo",
}

/**
 * - Landing 페이지입니다
 */
const LandingPage = () => {
  const { onLogin } = useKakaoLogin();
  const currentPathname = usePathname();

  return (
    <>
      <NavigationBar
        currentPath={currentPathname.slice(1)}
        leftItems={{
          [NavigationBarLeftItem.LOGO]: (
            <Link
              href={"/feed"}
              css={css`
                display: flex;
                align-items: center;
                height: 100%;
              `}
            >
              <ARCAVE_LOGO />
            </Link>
          ),
        }}
        rightItems={{}}
      />
      <HStack
        width={"100%"}
        css={css`
          justify-content: center;
          align-items: center;
          background-color: #f6f6f4;
          height: calc(100% - 56px);

          @media screen and (max-width: 1280px) {
            justify-content: space-between;
            padding: 20px;
          }
        `}
      >
        <Box>
          <Text
            as="h1"
            css={css`
              color: ${SemanticColor.Text.Normal};
              font-size: 58px;
              line-height: 1;
              letter-spacing: -0.24px;
            `}
          >
            관심가는 순간 <br />
            조각조각 모음,{" "}
            <Text
              css={css`
                font-weight: bold;
              `}
            >
              아케이브
            </Text>
          </Text>
          <Text
            css={css`
            color : ${SemanticColor.Text.Alternative};
            font-size : ${Typography.Title1[20].Regular}
            margin-top : 20px;
          `}
          >
            관심가는 페이지, 놓치지 말고 아케이브 하세요.
            <br />
            좋아하는것을 조각조각 모아 내 취향을 찾아보세요.
          </Text>
          <Box
            css={css`
              margin-top: 20px;
            `}
          >
            <BaseButton size="4" onClick={onLogin}>
              카카오톡 계정으로 시작하기
            </BaseButton>
          </Box>
        </Box>
        <Box
          css={css`
            margin-left: 30px;

            @media screen and (max-width: 1280px) {
              max-width: 600px;
            }
          `}
        >
          <img src="/images/landing.png" alt="랜딩페이지 이미지" />
        </Box>
      </HStack>
    </>
  );
};
export default LandingPage;
