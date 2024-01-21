import {
  BaseButtonMain,
  HStack,
  PaletteColor,
  SemanticColor,
  VStack,
} from "@archivist/ui";

import { Box, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

import { useState } from "react";

import * as Form from "@radix-ui/react-form";
import { css } from "@emotion/react";
import useAPICategory from "src/services/external/useAPICategory";
import DropdownCheckbox from "./DropdownCheckbox";
import ACCheckbox from "@components/ACCheckbox";
import Chip from "@components/Chip";
import useUploadImage from "../common/useUploadImage";

const useGroupAddModal = () => {
  const [open, setOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const { categories } = useAPICategory();
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(categories);

  const {
    previewImageUrl,
    fileImageBlob,
    fileInputRef,
    handleChangePreviewImageUrl,
    handleChangeFileInput,
    resetUploadField,
  } = useUploadImage();

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleSelectCategories = (value, on) => {
    if (on) {
      setSelectedCategories([...selectedCategories, value]);
      return;
    }

    setSelectedCategories((prev) =>
      prev.filter((category) => category !== value)
    );
  };

  const handleClickIsPrivate = (on: boolean) => {
    setIsPrivate(on);
  };

  const handleClickUploadPanel = () => {
    fileInputRef.current?.click();
  };

  return {
    show: () => handleChangeOpen(true),
    render: () => (
      <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
        <Dialog.Content style={{ maxWidth: 348 }}>
          <Dialog.Title>그룹 추가</Dialog.Title>
          <Form.Root className="FormRoot">
            <VStack gap="6">
              <Box
                width={"100%"}
                className="h-52 rounded-lg"
                css={css`
                  background-color: ${PaletteColor.Gray[300]};
                  :hover {
                    cursor: pointer;
                  }
                `}
                onClick={handleClickUploadPanel}
              />
              <Flex direction="column" gap="3">
                <Text>카테고리</Text>
                <HStack gap="2" wrap={"wrap"}>
                  {selectedCategories.map((category) => (
                    <Chip key={`chip-${category}`}>{category}</Chip>
                  ))}
                </HStack>
                <Form.Field className="FormField" name="group">
                  <DropdownCheckbox
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={handleSelectCategories}
                  />
                </Form.Field>
              </Flex>
              <VStack>
                <HStack gap={"2"} align={"center"}>
                  <ACCheckbox
                    checked={isPrivate}
                    onClick={handleClickIsPrivate}
                  />
                  <span>그룹 비공개로 설정하기</span>
                </HStack>
                <HStack gap={"2"}>
                  <div
                    css={css`
                      width: 18px;
                    `}
                  ></div>
                  <span>그룹을 비공개하면 본인만 볼 수 있습니다.</span>
                </HStack>
              </VStack>
            </VStack>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <BaseButtonMain
                  size={"2"}
                  className="w-fit"
                  onClick={() => {}}
                  backgroundColor={PaletteColor.Gray[200]}
                >
                  취소
                </BaseButtonMain>
              </Dialog.Close>
              <Dialog.Close>
                <BaseButtonMain
                  size={"2"}
                  className="w-fit"
                  onClick={() => {}}
                  backgroundColor={SemanticColor.Primary.Default}
                >
                  다음
                </BaseButtonMain>
              </Dialog.Close>
            </Flex>
          </Form.Root>
        </Dialog.Content>
        {/* {detailModal.render()} */}
      </Dialog.Root>
    ),
  };
};

export default useGroupAddModal;
