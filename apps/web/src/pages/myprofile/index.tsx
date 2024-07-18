import useUploadImage from "@arcave/components/Modal/common/useUploadImage";
import ACSkeleton from "@arcave/components/common/Skeleton";
import MyPage from "@arcave/components/views/MyPage";
import useAPICategory from "@arcave/services/external/useAPICategory";
import useAPIUser from "@arcave/services/external/useAPIUser";
import { useRouter } from "next/router";

export default function MyProfile() {
  const {
    loginUser: user,
    updateUser,
    withdrawUser,
  } = useAPIUser({ required: true });
  const router = useRouter();
  const { categories } = useAPICategory();
  const {
    fileInputRef,
    handleChangeFileInput,
    isImageReady,
    fileImageBlob,
    previewImageUrl,
    resetUploadField,
    handleChangePreviewImageUrl,
  } = useUploadImage();

  if (!user) {
    return <ACSkeleton count={1} />;
  }

  const onClickUserProfileImage = () => {
    fileInputRef.current?.click();
  };

  const submit = async (data: any) => {
    const additional: any = {};
    if (isImageReady) {
      additional.userImage = fileImageBlob;
    }
    await updateUser({
      email: user.email!!,
      nickname: data.nickname,
      categories: data.categories,
      ...additional,
    });
    alert("수정되었습니다.");
  };

  const onWithdraw = async () => {
    await withdrawUser();
    alert("회원탈퇴되었습니다.");
    await router.replace("/signout");
  };

  return (
    <>
      <MyPage
        loginUser={user}
        onClickUserProfileImage={onClickUserProfileImage}
        userProfileImageUrl={previewImageUrl || user.imgUrl}
        categories={categories}
        onSubmit={submit}
        onWithdraw={onWithdraw}
      />
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleChangeFileInput}
      />
    </>
  );
}
