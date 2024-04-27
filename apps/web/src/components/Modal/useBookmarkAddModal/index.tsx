import { BaseButton, PaletteColor, SemanticColor } from "@archivist/ui";
import { css } from "@emotion/react";

import { Dialog, Flex, Text, TextField } from "@radix-ui/themes";

import LinkModalAtom from "@store/LinkModalAtom";
import { useAtom } from "jotai";
import { useState } from "react";

import useBookmarkAddDetailModal from "./useBookmarkAddDetailModal";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const URL_REGEX =
  /^(https?|ftp):\/\/([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.[a-zA-Z]{2,9}(:\d{1,5})?(\/[^\s]*)?(\?[^\s]*)?(#\w*)?$/;

const schema = z
  .object({
    linkUrl: z
      .string()
      .refine(
        (value) => URL_REGEX.test(value ?? ""),
        "잘못된 형식의 링크입니다."
      ),
  })
  .required();

const useBookmarkAddModal = ({ handleOpenGroupAddModal }) => {
  const [, setLinkDTO] = useAtom(LinkModalAtom);
  const [open, setOpen] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const detailModal = useBookmarkAddDetailModal({ handleOpenGroupAddModal });

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClickNext = () => {
    const linkUrl = getValues("linkUrl");
    setLinkDTO((prevDTO) => ({ ...prevDTO, linkUrl: linkUrl }));
    detailModal.show();
    handleChangeOpen(false);
  };

  return {
    show: () => handleChangeOpen(true),
    close: () => handleChangeOpen(false),
    render: () => (
      <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>URL 입력</Dialog.Title>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <TextField.Input
              size="3"
              placeholder="URL 주소를 입력해주세요"
              {...register("linkUrl")}
            />
            {errors.linkUrl && (
              <Text
                css={css`
                  font-size: 14px;
                  color: ${SemanticColor.Status.Alert};
                `}
              >
                {errors.linkUrl.message as string}
              </Text>
            )}
          </form>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <BaseButton
                size={"2"}
                className="w-fit"
                backgroundColor={PaletteColor.Gray[200]}
                onClick={() => handleChangeOpen(false)}
              >
                취소
              </BaseButton>
            </Dialog.Close>
            <Dialog.Close>
              <BaseButton
                size={"2"}
                className="w-fit"
                onClick={handleSubmit(handleClickNext)}
                backgroundColor={
                  isValid
                    ? SemanticColor.Primary.Default
                    : PaletteColor.Gray[200]
                }
              >
                다음
              </BaseButton>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
        {detailModal.render()}
      </Dialog.Root>
    ),
  };
};

export default useBookmarkAddModal;
