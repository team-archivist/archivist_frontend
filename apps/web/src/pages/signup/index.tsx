import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import ARCAVE_LOGO from "@arcave/assets/icons/logo_white.svg";
import Button from "@arcave/components/common/Button/Button";
import HStack from "@arcave/components/common/Stack/HStack";
import { NavigationBar } from "@arcave/components/NavigationBar";
import { SignupView } from "@arcave/components/Signup/SignupView";
import USER_CONSTANTS from "@arcave/constants/userStorageConstants";
import CategoriesModel from "@arcave/model/CategoriesModel";

import axiosInstance from "../../services/requests";

/** NavigationBar 위치 관련 */
enum NavigationBarLeftItem {
  LOGO = "logo",
  FEED = "feed",
}

enum NavigationBarRightItem {
  Login = "login",
}

/**
 * - 회원가입 관련 페이지입니다
 */
const SignupPage = (props: any) => {
  // FIXME 회원가입 화면에서 유저 정보 조회 API가 필요한가..
  // const { currentUser } = useCurrentUser();
  const [_, currentPath] = usePathname();
  const [signupStep, setSignupStep] = useState<number>(1);
  const [openBySignupEnd, setOpenBySignupEnd] = useState(false);
  const [categories, setCategories] = useState<{ name: string }[]>([]);
  const [nicknamesBySaved, setNicknamesBySaved] = useState([]);
  const router = useRouter();
  const userEmail = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL);

  useEffect(() => {
    if (!userEmail) {
      router.push("/login");
    }

    // NOTE: 해당 로직 정리 필요
    // if (currentUser) {
    //   router.push("/mycave");
    // }

    (async () => {
      try {
        const categoriesRes = await axiosInstance.get("/api/categories");
        const categoryModel = new CategoriesModel(categoriesRes?.data || []);
        setCategories(categoryModel.categories.map((c) => ({ name: c })));
        const token = getCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_TOKEN);
        const nicknameRes = await axiosInstance.get(`/api/nicknames`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNicknamesBySaved(nicknameRes?.data || []);
      } catch (e) {
        console.log("<< categories >> 목록을 가져오는데 실패했습니다");
      }
    })();
  }, []);

  // ( 회원가입 프로세스 )
  const signupProcess = {
    /** 가입하기 클릭시 */
    async onSignup({ nickName, chipListByActive }: any) {
      const param = {
        email: userEmail,
        nickname: nickName,
        categories: chipListByActive,
      };
      try {
        const { data } = await axiosInstance.post(`/api/user`, param);
        deleteCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_EMAIL);
        setCookie(USER_CONSTANTS.STORAGE_SAVE_KEY.USER_ID, data.userId);
        setOpenBySignupEnd(true);
      } catch (e: any) {
        console.log("<error>", e);
        const errorData = e.response?.data;
        // 이미 등록된 회원인 경우
        if (409 === errorData?.statusCode) {
          window.alert(errorData?.message);
          // @todo 메인페이지가 만들어지면 메인페이지로 리다이렉션 시킵니다
          router.push("/");
        }
      }
    },
    /** 시작하기 버튼 클릭시 */
    onStart() {
      setOpenBySignupEnd(false);
      router.push("/mycave");
    },
    /**
     * - nickName validate 체크시
     */
    async onValidateNickname(inputValue: string) {
      return {
        message: "이미 등록된 닉네임입니다",
        isValid: !nicknamesBySaved.includes(inputValue),
      };
    },
  };

  return (
    <>
      <NavigationBar
        currentPath={currentPath}
        leftItems={{
          [NavigationBarLeftItem.LOGO]: (
            <Link
              href={"/feed"}
              css={css`
                display: flex;
                align-items: center;
                height: 100%;
              `}
            >
              <ARCAVE_LOGO />
            </Link>
          ),
        }}
        rightItems={{
          [NavigationBarRightItem.Login]: (
            <Button className="w-fit" onClick={() => router.push("/")}>
              로그인
            </Button>
          ),
        }}
      />
      <SignupLayout justify="center" className="">
        <SignupView
          step={signupStep}
          chipList={categories}
          setStep={setSignupStep}
          onSignup={signupProcess.onSignup}
          validateNickName={signupProcess.onValidateNickname}
        />
        <SignupView.Modal
          open={openBySignupEnd}
          setOpen={setOpenBySignupEnd}
          onClickByStart={signupProcess.onStart}
        />
      </SignupLayout>
    </>
  );
};
export default SignupPage;

const SignupLayout = styled(HStack)``;
