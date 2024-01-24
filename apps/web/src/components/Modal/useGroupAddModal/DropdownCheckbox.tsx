import { HStack, SemanticColor, VStack } from "@archivist/ui";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Button, Checkbox, DropdownMenu, Flex, Grid } from "@radix-ui/themes";
import React, { Fragment, useState } from "react";
import { ChevronDownIcon, PlusIcon } from "@radix-ui/react-icons";
import ACCheckbox from "@components/ACCheckbox";

type Props = {
  categories: string[];
  selectedCategories: string[];
  onChange: (value: string, on: boolean) => void;
};

const DropdownCheckbox = ({
  categories,
  selectedCategories,
  onChange,
}: Props) => {
  const [open, setOpen] = useState(false);

  const handleChangeOpen = () => {
    setOpen(!open);
  };

  // FIXME : checked 로직 변경 필요
  const handleClickCheckbox = (category: string, checked: boolean) => {
    onChange(category, checked);
  };

  return (
    <VStack gap={"4"}>
      <SelectLayout onClick={handleChangeOpen}>
        카테고리 선택
        <ChevronDownIcon />
      </SelectLayout>
      {open && (
        <DropdownLayout>
          <Grid
            columns="2"
            gap="3"
            css={css`
              width: 258px;
            `}
          >
            {categories.map((category) => (
              <HStack key={category} height={"6"} gap={"2"} align={"center"}>
                <ACCheckbox
                  onClick={(checked: boolean) =>
                    handleClickCheckbox(category, checked)
                  }
                  checked={selectedCategories.includes(category)}
                />{" "}
                {category}
              </HStack>
            ))}
          </Grid>
        </DropdownLayout>
      )}
    </VStack>
  );
};

const DropdownLayout = styled.div`
  position: absolute;
  z-index: 2;
  transform: translateY(60px);

  width: 300px;
  height: 232px;
  padding: 16px;
  box-sizing: border-box;

  overflow-y: scroll;
  overflow-x: hidden;

  background: white;
  border-radius: 12px;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.08);
`;

const SelectLayout = styled(HStack)`
  width: 100%;
  height: 48px;
  padding: 0px 16px;

  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid var(--Gray900, #1a1a1a);
  background: var(--Gray100, #f5f5f5);
`;

export default DropdownCheckbox;
