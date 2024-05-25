import { css } from "@emotion/react";
import { Button as AntdButton, ButtonProps } from "antd";
import { PropsWithChildren } from "react";

import { SemanticColor } from "@arcave/utils/color";

// FIXME : backgroundColor와 관련된 영역을 시맨틱한 이름으로 다룰 수 있도록 변경 필요
type Props = ButtonProps & { backgroundColor?: string };

const Button = ({
  children,
  onClick,
  backgroundColor,
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

        border: none;
        border-radius: 16px;

        background-color: ${backgroundColor ?? SemanticColor.Primary.Default};
        color: white;
        cursor: pointer;
      `}
      {...(onClick ? { onClick } : {})}
      {...rest}
    >
      {children}
    </AntdButton>
  );
};

export default Button;
