import { css } from "@emotion/react";
import { Checkbox, CheckboxProps } from "antd";

type Props = {};

const ACCheckbox = ({ onClick, checked, ...rest }) => {
  const handleClick: CheckboxProps["onChange"] = (event) => {
    onClick(event.target.checked);
  };

  return (
    <Checkbox
      onChange={handleClick}
      value={checked}
      css={css`
        width: 18px;
        height: 18px;
        border: 2px solid #4d4d4d;
        border-radius: 2px;
        box-shadow: none;
        box-sizing: border-box;

        .ant-checkbox-inner {
          width: 14px;
          height: 14px;
          border-radius: 0;
          border: none;
        }
      `}
    />
  );
};

export default ACCheckbox;
