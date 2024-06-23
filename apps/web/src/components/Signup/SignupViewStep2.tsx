import { Flex, Text } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";

/**
 * - Step2 content  입니다
 *
 * --> Step1 JSX.Element 입니다
 */
export const SignupViewStep2 = ({
  chipListByActive,
  onClickByChip,
  setIsEnableNextStep,
  chipList,
}: any): React.JSX.Element => {
  /** 가입하기의 상태를 관리합니다 */
  useEffect(() => {
    let _isEnableNextStep = false;
    if (0 !== chipListByActive.length && 5 >= chipListByActive.length) {
      _isEnableNextStep = true;
    }
    setIsEnableNextStep(_isEnableNextStep);
  }, [chipListByActive, setIsEnableNextStep]);

  const renderChipList = chipList || [];

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-col">
        <Text className="font-pretendard font-bold leading-headline2-24 text-headline2-24 text-text-normal">
          관심 카테고리를 선택해주세요
        </Text>
        <Text
          as="p"
          className="font-pretendard font-normal leading-body1-16 text-body1-16 text-text-alternative"
        >
          카테고리는 최대 5개까지 선택할 수 있습니다.
        </Text>
      </div>
      <div className="">
        <span className="text-label2-14 text-text-normal">관심 카테고리</span>
        <Flex gap="2" align="center" wrap="wrap" className="mt-2">
          {renderChipList &&
            renderChipList.map((chip: any, chipIndex: number) => (
              <CategoryChip
                key={chipIndex}
                isActive={chipListByActive.includes(chip.name)}
                onClick={onClickByChip}
              >
                {chip.name}
              </CategoryChip>
            ))}
        </Flex>
      </div>
    </div>
  );
};

/** Category Chip 관련 컴포넌트입니다 */
const CategoryChip = ({ onClick, isActive, children }: any) => {
  if (!onClick) {
    onClick = (e) => {};
  }

  const classNames = {
    button: isActive ? "bg-gray-600" : "bg-gray-200",
    text: isActive ? "text-white" : "text-text-normal",
  };

  return (
    <button
      className={`${classNames.button} inline-flex items-center justify-center h-[36px] rounded-full gap-2 pl-4 pr-3 cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        onClick(e, children);
      }}
    >
      <span
        className={`${classNames.text} text-text-normal text-label2-14 leading-label2-14`}
      >
        {children}
      </span>
      {isActive ? <Cross2Icon style={{ stroke: "#fff" }} /> : <PlusIcon />}
    </button>
  );
};
