import { css } from "@emotion/react";
import { Button } from "@radix-ui/themes";
import { ButtonProps } from "antd";
import { PropsWithChildren } from "react";

import { SemanticColor } from "@arcave/utils/color";

// FIXME : backgroundColor와 관련된 영역을 시맨틱한 이름으로 다룰 수 있도록 변경 필요
type Props = ButtonProps & { backgroundColor?: string };

const OutlineButton = ({
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

export default OutlineButton;
