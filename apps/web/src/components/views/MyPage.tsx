import { NavigationBar } from "@arcave/components/NavigationBar";
import Link from "next/link";
import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import TitleContainer from "@arcave/components/common/TitleContainer";
import UserProfileImage from "@arcave/components/common/UserProfileImage";
import Input from "@arcave/components/common/Input";
import { FormProvider, useForm } from "react-hook-form";
import CategoryChip from "@arcave/components/Chip/CategoryChip";

interface MyPageProps {
  categories?: string[];
}

export default function MyPage({
  className,
  categories,
  ...props
}: HTMLAttributes<HTMLDivElement> & MyPageProps) {
  const methods = useForm({});

  return (
    <FormProvider {...methods}>
      <div className={twMerge("flex flex-col", className)} {...props}>
        <NavigationBar
          leftItems={{
            logo: (
              <Link href={"/"}>
                <ARCAVE_LOGO className="w-14 h-3 object-contain" />
              </Link>
            ),
            home: <Link href="">홈피드</Link>,
            mycave: <Link href="">마이케이브</Link>,
          }}
          rightItems={{}}
        />

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
                    src="https://cached-resizable-images.orangefield.co.kr/20240623120225_4d313137-ff75-48b7-b49f-bf9702e96a8b.jpg"
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
