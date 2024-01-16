import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Select } from "@radix-ui/themes";
import React from "react";

type Props = {};

const GroupSelectItem = styled(Select.Item)`
  height: 48px;
  margin: 8px 0;
`;

const ACSelect = (props: Props) => {
  return (
    <Select.Root size="3" defaultValue="모든 그룹">
      <Select.Trigger />
      <Select.Content position="popper">
        <GroupSelectItem value="orange">모든 그룹</GroupSelectItem>
        <GroupSelectItem value="apple">그룹1</GroupSelectItem>
        <GroupSelectItem value="grape">그룹2</GroupSelectItem>
      </Select.Content>
    </Select.Root>
  );
};

export default ACSelect;
