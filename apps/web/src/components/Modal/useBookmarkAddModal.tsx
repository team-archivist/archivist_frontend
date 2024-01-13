import {
  BaseButtonMain,
  PaletteColor,
  SemanticColor,
  VStack,
} from "@archivist/ui";
import { css } from "@emotion/react";
import { Box, Dialog, Flex, Text, TextArea, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import LinkModalAtom from "@store/LinkModalAtom";
import { useAtom } from "jotai";
import { useRef, useState } from "react";
import { getCookie } from "cookies-next";
import USER_CONSTANTS from "@constants/userStorageConstants";
import axios from "axios";

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

const useBookmarkAddDetailModal = () => {
  const [linkDTO, setLinkDTO] = useAtom(LinkModalAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [fileImage, setFileImage] = useState();

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);

  const handleChangeDescription = (value: string) => {
    setCount(value.length);
  };

  const handleChangeOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const handleClickUploadPanel = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFileInput = (event) => {
    if (!event.target.files) {
      return;
    }
    const [file] = event.target.files;
    if (file) {
      const image = window.URL.createObjectURL(file);
      setPreviewImage(image);
      setFileImage(file);
    }
  };

  const handleSubmit = () => {
    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    const AuthorizationToken = `Bearer ${token}`;

    const createLink = async () => {
      const formData = new FormData();
      formData.append("linkDto", linkDTO);
      const response = await axios.post(
        `/api/link`,
        { linkDto: linkDTO, linkImgFile: fileImage },
        {
          headers: {
            Authorization: AuthorizationToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
    };

    createLink();
  };

  return {
    show: () => handleChangeOpen(true),
    render: () => (
      <Dialog.Root open={open} onOpenChange={handleChangeOpen}>
        <Dialog.Content style={{ maxWidth: 450 }}>
          <Dialog.Title>링크 담기</Dialog.Title>
          <Form.Root className="FormRoot">
            <VStack gap="6">
              {previewImage ? (
                <img src={previewImage} onClick={handleClickUploadPanel} />
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
                  <Text>그룹</Text>
                  <Form.Field className="FormField" name="group">
                    <TextField.Input
                      size="3"
                      placeholder="그룹 이름을 입력해주세요"
                      // FIXME: rhf으로 전환 예정
                      onChange={({ target: { value } }) =>
                        setLinkDTO((prevLinkDTO) => ({
                          ...prevLinkDTO,
                          group: value,
                        }))
                      }
                    />
                  </Form.Field>
                </Flex>
                <Flex direction="column" gap="3">
                  <Text>링크 이름</Text>
                  <Form.Field className="FormField" name="linkName">
                    <TextField.Input
                      size="3"
                      placeholder="링크 이름을 입력해주세요"
                      // FIXME: rhf으로 전환 예정
                      onChange={({ target: { value } }) =>
                        setLinkDTO((prevLinkDTO) => ({
                          ...prevLinkDTO,
                          linkName: value,
                        }))
                      }
                    />
                  </Form.Field>
                </Flex>
                <Flex direction="column" gap="3">
                  <Text>링크 설명</Text>
                  <Form.Field className="FormField" name="linkDesc">
                    <TextArea
                      size="3"
                      placeholder="링크 설명을 입력해주세요"
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
                onClick={handleSubmit}
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
