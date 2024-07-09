import CategoryChip from "@arcave/components/Chip/CategoryChip";
import { NavigationBar } from "@arcave/components/NavigationBar";
import Input from "@arcave/components/common/Input";
import TitleContainer from "@arcave/components/common/TitleContainer";
import UserProfileImage from "@arcave/components/common/UserProfileImage";
import { HTMLAttributes } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface MyPageProps {
  categories?: string[];
  userProfileImageUrl?: string;
}

export default function MyPage({
  className,
  categories,
  userProfileImageUrl,
  ...props
}: HTMLAttributes<HTMLDivElement> & MyPageProps) {
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <div className={twMerge("flex flex-col", className)} {...props}>
        <NavigationBar />

        <div className="flex flex-col items-center">
          <div className="max-w-[360px] w-full flex flex-col py-8 mx-6 space-y-8">
            <div className="text-28 font-bold text-text-normal text-center">
              나의 프로필
            </div>
            <div className="flex flex-col space-y-6">
              <TitleContainer title="프로필 사진">
                <div className="flex flex-row items-center justify-center">
                  <UserProfileImage
                    containerClassName="w-24 h-24"
                    src={userProfileImageUrl || ""}
                  />
                </div>
              </TitleContainer>

              <TitleContainer title="이메일">
                <Input
                  name="email"
                  placeholder="이메일을 입력해주세요."
                  inputClassName="h-12"
                  disabled
                />
              </TitleContainer>
              <TitleContainer title={`닉네임(0/20)`} required>
                <Input
                  name="nickname"
                  placeholder="닉네임을 입력해주세요."
                  inputClassName="h-12"
                />
              </TitleContainer>
              <TitleContainer title="관심 카테고리">
                <div className="flex flex-wrap gap-2">
                  {categories?.map((category, index) => {
                    return <CategoryChip key={index}>{category}</CategoryChip>;
                  })}
                </div>
              </TitleContainer>
            </div>
            <div className="flex flex-row justify-center space-x-2">
              <button
                type="button"
                className="rounded-full px-6 h-12  text-16 text-text-normal bg-gray-200"
              >
                로그아웃
              </button>
              <button
                type="button"
                className="rounded-full px-6 h-12  text-16 text-white bg-primary-default"
              >
                저장
              </button>
            </div>
            <div className="flex flex-row items-center justify-center">
              <button className="text-14 text-gray-400" type="button">
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
