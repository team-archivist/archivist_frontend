import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Grid } from "@radix-ui/themes";
import { useState } from "react";

import ACCheckbox from "@arcave/components/ACCheckbox";
import HStack from "@arcave/components/common/Stack/HStack";
import VStack from "@arcave/components/common/Stack/VStack";
import Dropdown from "@arcave/components/Dropdown";

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
    <VStack>
      <SelectLayout onClick={handleChangeOpen}>
        카테고리 선택
        <ChevronDownIcon />
      </SelectLayout>
      {open && (
        <Dropdown>
          <Grid
            columns="2"
            gap="3"
            css={css`
              width: 258px;
            `}
          >
            {categories.map((category) => (
              <HStack key={category} spacing={8} alignItems={"center"}>
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
        </Dropdown>
      )}
    </VStack>
  );
};

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
