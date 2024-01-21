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

import LinkModalAtom from "@store/LinkModalAtom";

import useUploadImage from "../common/useUploadImage";
import useAPILink from "src/services/external/useAPILink";
import useAPIScrape from "src/services/internal/useAPIScrape";

import ACSelect from "@components/Select";
import { BookmarkTab } from "src/pages/mycave";
import BookmarkTabAtom from "@store/BookmarkTabAtom";
import useGroupAddModal from "../useGroupAddModal";

const useBookmarkAddDetailModal = ({ handleOpenGroupAddModal }) => {
  const [linkDTO, setLinkDTO] = useAtom(LinkModalAtom);

  const imgRef = useRef<HTMLImageElement>(null);

  const [isFetched, setIsFetched] = useState(false);
  const [initialLinkInformation, setInitialLinkInformation] = useState();

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  const { executeFetch: executeFetchLink } = useAPILink({
    linkDto: JSON.stringify(linkDTO),
    fileImageBlob,
    previewImageExtension: previewImageUrl.split(".").at(-1) as string,
  });

  const { executeFetch: executeFetchScrape } = useAPIScrape(linkDTO?.linkUrl);

  const handleChangeDescription = (value: string) => {
    setCount(value.length);
  };

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClickCancelButton = () => {
    resetUploadField();
    setInitialLinkInformation(undefined);
    setLinkDTO({});
    setIsFetched(false);
  };

  const handleClickUploadPanel = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    executeFetchLink(imgRef.current);
  };

  const handleClickAddGroup = () => {
    handleChangeOpen(false);
    setBookmarkTabValue(BookmarkTab.GROUP);
    handleOpenGroupAddModal();
  };

  useEffect(() => {
    (async () => {
      if (!!linkDTO?.linkUrl) {
        const { title, ogDescription, ogImage } = await executeFetchScrape();

        setInitialLinkInformation({ title, ogDescription });
        setLinkDTO({ ...linkDTO, linkName: title, linkDesc: ogDescription });
        if (ogImage) {
          handleChangePreviewImageUrl(ogImage);
        }
        setCount(ogDescription.length);
        setIsFetched(true);
      }
    })();
  }, [linkDTO?.linkUrl]);

  return {
    show: () => handleChangeOpen(true),
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
                      {linkDTO?.group !== "CREATE" && (
                        <Flex direction="column" gap="3">
                          <HStack width={"100%"} justify={"between"}>
                            <Text>그룹</Text>
                            <Text onClick={handleClickAddGroup}>
                              그룹 추가하기 {">"}
                            </Text>
                          </HStack>
                          <Form.Field className="FormField" name="group">
                            <ACSelect // FIXME: rhf으로 전환 예정
                              onChange={(value) => {
                                console.log("group", value);
                                setLinkDTO((prevLinkDTO) => ({
                                  ...prevLinkDTO,
                                  group: value,
                                }));
                              }}
                            />
                          </Form.Field>
                        </Flex>
                      )}
                      {linkDTO?.group === "CREATE" && (
                        <Flex direction="column" gap="3">
                          <Text>그룹 이름</Text>
                          <Form.Field className="FormField" name="group">
                            <TextField.Input
                              size="3"
                              placeholder="그룹 이름을 입력해주세요"
                              // FIXME: rhf으로 전환 예정
                              onChange={({ target: { value } }) =>
                                setLinkDTO((prevLinkDTO) => ({
                                  ...prevLinkDTO,
                                  groupName: value,
                                }))
                              }
                            />
                          </Form.Field>
                        </Flex>
                      )}
                      <Flex direction="column" gap="3">
                        <Text>링크 이름</Text>
                        <Form.Field className="FormField" name="linkName">
                          <Form.Control asChild>
                            <TextField.Input
                              size="3"
                              placeholder="링크 이름을 입력해주세요"
                              defaultValue={initialLinkInformation?.title}
                              state={true}
                              // FIXME: rhf으로 전환 예정
                              onChange={({ target: { value } }) =>
                                setLinkDTO((prevLinkDTO) => ({
                                  ...prevLinkDTO,
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
                            defaultValue={initialLinkInformation?.ogDescription}
                            // FIXME: rhf으로 전환 예정
                            onChange={({ target: { value } }) => {
                              handleChangeDescription(value);
                              setLinkDTO((prevLinkDTO) => ({
                                ...prevLinkDTO,
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
          </>
        )
      : () => <></>,
  };
};

export default useBookmarkAddDetailModal;
