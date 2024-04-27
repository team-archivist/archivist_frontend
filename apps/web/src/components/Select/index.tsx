import { css } from "@emotion/react";
import { Select } from "@radix-ui/themes";
import { useState } from "react";
import useAPIGroup from "../../services/external/useAPIGroup";
import { GROUP_VALUE } from "./types";
import {
  GroupSelectItemImg,
  GroupSelectItemText,
  groupSelectItemStyle,
} from "./styles";

type Props = {
  onChange: (value: string) => void;
};

const ACSelect = ({ onChange }: Props) => {
  const { groups } = useAPIGroup();
  const [selectedValue, setSelectedValue] = useState<string>(
    GROUP_VALUE.UNDESIGNATED
  );

  // 선택값이 변경될때 호출되는 함수입니다
  const handleSelectValueChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  // 여기 이미지 경로가 frontend 를 바라보고 있어서 발생하는 문제...
  return (
    <Select.Root
      size="3"
      value={selectedValue}
      onValueChange={handleSelectValueChange}
    >
      <Select.Trigger
        css={css`
          width: 100%;
          .rt-SelectTriggerInner > span {
            display: flex;
            align-items: center;
          }
        `}
      />
      <Select.Content position="popper">
        <Select.Item value={GROUP_VALUE.UNDESIGNATED}>그룹 미지정</Select.Item>
        {groups &&
          groups.map((group) => (
            <Select.Item
              css={groupSelectItemStyle}
              key={`${group?.groupId}-${group?.groupName}`}
              value={group?.groupId.toString()}
            >
              <GroupSelectItemImg src={group?.imgUrl} />
              <GroupSelectItemText> {group?.groupName} </GroupSelectItemText>
            </Select.Item>
          ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ACSelect;
