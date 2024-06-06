import { useRef, useState } from "react";

const useUploadImage = () => {
  const [previewImageUrl, setPreviewImageUrl] = useState<string>("");
  const [fileImageBlob, setFileImageBlob] = useState();
  const [isImageReady, setIsImageReady] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangePreviewImageUrl = (url: string) => {
    // setFileImageBlob(value);
    setIsImageReady(false);
    setPreviewImageUrl(url);
    setIsImageReady(true);
  };

  const handleChangeFileInput = (event) => {
    if (!event.target.files) {
      return;
    }
    try {
      setIsImageReady(false);
      const [fileBlob] = event.target.files;
      if (fileBlob) {
        const imageUrl = window.URL.createObjectURL(fileBlob);
        setPreviewImageUrl(imageUrl);
        setFileImageBlob(fileBlob);
      }
    } finally {
      // FIXME : Promise 기반으로 변경
      setIsImageReady(true);
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
    isImageReady,
  };
};

export default useUploadImage;
