/**
 * - LoginView Component 입니다
 */
import React from "react";
import {Flex, Text} from "@radix-ui/themes";
import {BaseButtonMain} from "../base/button";

/**
 * - Login 관련 View 입니다
 * @param onLoginClick
 */
export const LoginView = ({ onLoginClick } ) : React.JSX.Element => {
    return (
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
                <BaseButtonMain size='md' onClick={ onLoginClick }>
                    카카오톡 계정으로 시작하기
                </BaseButtonMain>
            </Flex>
        </Flex>
    )
}