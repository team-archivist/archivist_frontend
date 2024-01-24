import { BaseButtonMain, PaletteColor, SemanticColor } from "@archivist/ui";

import { Dialog, Flex, TextField } from "@radix-ui/themes";

import LinkModalAtom from "@store/LinkModalAtom";
import { useAtom } from "jotai";
import { useState } from "react";

import useBookmarkAddDetailModal from "./useBookmarkAddDetailModal";

const useBookmarkAddModal = () => {
  const [, setLinkDTO] = useAtom(LinkModalAtom);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string>("");

  const detailModal = useBookmarkAddDetailModal();

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClickNext = () => {
    setLinkDTO((prevDTO) => ({ ...prevDTO, linkUrl: url }));
    detailModal.show();
  };

  return {
    show: () => handleChangeOpen(true),
    render: () => (
      <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>URL 입력</Dialog.Title>
          <Flex direction="column" gap="3">
            <TextField.Input
              onChange={({ target: { value } }) => setUrl(value)}
              size="3"
              placeholder="URL 주소를 입력해주세요"
            />
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
                onClick={handleClickNext}
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

export default useBookmarkAddModal;
