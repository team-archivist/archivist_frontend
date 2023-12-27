import { BaseButtonMain, PaletteColor, SemanticColor } from "@archivist/ui";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextArea,
  TextField,
  TextFieldInput,
} from "@radix-ui/themes";
import { useState } from "react";

const useBookmarkAddModal = () => {
  const [open, setOpen] = useState(false);
  const detailModal = useBookmarkAddDetailModal();

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return {
    show: () => handleChangeOpen(true),
    render: () => (
      <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>URL 입력</Dialog.Title>
          <Flex direction="column" gap="3">
            <TextField.Input size="3" placeholder="URL 주소를 입력해주세요" />
          </Flex>

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
                onClick={detailModal.show}
                backgroundColor={SemanticColor.Primary.Default}
              >
                다음
              </BaseButtonMain>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
        {detailModal.render()}
      </Dialog.Root>
    ),
  };
};

const useBookmarkAddDetailModal = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const handleChangeDescription = (value: string) => {
    setCount(value.length);
  };

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return {
    show: () => handleChangeOpen(true),
    render: () => (
      <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>북마크 담기</Dialog.Title>
          <Flex direction="column" gap="3">
            <Text>그룹</Text>
            <TextField.Input
              size="3"
              placeholder="북마크 이름을 입력해주세요"
            />
          </Flex>
          <Flex direction="column" gap="3">
            <Text>북마크 이름</Text>
            <TextField.Input
              size="3"
              placeholder="북마크 이름을 입력해주세요"
            />
          </Flex>
          <Flex direction="column" gap="3">
            <Text>북마크 설명</Text>
            <TextArea
              size="3"
              placeholder="북마크 설명을 입력해주세요"
              onChange={({ target: { value } }) =>
                handleChangeDescription(value)
              }
            />
            <Text>{count}/400</Text>
          </Flex>

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
                확인
              </BaseButtonMain>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    ),
  };
};

export default useBookmarkAddModal;
