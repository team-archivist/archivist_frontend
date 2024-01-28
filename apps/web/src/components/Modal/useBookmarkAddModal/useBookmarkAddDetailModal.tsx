import { useAtom } from "jotai";
import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { Box, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";

import {
  BaseButtonMain,
  HStack,
  PaletteColor,
  SemanticColor,
  VStack,
} from "@archivist/ui";

import LinkModalAtom, { LinkModel } from "@store/LinkModalAtom";

import useUploadImage from "../common/useUploadImage";
import useAPILink from "src/services/external/useAPILink";
import useAPIScrape from "src/services/internal/useAPIScrape";

import ACSelect from "@components/Select";
import { BookmarkTab } from "src/pages/mycave";
import BookmarkTabAtom from "@store/BookmarkTabAtom";
import useACToast from "@components/ACToast/useACToast";

const useBookmarkAddDetailModal = ({ handleOpenGroupAddModal }) => {
  const [linkDto, setLinkDto] = useAtom(LinkModalAtom);

  const imgRef = useRef<HTMLImageElement>(null);

  const [isFetched, setIsFetched] = useState(false);

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const [, setBookmarkTabValue] = useAtom(BookmarkTabAtom);

  const {
    previewImageUrl,
    fileImageBlob,
    fileInputRef,
    handleChangePreviewImageUrl,
    handleChangeFileInput,
    resetUploadField,
  } = useUploadImage();

  const { executePost: executePostLink, executePatch: executePatchLink } =
    useAPILink({
      linkDto: linkDto as LinkModel,
      fileImageBlob,
      previewImageExtension: previewImageUrl.split(".").at(-1) as string,
    });

  const { executeFetch: executeFetchScrape } = useAPIScrape(linkDto?.linkUrl);

  const toast = useACToast();

  const handleChangeDescription = (value: string) => {
    setCount(value.length);
  };

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClickCancelButton = () => {
    resetUploadField();
    setLinkDto({});
    setIsFetched(false);
  };

  const handleClickUploadPanel = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    try {
      if (!!linkDto?.linkId) {
        await executePatchLink(linkDto);
        return;
      }

      await executePostLink(imgRef.current);
      toast.show({ title: "완료 되었습니다" });
    } catch (e) {
      toast.show({ title: "오류가 발생했습니다" });
    }
  };

  const handleClickAddGroup = () => {
    handleChangeOpen(false);
    setBookmarkTabValue(BookmarkTab.GROUP);
    handleOpenGroupAddModal();
  };

  const handleShow = (params) => {
    if (params) {
      const { linkId, linkName, linkDesc, groupId } = params;
      setLinkDto({
        linkId,
        linkName,
        linkDesc,
        ...(groupId ? { groupId } : {}),
      });
    }
    handleChangeOpen(true);
    setIsFetched(true);
  };

  useEffect(() => {
    (async () => {
      if (!!linkDto?.linkUrl) {
        try {
          const { title, ogDescription, ogImage } = await executeFetchScrape();
          setLinkDto({ ...linkDto, linkName: title, linkDesc: ogDescription });
          if (ogImage) {
            handleChangePreviewImageUrl(ogImage);
          }
          setCount(ogDescription.length);
          setIsFetched(true);
        } catch (e) {
          window.alert("해당 링크의 메타정보를 가져올 수 없습니다");
          return;
        }
      }
    })();
  }, [linkDto?.linkUrl]);

  return {
    show: handleShow,
    render: isFetched
      ? () => (
          <>
            <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
              <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>링크 담기</Dialog.Title>
                <Form.Root className="FormRoot">
                  <VStack gap="6">
                    {previewImageUrl ? (
                      <img
                        ref={imgRef}
                        src={previewImageUrl}
                        onClick={handleClickUploadPanel}
                        crossOrigin="anonymous"
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
                    <VStack gap="4">
                      <Flex direction="column" gap="3">
                        <HStack width={"100%"} justify={"between"}>
                          <Text>그룹</Text>
                          <Text
                            onClick={handleClickAddGroup}
                            css={css`
                              cursor: pointer;
                            `}
                          >
                            그룹 추가하기 {">"}
                          </Text>
                        </HStack>
                        <Form.Field className="FormField" name="group">
                          <ACSelect // FIXME: rhf으로 전환 예정
                            onChange={(value: string) => {
                              setLinkDto((prevLinkDto) => ({
                                ...prevLinkDto,
                                groupId: value,
                              }));
                            }}
                          />
                        </Form.Field>
                      </Flex>
                      <Flex direction="column" gap="3">
                        <Text>링크 이름</Text>
                        <Form.Field className="FormField" name="linkName">
                          <Form.Control asChild>
                            <TextField.Input
                              size="3"
                              placeholder="링크 이름을 입력해주세요"
                              value={linkDto.linkName}
                              // FIXME: rhf으로 전환 예정
                              onChange={({ target: { value } }) =>
                                setLinkDto((prevLinkDto) => ({
                                  ...prevLinkDto,
                                  linkName: value,
                                }))
                              }
                            />
                          </Form.Control>
                        </Form.Field>
                      </Flex>
                      <Flex direction="column" gap="3">
                        <Text>링크 설명</Text>
                        <Form.Field className="FormField" name="linkDesc">
                          <TextArea
                            size="3"
                            placeholder="링크 설명을 입력해주세요"
                            value={linkDto.linkDesc}
                            // FIXME: rhf으로 전환 예정
                            onChange={({ target: { value } }) => {
                              handleChangeDescription(value);
                              setLinkDto((prevLinkDto) => ({
                                ...prevLinkDto,
                                linkDesc: value,
                              }));
                            }}
                          />
                        </Form.Field>
                        <Text>{count}/400</Text>
                      </Flex>
                    </VStack>
                  </VStack>
                </Form.Root>
                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <BaseButtonMain
                      size={"2"}
                      className="w-fit"
                      onClick={handleClickCancelButton}
                      backgroundColor={PaletteColor.Gray[200]}
                    >
                      취소
                    </BaseButtonMain>
                  </Dialog.Close>
                  <Dialog.Close>
                    <BaseButtonMain
                      size={"2"}
                      className="w-fit"
                      onClick={handleSubmit}
                      backgroundColor={SemanticColor.Primary.Default}
                    >
                      확인
                    </BaseButtonMain>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
            {toast.render()}
          </>
        )
      : () => <></>,
  };
};

export default useBookmarkAddDetailModal;
