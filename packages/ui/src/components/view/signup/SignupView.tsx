import {Flex, Text } from "@radix-ui/themes";
import { PlusIcon , Cross2Icon } from '@radix-ui/react-icons'
import * as Form from '@radix-ui/react-form';
import React , { useState } from 'react';
import { SignupModal } from "./SignupModal";

/**
 * - 회원가입 관련 view 입니다
 */
export const SignupView = ({ step }) => {
  const [ chipList , setChipList ] = useState( [
    {
      name : '외국어',
      isActive : false,
    },
    {
      name : '자기개발',
      isActive : false,
    },
    {
      name : '문화생활',
      isActive : false,
    },
    {
      name : '사진',
      isActive : false,
    },
    {
      name : '운동',
      isActive : false,
    },
    {
      name : '재테크',
      isActive : false,
    },
    {
      name : '취미',
      isActive : false,
    },
    {
      name : '여행',
      isActive : false,
    },
    {
      name : '드로잉',
      isActive : false,
    },
    {
      name : '커리어',
      isActive : false,
    },
  ] );

  const onClickByChip = ( e : MouseEvent , name : string ) : void => {
    const chipListByUpdated = chipList.map( chip => {
      if ( chip.name !== name ){
        return chip;
      }
      return { ...chip , isActive : !chip.isActive }
    } );
    setChipList( chipListByUpdated );
  }

  return (
    <Form.Root className="w-[360px]">
      <Text as="p"
            className="font-pretendard font-medium leading-body1-16 text-body1-16 text-primary-default">
        { step }/2
      </Text>
      <Text as='h2'
            className="font-pretendard font-bold leading-headline2-24 text-headline2-24 text-text-normal">
        닉네임을 입력해주세요
      </Text>
      <Text as="p"
            className="font-pretendard font-normal leading-body1-16 text-body1-16 text-text-alternative">
        닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능합니다
      </Text>
      { 1 === step ? getStep1Content() : getStep2Content( chipList , onClickByChip ) }
      <Form.Submit asChild>
        <button
          className="leading-label1-16 text-label1-16 text-center text-white rounded-3xl w-full h-[48px] mt-10 bg-primary-default disabled:bg-gray-100 disabled:text-text-disable"
          disabled>
          { 1 === step ? '다음' : '가입하기' }
        </button>
      </Form.Submit>
    </Form.Root>
  )
}

SignupView.Modal = SignupModal;

/** step 에 따라 content 를 반환합니다 */
const getStep1Content = () => {
  return (
    <Form.Field className="mt-8" name="question">
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-label2-14 leading-label2-14 text-text-normal">닉네임(0/8)</Form.Label>
        <Form.Message className="FormMessage" match="valueMissing">
          Please enter a question
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          className="border border-solid border-gray-500 leading-label1-16 text-label1-16 placeholder-text-alternative text-text-normal rounded-lg indent-3 h-[48px] w-full"
          placeholder="닉네임을 입력해주세요."
          required/>
      </Form.Control>
    </Form.Field>
  )
}

/** step 에 따라 content 를 반환합니다 */
const getStep2Content = ( chipList , onClickByChip ) => {
  return (
    <div className="mt-8">
      <span className="text-label2-14 text-text-normal">
        관심 카테고리
      </span>
      <Flex gap="3" align="center" wrap="wrap" className="mt-2">
        { chipList && chipList.map( ( chip , chipIndex ) => (
          <SignupView.CategoryChip
            key={ chipIndex }
            isActive={ chip.isActive }
            onClick={ onClickByChip }>
            { chip.name }
          </SignupView.CategoryChip>
        ) ) }
      </Flex>
    </div>
  )
}

/**
 * - 회원가입 카테고리 Chip 입니다
 */
SignupView.CategoryChip = ( { onClick , isActive , children } ) => {

  if ( !onClick ){
    onClick = ( e ) => {};
  }

  const classNames = {
    button : isActive ? 'bg-gray-600' : 'bg-gray-200',
    text : isActive ? 'text-white' : 'text-text-normal',
  }

  return (
    <button
      className={ `${ classNames.button } inline-flex items-center justify-center rounded-lg h-[36px] rounded-2xl gap-2 px-3 cursor-pointer` }
      onClick={ ( e ) => {
        e.preventDefault();
        onClick( e , children );
      } }>
      <span className={ `${ classNames.text } text-text-normal text-label2-14 leading-label2-14` }>{ children }</span>
      { isActive ? <Cross2Icon style={ { stroke : '#fff' } } /> : <PlusIcon /> }
    </button>
  )
}