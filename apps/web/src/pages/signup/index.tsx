/**
 * - 회원가입 관련 페이지입니다
 */
import { NavigationBar, LoginView, SignupView, HStack } from "@archivist/ui";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { css } from "@emotion/react";
import ARCAVE_LOGO from "@assets/icons/logo.svg";
import React,{ useState , useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import {useRouter} from "next/router";
import LoginUserModel from "@model/LoginUserModel";
import CategoriesModel from "@model/CategoriesModel";
import { useSetAtom , useAtom } from "jotai";
import loginUserAtom from "@store/loginUserAtom";

/** NavigationBar 위치 관련 */
enum NavigationBarLeftItem {
  LOGO = "logo",
  FEED = "feed",
}

/**
 * - 회원가입 관련 페이지입니다
 */
const SignupPage = ( props ) => {
  const [ loginUser , setLoginUser] = useAtom( loginUserAtom );
  const [ _ , currentPath ] = usePathname();
  const [ signupStep , setSignupStep ] = useState<number>( 1 );
  const [ openBySignupEnd , setOpenBySignupEnd ] = useState( false );
  const [ categories , setCategories ] = useState<{name : string}[]>( [] );
  const [ nicknamesBySaved , setNicknamesBySaved ] = useState( [] );
  const router = useRouter();

  useEffect( () => {
    if ( !loginUser.email ){
      window.alert( '먼저 카카오 로그인해주세요' );
      router.push( '/login' );
    }

    ( async () => {
      try {
        const categoriesRes = await axios.get( '/categories' );
        const categoryModel = new CategoriesModel( categoriesRes?.data || [] );
        setCategories( categoryModel.categories.map( c => ( { name : c } ) ) );

        const nicknameRes = await axios.get( `/nicknames` , {
          headers: {
            Authorization: `Bearer ${loginUser.token}`
          }
        } );
        setNicknamesBySaved( nicknameRes?.data || [] );

      }
      catch( e ){
        console.log( '<< categories >> 목록을 가져오는데 실패했습니다' );
      }

    } )();

  } , [] );

  // ( 회원가입 프로세스 )
  const signupProcess = {
    /** 가입하기 클릭시 */
    async onSignup( { nickName , chipListByActive } ){
      const param = {
        email : loginUser.email,
        nickname: nickName,
        categories: chipListByActive,
      }
      try {
        const res = await axios.post( `/user` , param , {
          headers : {
            Authorization: `Bearer ${loginUser.token}`,
            'Content-Type' : 'application/json',
            'Accept' : '*/*',
          }
        } );
        // store 저장
        setLoginUser( new LoginUserModel( res?.data ) );

        setOpenBySignupEnd( true );
      }
      catch( e ){
        const errorData = e.response?.data;
        // 이미 등록된 회원인 경우
        if ( 409 === errorData?.statusCode ){
          window.alert( errorData?.message );
          // @todo 메인페이지가 만들어지면 메인페이지로 리다이렉션 시킵니다
          router.push( '/' );
        }
      }

    },
    /** 시작하기 버튼 클릭시 */
    onStart(){
      setOpenBySignupEnd( false );
      router.push( '/mycave' );
    },
    /**
     * - nickName validate 체크시
     *
     * @todo 이부분에서 토큰을 발급받으면 해당 토큰을 이용해 인증하도록 구현해야 합니다( backend 와 상의합니다 )
     */
    async onValidateNickname( inputValue : string ){
      return {
        message : '이미 등록된 닉네임입니다',
        isValid : !nicknamesBySaved.includes( inputValue ),
      };
    },
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
        }}
      />
      <SignupLayout
        justify="center"
        className="mt-2"
      >
        <SignupView
          step={signupStep}
          chipList={ categories }
          setStep={setSignupStep}
          onSignup={signupProcess.onSignup}
          validateNickName={signupProcess.onValidateNickname}
        />
        <SignupView.Modal
          open={openBySignupEnd}
          setOpen={setOpenBySignupEnd}
          onClickByStart={signupProcess.onStart} />
      </SignupLayout>
    </>
  );
};
export default SignupPage;

const SignupLayout = styled(HStack)``;
