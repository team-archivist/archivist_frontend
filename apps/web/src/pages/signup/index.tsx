/**
 * - 회원가입 관련 페이지입니다
 */
import {NavigationBar,LoginView,SignupView} from "@archivist/ui";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {css} from "@emotion/react";
import ARCAVE_LOGO from "@assets/icons/logo.svg";
import React,{useState,useEffect} from "react";
import styled from "@emotion/styled";
import HStack from "@components/Stack/HStack";
import axios from "axios";

/** NavigationBar 위치 관련 */
enum NavigationBarLeftItem {
  LOGO = "logo",
  FEED = "feed",
}

const SignupPage = ( props ) => {
  const [_,currentPath] = usePathname();

  /** loginView 관련 로직입니다 */
  const [mountedByLoginView, setMountedByLoginView] = useState<boolean>(false);
  useEffect(() => {
    setMountedByLoginView(true);
  }, []);



  /** 회원가입 관련 로직입니다 */
  const [ signupStep , setSignupStep ] = useState<number>( 1 );
  const [ openBySignupEnd , setOpenBySignupEnd ] = useState( false );

  /** 로그인 버튼 클릭시 카카오 로그인 오픈 */
  const onOpenKakaoLogin = async () => {
    const kakaoLoginURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_API_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_API_REDIRECT_URL}&response_type=code`;
    const popupWidth = 400;
    const popupHeight = 700;
    const popupX = (window.innerWidth/2) - (popupWidth/2);
    const popupY = (window.innerHeight/2) - (popupHeight/2);
    window.open(kakaoLoginURL,'_blank' ,`width=${popupWidth},height=${popupHeight},left=${popupX},top=${popupY}` );
  }

  /** 가입하기 ( 회원가입 프로세스 ) */
  const onSignup = ( { nickName , chipListByActive } ) => {
    console.log( 'nickName' , nickName );
    console.log( 'chipListByActive' , chipListByActive );
    setOpenBySignupEnd( true );
  }

  /** 시작하기 버튼 클릭시 */
  const onSignupEnd = () => {
    console.log( 'onStart' );
    setOpenBySignupEnd( false );
  }

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
              `}
            >
              <ARCAVE_LOGO />
            </Link>
          ),
        } }
      />
      <SignupLayout
        justify="center"
        className="mt-2"
      >
        { mountedByLoginView && <LoginView onClickByLogin={ onOpenKakaoLogin } /> }
        <SignupView
          step={signupStep}
          setStep={setSignupStep}
          onSignup={ onSignup }
        />
        <SignupView.Modal
          open={ openBySignupEnd }
          setOpen={ setOpenBySignupEnd }
          onClickByStart={ onSignupEnd } />
      </SignupLayout>
    </>
  )
}
export default SignupPage;

const SignupLayout = styled(HStack)``;