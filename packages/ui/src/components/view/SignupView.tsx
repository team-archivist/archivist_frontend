import {Flex, Text , Box , TextField } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import {BaseButtonMain} from "../base/button";

/**
 * - 회원가입 관련 view 입니다
 */
export const SignupView = () => {

    return (
        <Flex
            direction="column"
            justify="center"
            gap="4"
            style={{ backgroundColor : "#fff", width : 480 , height : 453 , borderRadius : 12 }}>

            {/* title */}
            <Text as='h2'
                  align='center'
                  weight='bold'
                  style={{
                      color : "#222222" , fontSize : '28px', lineHeight: '38px' }}>
                회원가입
            </Text>

            {/* email input */}
            <Box>
                <Text>이메일</Text>
                <TextField.Root>
                    <TextField.Slot>
                        {/*<MagnifyingGlassIcon height="16" width="16" />*/}
                    </TextField.Slot>
                    <TextField.Input placeholder="Search the docs…" />
                </TextField.Root>
                <Text>에러메시지1</Text>
            </Box>

            {/* nickname input */}
            <Box>
                <Text>닉네임(0/8)</Text>
                <TextField.Root>
                    <TextField.Slot>
                        {/*<MagnifyingGlassIcon height="16" width="16" />*/}
                    </TextField.Slot>
                    <TextField.Input
                        placeholder="Search the docs…"
                        variant="soft"
                    />
                </TextField.Root>
                <Text>에러메시지2</Text>
            </Box>

            <Box>
                <Text>관심 카테고리</Text>
                <BaseButtonMain >
                    외국어 ( + 아이콘! )
                </BaseButtonMain>
            </Box>
        </Flex>
    )
}
