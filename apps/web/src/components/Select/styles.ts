import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Select, Text } from "@radix-ui/themes";

export const GroupSelectItem = styled(Select.Item)`
  height: 48px;
  margin: 8px 0;

  > span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const groupSelectItemStyle = css`
  height: 48px;
  margin: 8px 0;

  > span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const GroupSelectItemImg = styled("img")`
  display: inline-block;
  width: 33px;
  height: 33px;
  margin-right: 10px;
`;

export const GroupSelectItemText = styled(Text)`
  display: inline-block;
`;
