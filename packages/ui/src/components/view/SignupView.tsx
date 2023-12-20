import {Flex, Text , Box , TextField } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import React from 'react';
import './styles/signupView.css';
/**
 * - 회원가입 관련 view 입니다
 */
export const SignupView = () => {

    return (
      <Form.Root className="FormRoot">
        <Text as='h2'
              align='center'
              weight='bold'
              style={{
                color : "#222222" , fontSize : '28px', lineHeight: '38px' }}>
          회원가입
        </Text>
        <Form.Field className="FormField" name="email">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">이메일</Form.Label>
          </div>
          <Form.Control asChild>
            <input className="Input" type="email" disabled placeholder="UserID@kakao.net" required />
          </Form.Control>
          <Form.Message className="FormMessage" match="valueMissing">
            이메일을 입력해주세요
          </Form.Message>
          <Form.Message className="FormMessage" match="typeMismatch">
            유효한 이메일이 아닙니다
          </Form.Message>
        </Form.Field>
        <Form.Field className="FormField" name="question">
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Form.Label className="FormLabel">*닉네임(0/8)</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              Please enter a question
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input className="Input" required />
          </Form.Control>
        </Form.Field>


        <Form.Submit asChild>
          <button className="Button" style={{ marginTop: 10 }}>
            Post question
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
