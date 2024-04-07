import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Select, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import useAPIGroup from "../../services/external/useAPIGroup";
import { GROUP_VALUE } from "./types";

const GroupSelectItem = styled(Select.Item)`
  height: 48px;
  margin: 8px 0;

  > span {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
`;

const GroupSelectItemImg = styled("img")`
  display: inline-block;
  width: 33px;
  height: 33px;
  margin-right: 10px;
`;

const GroupSelectItemText = styled(Text)`
  display: inline-block;
`;

type Props = {
  onChange: (value: string) => void;
};

const ACSelect = ({ onChange }: Props) => {
  const { groups } = useAPIGroup();
  const [selectedValue, setSelectedValue] = useState("");

  // 선택값이 변경될때 호출되는 함수입니다
  const handleSelectValueChange = (value: string) => {
    onChange(value);
    setSelectedValue(value);
  };

  useEffect(() => {
    setSelectedValue(GROUP_VALUE.UNDESIGNATED);
  }, []);

  if (!groups) {
    return <>그룹을 먼저 추가해주세요</>;
  }
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
        <GroupSelectItem value={GROUP_VALUE.UNDESIGNATED}>
          그룹 미지정
        </GroupSelectItem>
        {groups.map((group) => (
          <GroupSelectItem
            key={`${group?.groupId}-${group?.groupName}`}
            value={group?.groupId.toString()}
          >
            <GroupSelectItemImg src={group?.imgUrl} />
            <GroupSelectItemText> {group?.groupName} </GroupSelectItemText>
          </GroupSelectItem>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default ACSelect;
