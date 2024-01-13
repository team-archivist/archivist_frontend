import {Flex, Text } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import React, {useState, useEffect} from 'react';
import { SignupModal } from "./SignupModal";
import {SignupViewStep1} from "./SignupViewStep1";
import {SignupViewStep2} from "./SignupViewStep2";
import CommonUtils from  "@utils/commonUtils";

/**
 * - 회원가입 관련 view 입니다
 *
 * @param { number } step - 회원가입 단계입니다
 * @param { ()=> void } setStep - 회원가입 단계 설정 setter 입니다
 * @param { ( { nickName , chipListByActive } ) => void } onSignup - 가입하기 버튼 클릭시 실행되는 callback 입니다
 * @param { ( inputValue : string )=> unknown } validateNickName? - 회원가입시 nickName 벨리데이션 체크함수입니다
 * @param { { name : string }[] } chipList? - 내부에 뿌려줄 카테고리 리스트( 이름을 초반에 chipList 로 지어 카테고리로 짓지 않았습ㄴ디ㅏ )
 */
export const SignupView = ({ step , setStep , onSignup , validateNickName , chipList }) => {
  // 사용자들이 선택한 chipList 상태값입니다
  const [ chipListByActive , setChipListByActive ] = useState( [] );
  // 닉네임 상태값입니다
  const [ nickName , setNickName ] = useState( '' );
  // 다음 단계로 넘어갈 수 있을지 여부를 반환합니다
  const [ isEnableNextStep , setIsEnableNextStep ] = useState( false );

  const onClickByChip = ( e : MouseEvent , name : string ) : void => {
    let _chipListByUpdated = [  ...chipListByActive ];
    if ( chipListByActive.includes( name ) ){
      _chipListByUpdated = _chipListByUpdated.filter( n => n !== name );
    }
    else {
      _chipListByUpdated.push( name );
    }
    setChipListByActive( _chipListByUpdated );
  }

  /** 다음 단계버튼을 클릭했을 경우 */
  const onClickByNext = async ( e ) => {
    e.preventDefault();
    if ( step > 1 ){
      /** 다음단계로 진행할 경우 회원가입 프로세스를 진행합니다 */
      if ( CommonUtils.isNotFunction( onSignup ) ){
        return;
      }
      await onSignup( { nickName, chipListByActive } );
      return;
    }
    setStep( step + 1 );
  }

  return (
    <Form.Root className="w-[360px]">
      <Text as="p"
            className="font-pretendard font-medium leading-body1-16 text-body1-16 text-primary-default">
        {step}/2
      </Text>
      {/* step 에 따라, 하위 조건부 렌더링을 합니다 */}
      { 1 === step ?
        <SignupViewStep1
          setNickName={ setNickName }
          setIsEnableNextStep={ setIsEnableNextStep }
          validateNickName={ validateNickName } /> :
        <SignupViewStep2
          chipList={ chipList }
          chipListByActive={ chipListByActive }
          onClickByChip={ onClickByChip }
          setIsEnableNextStep={ setIsEnableNextStep }
        />
      }
      <Form.Submit asChild>
        <button
          className="leading-label1-16 text-label1-16 text-center text-white rounded-3xl w-full h-[48px] mt-10 bg-primary-default disabled:bg-gray-100 disabled:text-text-disable"
          disabled={!isEnableNextStep}
          onClick={ onClickByNext }
        >
          { 1 === step ? '다음' : '가입하기' }
        </button>
      </Form.Submit>
    </Form.Root>
  )
}

SignupView.Modal = SignupModal;