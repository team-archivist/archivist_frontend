import axiosInstance from "../requests";
import { imageToBlob } from "../utils";

type Props = {
  fileImageBlob: any;
};

const useAPILink = ({ fileImageBlob }: Props) => {
  const executePost = async (
    payloadLinkDto: any,
    imgElement: HTMLImageElement
  ) => {
    const formData = new FormData();
    const linkDtoBlob = new Blob([JSON.stringify(payloadLinkDto)], {
      type: "application/json",
    });

    formData.append("linkDto", linkDtoBlob);

    if (payloadLinkDto.groupId) {
      const groupIdBlob = new Blob([JSON.stringify([payloadLinkDto.groupId])], {
        type: "application/json",
      });
      formData.append("groupId", groupIdBlob);
    }

    if (!fileImageBlob && imgElement) {
      const response = await axiosInstance.post(`/client-api/scrape/image`, {
        src: imgElement.src,
      });

      const imgBlob = await imageToBlob(
        response.data.blob,
        imgElement.naturalWidth,
        imgElement.naturalHeight
      );

      formData.append(
        "linkImgFile",
        imgBlob,
        `${Number(new Date())}.${response.data.contentType.split("/")[1]}`
      );
    }

    if (fileImageBlob) {
      formData.append("linkImgFile", fileImageBlob);
    }

    const response = await axiosInstance.post(`/api/link`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const executePatch = async (patchableLinkDto) => {
    const formData = new FormData();

    const patchedLinkDto = Object.entries(patchableLinkDto).reduce(
      (acc, [key, value]) => {
        if (value === null) {
          return acc;
        }

        return { ...acc, [key]: value };
      },
      {}
    );

    const linkDtoBlob = new Blob([JSON.stringify(patchedLinkDto)], {
      type: "application/json",
    });

    formData.append("linkDto", linkDtoBlob);

    if (patchedLinkDto.groupId) {
      const groupIdBlob = new Blob([JSON.stringify([patchedLinkDto.groupId])], {
        type: "application/json",
      });
      formData.append("groupId", groupIdBlob);
    }

    // FIXME 수정 이미지 저장 로직 판단 후 제거 예정
    // if (!fileImageBlob && imgElement) {
    //   const blob = await imageToBlob(imgElement);
    //   formData.append(
    //     "linkImgFile",
    //     blob,
    //     `${Number(new Date())}.${previewImageExtension}`
    //   );
    // }

    // if (fileImageBlob) {
    //   formData.append("linkImgFile", fileImageBlob);
    // }

    const response = await axiosInstance.patch(
      `/api/link/${patchedLinkDto.linkId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

  return { executePost, executePatch };
};

export default useAPILink;
