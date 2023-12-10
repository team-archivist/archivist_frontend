/**
 * - Next 의 Home 컴포넌트입니다
 */
import {NextPage} from "next";
import useLogin from "../hooks/useLogin";
import { Flex } from "@radix-ui/themes";

const Home : NextPage = () => {
    const { LoginView , onLoginClick } = useLogin();
    return (
        <Flex justify="center"
              align="center"
              style={ { backgroundColor : "#DBDBDB" } }
              width="100%"
              height="100%">
            <LoginView onLoginClick={ onLoginClick } />
        </Flex>
    )
}

export default Home;