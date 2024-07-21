import { css } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Text } from "@radix-ui/themes";
import { message } from "antd";
import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import ACModal from "@arcave/components/common/Modal";
import HStack from "@arcave/components/common/Stack/HStack";
import VStack from "@arcave/components/common/Stack/VStack";
import Select from "@arcave/components/Select";
import { BookmarkTab } from "@arcave/pages/mycave";
import useAPILink from "@arcave/services/external/useAPILink";
import useAPIScrape from "@arcave/services/internal/useAPIScrape";
import BookmarkTabAtom from "@arcave/store/BookmarkTabAtom";
import LinkModalAtom, { LinkModel } from "@arcave/store/LinkModalAtom";
import { PaletteColor, SemanticColor } from "@arcave/utils/color";
import { Typography } from "@arcave/utils/typography";

import useUploadImage from "./common/useUploadImage";
import Input from "../common/Input";
import ACSkeleton from "../common/Skeleton";
import TextArea from "../common/TextArea";
import { GROUP_VALUE } from "../Select/types";

const schema = z
  .object({
    linkName: z
      .string()
      .min(1, "북마크는 필수 입력입니다.")
      .max(100, "북마크 이름은 최대 100자까지 입력할 수 있습니다."),
    linkDesc: z
      .string()
      .max(400, "북마크 설명은 최대 400자까지 입력할 수 있습니다."),
  })
  .required();

