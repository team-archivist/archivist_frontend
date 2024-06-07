import { Select } from "antd";
import { useState } from "react";

import {
  GroupSelectItemImg,
  GroupSelectItemImgDisabled,
  GroupSelectItemText,
} from "./styles";
import { GROUP_VALUE } from "./types";
import useAPIGroup from "../../services/external/useAPIGroup";
import HStack from "../common/Stack/HStack";

type Props = {
  onChange: (value: string) => void;
};

const ACSelect = ({ onChange }: Props) => {
  const { groups } = useAPIGroup();
  const [selectedValue, setSelectedValue] = useState<string>(
    GROUP_VALUE.UNDESIGNATED,
  );

  // 선택값이 변경될때 호출되는 함수입니다
  const handleSelectValueChange = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <Select
      value={selectedValue}
      onChange={handleSelectValueChange}
      size="large"
      options={[
        { value: GROUP_VALUE.UNDESIGNATED, label: "그룹 미지정" },
        ...(groups?.map((group) => ({
          value: group?.groupId.toString(),
          label: group?.groupName,
        })) ?? []),
      ]}
      optionRender={(option) => {
        const imgUrl = groups?.find((group) => !!group.imgUrl).imgUrl;
        console.log("imgUrl", imgUrl);
        return (
          <HStack>
            {imgUrl ? (
              <GroupSelectItemImg src={imgUrl} />
            ) : (
              <GroupSelectItemImgDisabled />
            )}
            <GroupSelectItemText> {option.label} </GroupSelectItemText>
          </HStack>
        );
      }}
      labelRender={({ label }) => {
        const imgUrl = groups?.find((group) => !!group.imgUrl).imgUrl;
        console.log("imgUrl", imgUrl);
        return (
          <HStack alignItems="center">
            {imgUrl ? (
              <GroupSelectItemImg src={imgUrl} />
            ) : (
              <GroupSelectItemImgDisabled />
            )}
            <GroupSelectItemText> {label} </GroupSelectItemText>
          </HStack>
        );
      }}
    />
  );

  // 여기 이미지 경로가 frontend 를 바라보고 있어서 발생하는 문제...
  // return (
  //   <RadixSelect.Root
  //     size="3"
  //     value={selectedValue}
  //     onValueChange={handleSelectValueChange}
  //   >
  //     <RadixSelect.Trigger
  //       css={css`
  //         width: 100%;
  //         .rt-SelectTriggerInner > span {
  //           display: flex;
  //           align-items: center;
  //         }
  //       `}
  //     />
  //     <RadixSelect.Content position="popper">
  //       <RadixSelect.Item value={GROUP_VALUE.UNDESIGNATED}>
  //         그룹 미지정
  //       </RadixSelect.Item>
  //       {groups &&
  //         groups.map((group) => (
  //           <RadixSelect.Item
  //             css={groupSelectItemStyle}
  //             key={`${group?.groupId}-${group?.groupName}`}
  //             value={group?.groupId.toString()}
  //           >
  //             <GroupSelectItemImg src={group?.imgUrl} />
  //             <GroupSelectItemText> {group?.groupName} </GroupSelectItemText>
  //           </RadixSelect.Item>
  //         ))}
  //     </RadixSelect.Content>
  //   </RadixSelect.Root>
  // );
};

export default ACSelect;
