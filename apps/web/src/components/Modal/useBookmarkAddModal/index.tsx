import { css } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "@radix-ui/themes";
import { useAtom } from "jotai";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import ACInput from "@arcave/components/common/Input";
import ACModal from "@arcave/components/common/Modal";
import VStack from "@arcave/components/common/Stack/VStack";
import LinkModalAtom from "@arcave/store/LinkModalAtom";
import { SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

import useBookmarkAddDetailModal from "./useBookmarkAddDetailModal";

const URL_REGEX =
  /^(https?|ftp):\/\/([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+\.[a-zA-Z]{2,9}(:\d{1,5})?(\/[^\s]*)?(\?[^\s]*)?(#\w*)?$/;

const schema = z
  .object({
    linkUrl: z
      .string({
        required_error: "링크 입력은 필수입니다.",
      })
      .refine(
        (value) => URL_REGEX.test(value ?? ""),
        "잘못된 형식의 링크입니다.",
      ),
  })
  .required();

const useBookmarkAddModal = ({ handleOpenGroupAddModal }) => {
  const [, setLinkDTO] = useAtom(LinkModalAtom);
  const [open, setOpen] = useState(false);

  const formMethods = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });

  const {
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = formMethods;

  const detailModal = useBookmarkAddDetailModal({ handleOpenGroupAddModal });

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClickNext = () => {
    const linkUrl = getValues("linkUrl");
    setLinkDTO((prevDTO) => ({ ...prevDTO, linkUrl: linkUrl }));
    detailModal.show();
    handleModalClose();
  };

  const handleModalClose = () => {
    handleChangeOpen(false);
    reset();
  };

  return {
    show: () => handleChangeOpen(true),
    close: handleModalClose,
    render: () => (
      <>
        <ACModal
          title="URL 입력"
          open={open}
          okText="다음"
          onOk={handleSubmit(handleClickNext)}
          okButtonProps={{ disabled: !isValid }}
          cancelText="취소"
          onCancel={handleModalClose}
        >
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              <VStack spacing={8}>
                <label css={Typography.Label2[14].Regular}>URL</label>
                <ACInput
                  name="linkUrl"
                  size="large"
                  placeholder="URL 주소를 입력해주세요"
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
              </VStack>
            </form>
          </FormProvider>
        </ACModal>
        {detailModal.render()}
      </>
    ),
  };
};

export default useBookmarkAddModal;