const useBookmarkAddDetailModal = ({ handleOpenGroupAddModal }) => {
  const [linkDto, setLinkDto] = useAtom(LinkModalAtom);

  const imgRef = useRef<HTMLImageElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"CREATE" | "MODIFY">();

  const [, setBookmarkTabValue] = useAtom(BookmarkTabAtom);

  const {
    previewImageUrl,
    fileImageBlob,
    fileInputRef,
    handleChangePreviewImageUrl,
    handleChangeFileInput,
    resetUploadField,
    isImageReady,
  } = useUploadImage();

  const { executePost: executePostLink, executePatch: executePatchLink } =
    useAPILink({
      linkDto: linkDto as LinkModel,
      fileImageBlob,
      previewImageExtension: previewImageUrl.split(".").at(-1) as string,
    });

  const { executeFetch: executeFetchScrape } = useAPIScrape(linkDto?.linkUrl);

  const formMethods = useForm({
    mode: "all",
    resolver: zodResolver(schema),
  });
  const {
    getValues,
    handleSubmit,
    setValue,
    watch,
    reset: resetFormState,
    formState: { errors, isValid },
  } = formMethods;

  const watchLinkDesc = watch("linkDesc");

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const resetModal = () => {
    resetUploadField();
    resetFormState();
    setLinkDto({});
    setMode(undefined);
    setIsLoading(false);
  };

  const handleClickUploadPanel = () => {
    fileInputRef.current?.click();
  };

  const submit = async () => {
    const isModify = !!linkDto?.linkId;
    try {
      if (isModify) {
        await executePatchLink({ ...linkDto, ...getValues() });
        message.success("링크를 케이브에 담았습니다! 다른 취향도 찾아보세요!");
        handleModalClose();
        return;
      }

      await executePostLink({ ...linkDto, ...getValues() }, imgRef.current);
      message.success("링크를 케이브에 담았습니다! 다른 취향도 찾아보세요!");
      handleModalClose();
    } catch (e) {
      console.error(e);
      message.error("오류가 발생했습니다");
    }
  };

  const handleClickAddGroup = () => {
    resetModal();
    setBookmarkTabValue(BookmarkTab.GROUP);
    handleOpenGroupAddModal();
  };

  const handleShow = (params, mode: "CREATE" | "MODIFY") => {
    if (params) {
      const { linkId, linkName, linkDesc, groupList, linkUrl, imgUrl } = params;
      setLinkDto({
        linkId,
        linkName,
        linkDesc,
        linkUrl,
        // TODO: groupList가 복수로 내려오는 경우 처리 여부 결정 필요
        groupId: groupList?.[0] ?? GROUP_VALUE.DEFAULT,
        // TODO: 이미지영역 오류 체크 필요.
        ...(imgUrl
          ? { imgUrl: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${imgUrl}` }
          : {}),
      });
    }
    handleChangeOpen(true);
    setMode(mode);
  };

  const handleModalClose = () => {
    resetModal();
    handleChangeOpen(false);
  };

  useEffect(() => {
    if (!mode) {
      return;
    }

    (async () => {
      if (mode === "MODIFY") {
        setValue("linkName", linkDto?.linkName, { shouldValidate: true });
        setValue("linkDesc", linkDto?.linkDesc, { shouldValidate: true });
        if (linkDto.imgUrl) {
          handleChangePreviewImageUrl(linkDto.imgUrl);
        }
        setIsLoading(false);
        return;
      }

      if (!!linkDto?.linkUrl) {
        try {
          setIsLoading(true);
          const { title, ogDescription, ogImage } = await executeFetchScrape();

          // TODO: 이 분리성을 어떻게 해결해야 하지..
          setLinkDto({
            ...linkDto,
            linkName: title,
            linkDesc: ogDescription,
            groupId: GROUP_VALUE.DEFAULT,
          });
          setValue("linkName", title, { shouldValidate: true });
          setValue("linkDesc", ogDescription, { shouldValidate: true });
          if (ogImage) {
            handleChangePreviewImageUrl(ogImage);
          }

          setIsLoading(false);
        } catch (e) {
          window.alert("해당 링크의 메타정보를 가져올 수 없습니다");
          return;
        }
      }
    })();
  }, [mode, linkDto?.linkUrl]);

  return {
    show: handleShow,
    close: () => {
      resetModal();
    },
    render: () => (
      <ACModal
        title="링크 담기"
        open={open}
        okText="확인"
        onOk={handleSubmit(submit)}
        okButtonProps={{ disabled: !isValid }}
        cancelText="취소"
        onCancel={handleModalClose}
      >
        {isLoading && !isImageReady ? (
          <ACSkeleton count={3} />
        ) : (
          <FormProvider {...formMethods}>
            <form>
              <VStack spacing={8}>
                {previewImageUrl ? (
                  <img
                    ref={imgRef}
                    src={previewImageUrl}
                    onClick={handleClickUploadPanel}
                    onError={resetUploadField}
                  />
                ) : (
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
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                  name="linkImgFile"
                  hidden
                  onChange={handleChangeFileInput}
                />
                <VStack spacing={16}>
                  <VStack>
                    <HStack spacing={12} justify="space-between">
                      <label css={Typography.Label2[14].Regular}>그룹</label>
                      <Text
                        onClick={handleClickAddGroup}
                        css={css`
                          cursor: pointer;
                        `}
                      >
                        그룹 추가하기 {">"}
                      </Text>
                    </HStack>
                    <Select // FIXME: rhf으로 전환 예정
                      onChange={(value: string): void => {
                        setLinkDto((prevLinkDto) => ({
                          ...prevLinkDto,
                          groupId: value,
                        }));
                      }}
                    />
                  </VStack>
                  <VStack spacing={12}>
                    <label css={Typography.Label2[14].Regular}>링크 이름</label>
                    {/* linkDto.linkName */}
                    <Input
                      size="large"
                      name="linkName"
                      placeholder="링크 이름을 입력해주세요"
                    />
                    {errors.linkName && (
                      <Text
                        css={css`
                          font-size: 14px;
                          color: ${SemanticColor.Status.Alert};
                        `}
                      >
                        {errors.linkName.message as string}
                      </Text>
                    )}
                  </VStack>
                  <VStack spacing={12}>
                    <label css={Typography.Label2[14].Regular}>링크 설명</label>
                    {/* linkDto.linkDesc */}
                    <TextArea
                      size="large"
                      name="linkDesc"
                      placeholder="링크 설명을 입력해주세요"
                    />
                    {errors.linkDesc && (
                      <Text
                        css={css`
                          font-size: 14px;
                          color: ${SemanticColor.Status.Alert};
                        `}
                      >
                        {errors.linkDesc.message as string}
                      </Text>
                    )}
                    <Text
                      css={css`
                        font-size: 14px;
                      `}
                      align={"right"}
                    >
                      {watchLinkDesc?.length ?? 0}/400
                    </Text>
                  </VStack>
                </VStack>
              </VStack>
            </form>
          </FormProvider>
        )}
      </ACModal>
    ),
  };
};

export default useBookmarkAddDetailModal;
