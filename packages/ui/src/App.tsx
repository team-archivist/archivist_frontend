import { BaseButtonMain } from "./index.ts";
import {Box, Card, Flex, Text, Theme} from "@radix-ui/themes";

/**
 * - 화면에 보여주기위해 App 으로 작성합니다
 */
export default function App() : JSX.Element {
    return (
            <Theme style={ { height : '100%' } }>
                <Flex justify="center"
                      align="center"
                      style={ { backgroundColor : "#DBDBDB" } }
                      width="100%"
                      height="100%">
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        gap="4"
                        style={{ backgroundColor : "#fff", width : 480 , height : 453 , borderRadius : 12 }}>
                        {/* title */}
                        <Text as="h1" align="center"
                              style={{ color : "#222222" , fontSize : '40px' }}>
                            시작하기
                        </Text>
                        <Text as="p" align="center" size="5"
                              style={ { color : "#595959" } }>
                            관심가는 순간들을 모아, <br/> 내 취향으로 만들어주는 아케이브
                        </Text>
                        {/* button */}
                        <Flex justify="center">
                            <BaseButtonMain size='md'>
                                카카오톡 계정으로 시작하기
                            </BaseButtonMain>
                        </Flex>
                    </Flex>
                </Flex>
            </Theme>
    );
}