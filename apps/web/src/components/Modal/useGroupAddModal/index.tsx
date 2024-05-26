import { css } from "@emotion/react";
import * as Form from "@radix-ui/react-form";
import { Box, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import { useState } from "react";

import ACCheckbox from "@arcave/components/ACCheckbox";
import Chip from "@arcave/components/Chip";
import Button from "@arcave/components/common/Button/Button";
import HStack from "@arcave/components/common/Stack/HStack";
import VStack from "@arcave/components/common/Stack/VStack";
import useAPICategory from "@arcave/services/external/useAPICategory";
import {
  executeGroupPatch,
  executeGroupPost,
} from "@arcave/services/external/useAPIGroup";
import { PaletteColor, SemanticColor } from "@arcave/utils/color";

import DropdownCheckbox from "./DropdownCheckbox";
import useUploadImage from "../common/useUploadImage";

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
      prev.filter((category) => category !== value),
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
          groupCategories.length !== 0 ? groupCategories : categories,
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
            <VStack spacing={16}>
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
              <VStack spacing={8}>
                <Text>카테고리</Text>
                {selectedCategories.length !== 0 && (
                  <HStack spacing={16} wrap={"wrap"}>
                    {selectedCategories.map((category) => (
                      <Chip key={`chip-${category}`}>{category}</Chip>
                    ))}
                  </HStack>
                )}
                <Form.Field className="FormField" name="group">
                  <DropdownCheckbox
                    categories={categories}
                    selectedCategories={selectedCategories}
                    onChange={handleSelectCategories}
                  />
                </Form.Field>
              </VStack>
              <VStack spacing={8}>
                <Text>그룹 이름</Text>
                <TextField.Input
                  size="3"
                  placeholder="그룹 이름을 입력해주세요"
                  onChange={handleChangeName}
                  value={name}
                />
              </VStack>
              <VStack spacing={8}>
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
                <HStack spacing={16} alignItems={"center"}>
                  <ACCheckbox
                    checked={isPrivate}
                    onClick={handleClickIsPrivate}
                  />
                  <span>그룹 비공개로 설정하기</span>
                </HStack>
                <HStack spacing={16}>
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
                <Button
                  size={"2"}
                  className="w-fit"
                  onClick={() => {}}
                  backgroundColor={PaletteColor.Gray[200]}
                >
                  취소
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button
                  size={"2"}
                  className="w-fit"
                  onClick={() => save()}
                  backgroundColor={SemanticColor.Primary.Default}
                >
                  확인
                </Button>
              </Dialog.Close>
            </Flex>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Root>
    ),
  };
};

export default useGroupAddModal;
