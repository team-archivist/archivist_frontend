import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Select } from "@radix-ui/themes";
import React from "react";
import useAPIGroup from "../../services/external/useAPIGroup";
import { GROUP_VALUE } from "./types";

const GroupSelectItem = styled(Select.Item)`
  height: 48px;
  margin: 8px 0;
`;

const ACSelect = ({ onChange }) => {
  const { groups } = useAPIGroup();
  return (
    <Select.Root
      size="3"
      defaultValue={GROUP_VALUE.UNDESIGNATED}
      onValueChange={onChange}
    >
      <Select.Trigger
        css={css`
          width: 100%;
        `}
      />
      <Select.Content position="popper">
        <GroupSelectItem value={GROUP_VALUE.UNDESIGNATED}>
          그룹 미지정
        </GroupSelectItem>
        {groups.map((group) => (
          <GroupSelectItem key={group?.groupId} value={group?.groupId}>
            <img src={group?.imgUrl} />
            {group?.groupName}
          </GroupSelectItem>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ACSelect;
