import axiosInstance from "../requests";
import { imageToBlob } from "../utils";

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

    const response = await axiosInstance.post(`/api/link`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return { executeFetch };
};

export default useAPILink;
