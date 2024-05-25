import { css } from "@emotion/react";
import { ButtonProps, Button as AntdButton } from "antd";
import { PropsWithChildren } from "react";

import { SemanticColor } from "@arcave/utils/color";

// FIXME : backgroundColor와 관련된 영역을 시맨틱한 이름으로 다룰 수 있도록 변경 필요
type Props = ButtonProps & { backgroundColor?: string };

const OutlineButton = ({
  children,
  onClick,
  color,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <AntdButton
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 12px;
        height: 32px;
        padding: 0px 12px;

        border-width: 1px;
        border-style: solid;
        border-radius: 16px;
        border-color: ${color ?? SemanticColor.Primary.Default};

        background-color: transparent;
        color: ${color ?? SemanticColor.Primary.Default};

        cursor: pointer;
      `}
      {...(onClick ? { onClick } : {})}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};

export default OutlineButton;
