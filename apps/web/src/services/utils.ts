export const imageToBlob = (blobString, width, height) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const canvasContext = canvas.getContext("2d");

    // 이미지의 크기에 맞게 Canvas 크기 설정
    canvas.width = width;
    canvas.height = height;

    // Canvas에 이미지 그리기
    const image = new Image();
    image.onload = () => {
      canvasContext?.drawImage(image, 0, 0);
      // Canvas의 이미지를 Blob으로 변환
      canvas.toBlob((blob) => {
        resolve(blob);
      });
    };
    image.src = blobString;
  });
};
