import * as Form from "@radix-ui/react-form";
import React, {useState} from "react";
import SIGNUP_CONSTANTS from "./SignupConstants";
import {Text} from "@radix-ui/themes";
import CommonUtils from  "@utils/commonUtils";

/** 회원가입관련 validation check 입니다 */
const validateSignup = ({statusByValidate, setStatusByValidate, setIsEnableNextStep,setNickName , validateNickName}) => {
  return {
    async matchNickname( inputValue : string, formData : FormData ) {
      let isValid = false;
      // 글이 없을시
      if ( 0 === inputValue.length ){
        setStatusByValidate( {
          ...statusByValidate,
          className : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_EMPTY.CLASS_NAME,
          message : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_EMPTY.MESSAGE,
        } );
        isValid = true;
      }
      // 2 자 이상 입력
      else if ( 2 > inputValue.length ){
        setStatusByValidate( {
          ...statusByValidate,
          className : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_MIN.CLASS_NAME,
          message : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_MIN.MESSAGE,
        } );
        isValid = true;
      }
      // 20자 이하로 입력
      else if ( inputValue.length >= 20 ){
        setStatusByValidate( {
          ...statusByValidate,
          className : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_MAX.CLASS_NAME,
          message : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_MAX.MESSAGE,
        } );
        isValid = true;
      }
      // 띄어쓰기 없이 한글, 영문 ,숫자만
      else if ( !/^[가-힣A-Za-z0-9]*$/.test( inputValue ) ){
        setStatusByValidate( {
          ...statusByValidate,
          className : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_BLANK.CLASS_NAME,
          message : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_BLANK.MESSAGE,
        } );
        isValid = true;
      }
      // 외부에서 nickName 체크를 합니다
      if ( CommonUtils.isFunction( validateNickName ) ){
        const nickNameValid = !await validateNickName( inputValue );

        isValid = nickNameValid?.isValid || false;
        setStatusByValidate( {
          ...statusByValidate,
          className : SIGNUP_CONSTANTS.VALIDATE.NICKNAME_BLANK.CLASS_NAME,
          message : nickNameValid?.message || '',
        } );
      }

      // 다음단계로 넘어갈 수 있다는 사항을 전달합니다
      setIsEnableNextStep( !isValid );

      setNickName( inputValue );

      return isValid;
    },
    /** nickName 이 변경될때마다 호출됩니다 */
    onChangeByNickname( e ){
      setStatusByValidate( {
        ...statusByValidate,
        nickNameLength: e.target.value?.length || 0,
      } );
    },
  }
}

/**
 * - Step1 content  입니다
 *
 * --> Step1 JSX.Element 입니다
 *
 * setNickName : nickName 을 저장할지 여부를 설정하는 setter 입니다
 * setIsEnableNextStep : 다음 step 으로 넘어갈지 여부를 설정하는 setter 입니다
 * validateNickName : nickName 을 validate 하는
 */
export const SignupViewStep1 = ( { setNickName , setIsEnableNextStep , validateNickName } ) : React.JSX.Element => {
  const [statusByValidate,setStatusByValidate] = useState( {
    message : '',
    className : '',
    nickNameLength : 0,
  } );
  const signupValidation = validateSignup({
    statusByValidate,
    setStatusByValidate,
    setIsEnableNextStep,
    setNickName,
    validateNickName
  });

  return (
    <>
      <Text as='h2'
            className="font-pretendard font-bold leading-headline2-24 text-headline2-24 text-text-normal">
        닉네임을 입력해주세요
      </Text>
      <Text as="p"
            className="font-pretendard font-normal leading-body1-16 text-body1-16 text-text-alternative">
        닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능합니다
      </Text>
      <Form.Field className="mt-5" name="question">
        <div className="flex items-baseline justify-between">
          <Form.Label className="text-label2-14 leading-label2-14 text-text-normal">
            닉네임({statusByValidate.nickNameLength}/8)
          </Form.Label>
          <Form.Message
            className={`FormMessage ${ statusByValidate.className }`}
            match={signupValidation.matchNickname}>
            {statusByValidate.message}
          </Form.Message>
        </div>
        <Form.Control asChild onChange={ signupValidation.onChangeByNickname }>
          <input
            className="border border-solid border-gray-500 leading-label1-16 text-label1-16 placeholder-text-alternative text-text-normal rounded-lg indent-3 h-[48px] w-full"
            placeholder="닉네임을 입력해주세요."
            required
          />
        </Form.Control>
      </Form.Field>
    </>

  )
}