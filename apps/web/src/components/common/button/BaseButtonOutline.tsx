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
export const BaseButtonOutline = ({
  children,
  size,
  onClick,
  color,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <Button
      size={size ?? "2"}
      variant="solid"
      radius="full"
      css={css`
        border-width: 1px;
        border-style: solid;
        background-color: transparent;
        color: ${color ?? SemanticColor.Primary.Default};
        border-color: ${color ?? SemanticColor.Primary.Default};
        cursor: pointer;
      `}
      {...(onClick ? { onClick } : {})}
      {...rest}
    >
      {children}
    </Button>
  );
};
