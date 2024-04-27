import {
  BaseButton,
  HStack,
  PaletteColor,
  SemanticColor,
  VStack,
} from "@archivist/ui";

import { Box, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";

import { useState } from "react";

import * as Form from "@radix-ui/react-form";
import { css } from "@emotion/react";
import useAPICategory from "src/services/external/useAPICategory";
import DropdownCheckbox from "./DropdownCheckbox";
import ACCheckbox from "@components/ACCheckbox";
import Chip from "@components/Chip";
import useUploadImage from "../common/useUploadImage";
import {
  executeGroupPost,
  executeGroupPatch,
} from "src/services/external/useAPIGroup";

const useGroupAddModal = ({ onSuccess } = {}) => {
  const [open, setOpen] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [id, setId] = useState();

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

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

  const handleShow = (params = {}) => {
    const {
      groupName,
      groupDescription,
      groupIsPrivate,
      groupCategories,
      groupId,
    } = params;
    const init = () => {
      if ((!!groupName || !!groupDescription) && groupIsPrivate !== undefined) {
        setName(!!groupName ? groupName : name);
        setDescription(!!groupDescription ? groupDescription : description);
        setIsPrivate(groupIsPrivate);
        setSelectedCategories(
          groupCategories.length !== 0 ? groupCategories : categories
        );
        setId(groupId);
      } else {
        setName("");
        setDescription("");
        setIsPrivate(false);
        setSelectedCategories([]);
      }
    };

    handleChangeOpen(true);
    init();
  };

  const save = async () => {
    const fetchAction = !!id ? executeGroupPatch : executeGroupPost;

    try {
      await fetchAction({
        groupDto: {
          groupName: name,
          groupDesc: description,
          isGroupPublic: !isPrivate,
          categories: selectedCategories,
          ...(id ? { groupId: id } : {}),
        },
        fileImageBlob,
      });
      onSuccess?.();
    } catch (e) {}
  };

  return {
    show: (params = {}) => handleShow(params),
    render: () => (
      <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
        <Dialog.Content style={{ maxWidth: 348 }}>
          <Dialog.Title>{!!id ? "그룹 수정" : "그룹 추가"}</Dialog.Title>
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
              <VStack gap="1">
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
              </VStack>
              <VStack gap="1">
                <Text>그룹 이름</Text>
                <TextField.Input
                  size="3"
                  placeholder="그룹 이름을 입력해주세요"
                  onChange={handleChangeName}
                  value={name}
                />
              </VStack>
              <VStack gap="1">
                <Text>그룹 설명</Text>
                <TextArea
                  size="3"
                  placeholder="그룹 설명을 입력해주세요"
                  onChange={handleChangeDescription}
                  value={description}
                />
                {description.length}/400
              </VStack>
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
                <BaseButton
                  size={"2"}
                  className="w-fit"
                  onClick={() => {}}
                  backgroundColor={PaletteColor.Gray[200]}
                >
                  취소
                </BaseButton>
              </Dialog.Close>
              <Dialog.Close>
                <BaseButton
                  size={"2"}
                  className="w-fit"
                  onClick={() => save()}
                  backgroundColor={SemanticColor.Primary.Default}
                >
                  확인
                </BaseButton>
              </Dialog.Close>
            </Flex>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Root>
    ),
  };
};

export default useGroupAddModal;
