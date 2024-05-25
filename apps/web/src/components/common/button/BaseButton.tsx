import { css } from "@emotion/react";
import { Button } from "@radix-ui/themes";
import { ButtonProps } from "@radix-ui/themes/dist/cjs/components/button";
import { PropsWithChildren } from "react";

import { SemanticColor } from "@arcave/utils/color";

// FIXME : backgroundColor와 관련된 영역을 시맨틱한 이름으로 다룰 수 있도록 변경 필요
type Props = ButtonProps & { backgroundColor?: string };

/**
 * - Main Button Component 입니다
 */
export const BaseButton = ({
  children,
  size,
  onClick,
  backgroundColor,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <Button
      size={size ?? "2"}
      variant="solid"
      radius="full"
      css={css`
        background-color: ${backgroundColor ?? SemanticColor.Primary.Default};
        cursor: pointer;
      `}
      {...(onClick ? { onClick } : {})}
      {...rest}
    >
      {children}
    </Button>
  );
};
