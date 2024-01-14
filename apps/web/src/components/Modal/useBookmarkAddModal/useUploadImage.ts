import { useRef, useState } from "react";

const useUploadImage = (props: Props) => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [fileImageBlob, setFileImageBlob] = useState();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePreviewImageUrl = (url: string) => {
    // setFileImageBlob(value);
    setPreviewImageUrl(url);
  };

  const handleChangeFileInput = (event) => {
    if (!event.target.files) {
      return;
    }
    const [fileBlob] = event.target.files;
    if (fileBlob) {
      const imageUrl = window.URL.createObjectURL(fileBlob);
      setPreviewImageUrl(imageUrl);
      setFileImageBlob(fileBlob);
    }
  };

  const resetUploadField = () => {
    setPreviewImageUrl("");
    setFileImageBlob(undefined);
  };

  return {
    previewImageUrl,
    fileImageBlob,
    fileInputRef,
    handleChangePreviewImageUrl,
    handleChangeFileInput,
    resetUploadField,
  };
};

export default useUploadImage;
