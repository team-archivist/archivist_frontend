import { Select as AntdSelect } from "antd";
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
  value?: any;
};

const Select = ({ onChange, value }: Props) => {
  const { groups } = useAPIGroup();

  const options = [
    ...(groups?.map((group) => ({
      value: group?.groupId.toString(),
      label: group?.groupName,
    })) ?? []),
  ];

  // 선택값이 변경될때 호출되는 함수입니다
  const handleSelectValueChange = (value: string) => {
    onChange(value);
  };

  const selectItemRender = (option: any) => {
    const imgUrl = groups?.find((group) => !!group.imgUrl)?.imgUrl;

    return (
      <HStack alignItems="center">
        {imgUrl ? (
          <GroupSelectItemImg src={imgUrl} />
        ) : (
          <GroupSelectItemImgDisabled />
        )}
        <GroupSelectItemText> {option.label} </GroupSelectItemText>
      </HStack>
    );
  };

  return (
    <AntdSelect
      value={value}
      onChange={handleSelectValueChange}
      size="large"
      options={options}
      optionRender={selectItemRender}
      labelRender={selectItemRender}
    />
  );
};

export default Select;
