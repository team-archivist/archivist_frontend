import USER_CONSTANTS from "@constants/userStorageConstants";
import axios from "axios";
import { getCookie } from "cookies-next";
import { RefObject } from "react";

type Props = {
  linkDto: string;
  fileImageBlob: any;
  previewImageExtension: string;
};

const useAPILink = ({
  linkDto,
  fileImageBlob,
  previewImageExtension,
}: Props) => {
  const executeFetch = async (imgElement: HTMLImageElement) => {
    const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
    const AuthorizationToken = `Bearer ${token}`;

    const formData = new FormData();
    const linkDtoBlob = new Blob([linkDto], {
      type: "application/json",
    });
    formData.append("linkDto", linkDtoBlob);

    if (!fileImageBlob && imgElement) {
      const blob = await imageToBlob(imgElement);
      formData.append(
        "linkImgFile",
        blob,
        `${Number(new Date())}.${previewImageExtension}`
      );
    }

    if (fileImageBlob) {
      formData.append("linkImgFile", fileImageBlob);
    }

    const response = await axios.post(`/api/link`, formData, {
      headers: {
        Authorization: AuthorizationToken,
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return { executeFetch };
};

const imageToBlob = (imgElement: HTMLImageElement) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");

    // 이미지의 크기에 맞게 Canvas 크기 설정
    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;

    // Canvas에 이미지 그리기
    canvasContext?.drawImage(imgElement, 0, 0);

    // Canvas의 이미지를 Blob으로 변환
    canvas.toBlob((blob) => {
      resolve(blob);
    });
  });
};

export default useAPILink;
