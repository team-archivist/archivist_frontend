import { BaseButtonMain, PaletteColor, SemanticColor } from "@archivist/ui";

import { Dialog, Flex, TextField } from "@radix-ui/themes";

import LinkModalAtom from "@store/LinkModalAtom";
import { useAtom } from "jotai";
import { useState } from "react";

import useBookmarkAddDetailModal from "./useBookmarkAddDetailModal";

import * as Form from "@radix-ui/react-form";

const useBookmarkAddModal = ({ handleOpenGroupAddModal }) => {
  const [, setLinkDTO] = useAtom(LinkModalAtom);
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string>("");

  const detailModal = useBookmarkAddDetailModal({ handleOpenGroupAddModal });

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClickNext = () => {
    setLinkDTO((prevDTO) => ({ ...prevDTO, linkUrl: url }));
    detailModal.show();
  };

  // CommonUtils.isValidURL();

  return {
    show: () => handleChangeOpen(true),
    render: () => (
      <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>URL 입력</Dialog.Title>
          <Form.Root className="FormRoot">
            <Flex direction="column" gap="3">
              <Form.Field name="url">
                <TextField.Input
                  onChange={({ target: { value } }) => setUrl(value)}
                  size="3"
                  placeholder="URL 주소를 입력해주세요"
                />
                <Form.Message
                  match={(value, formData) => {
                    console.log(value, formData);
                  }}
                >
                  Only John is allowed.
                </Form.Message>
              </Form.Field>
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
          </Form.Root>
        </Dialog.Content>
        {detailModal.render()}
      </Dialog.Root>
    ),
  };
};

export default useBookmarkAddModal;
