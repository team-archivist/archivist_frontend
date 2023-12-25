import {Flex, Text , Box , TextField } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import React from 'react';
import './styles/signupView.css';
/**
 * - 회원가입 관련 view 입니다
 */
export const SignupView = () => {

    return (
      <Form.Root className="w-[360px]">
        <Text as="p"
         className="font-pretendard font-medium leading-body1-16 text-body1-16 text-primary-default">
          1/2
        </Text>
        <Text as='h2'
          className="font-pretendard font-bold leading-headline2-24 text-headline2-24 text-text-normal">
          닉네임을 입력해주세요
        </Text>
        <Text as="p"
         className="font-pretendard font-normal leading-body1-16 text-body1-16 text-text-alternative">
          닉네임은 띄어쓰기 없이 한글, 영문, 숫자만 가능합니다
        </Text>
        {/*<Form.Field name="email">*/}
        {/*  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>*/}
        {/*    <Form.Label className="FormLabel">이메일</Form.Label>*/}
        {/*  </div>*/}
        {/*  <Form.Control asChild>*/}
        {/*    <input className="Input" type="email" disabled placeholder="UserID@kakao.net" required />*/}
        {/*  </Form.Control>*/}
        {/*  <Form.Message className="FormMessage" match="valueMissing">*/}
        {/*    이메일을 입력해주세요*/}
        {/*  </Form.Message>*/}
        {/*  <Form.Message className="FormMessage" match="typeMismatch">*/}
        {/*    유효한 이메일이 아닙니다*/}
        {/*  </Form.Message>*/}
        {/*</Form.Field>*/}
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
              required />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button
            className="leading-label1-16 text-label1-16 text-center text-white rounded-3xl w-full h-[48px] mt-10 bg-primary-default disabled:bg-gray-100 disabled:text-text-disable"
            disabled>
            다음
          </button>
        </Form.Submit>
      </Form.Root>
        // <Flex
        //     direction="column"
        //     justify="center"
        //     gap="4"
        //     style={{ backgroundColor : "#fff", width : 480 , height : 453 , borderRadius : 12 }}>
        //
        //     {/* title */}
        //
        //     {/* email input */}
        //     <Box>
        //         <Text>이메일</Text>
        //         <TextField.Root>
        //             <TextField.Slot>
        //                 {/*<MagnifyingGlassIcon height="16" width="16" />*/}
        //             </TextField.Slot>
        //             <TextField.Input placeholder="Search the docs…" />
        //         </TextField.Root>
        //         <Text>에러메시지1</Text>
        //     </Box>
        //
        //     {/* nickname input */}
        //     <Box>
        //         <Text>닉네임(0/8)</Text>
        //         <TextField.Root>
        //             <TextField.Slot>
        //                 {/*<MagnifyingGlassIcon height="16" width="16" />*/}
        //             </TextField.Slot>
        //             <TextField.Input
        //                 placeholder="Search the docs…"
        //                 variant="soft"
        //             />
        //         </TextField.Root>
        //         <Text>에러메시지2</Text>
        //     </Box>
        //
        //     <Box>
        //         <Text>관심 카테고리</Text>
        //         <BaseButtonMain >
        //             외국어 ( + 아이콘! )
        //         </BaseButtonMain>
        //     </Box>
        // </Flex>
    )
}
