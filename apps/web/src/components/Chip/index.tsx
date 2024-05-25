import { css } from "@emotion/react";
import { Tag } from "antd";
import { PropsWithChildren } from "react";

import { PaletteColor } from "@arcave/utils/color";

const Chip = ({ children }: PropsWithChildren) => {
  return (
    <Tag
      bordered={false}
      css={css`
        display: flex;
        height: 36px;
        padding: 0px 16px;
        justify-content: center;
        align-items: center;
        border-radius: 18px;
        background: ${PaletteColor.Gray[200]};

        font-size: 14px;
      `}
    >
      {children}
    </Tag>
  );
};

export default Chip;
