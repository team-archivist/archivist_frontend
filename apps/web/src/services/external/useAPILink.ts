import { LinkModel } from "@store/LinkModalAtom";
import axiosInstance from "../requests";
import { imageToBlob } from "../utils";

type Props = {
  linkDto: LinkModel;
  fileImageBlob: any;
  previewImageExtension: string;
};

const useAPILink = ({
  linkDto,
  fileImageBlob,
  previewImageExtension,
}: Props) => {
  const executePost = async (imgElement: HTMLImageElement) => {
    const formData = new FormData();
    const linkDtoBlob = new Blob([JSON.stringify(linkDto)], {
      type: "application/json",
    });

    formData.append("linkDto", linkDtoBlob);

    if (linkDto.groupId) {
      formData.append("groupId", linkDto.groupId);
    }

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

    const response = await axiosInstance.post(`/api/link`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  const executePatch = async (patchedLinkDto) => {
    const formData = new FormData();
    const linkDtoBlob = new Blob([JSON.stringify(patchedLinkDto)], {
      type: "application/json",
    });

    formData.append("linkDto", linkDtoBlob);

    if (patchedLinkDto.groupId) {
      formData.append("groupId", patchedLinkDto.groupId);
    }

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
