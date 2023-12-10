/**
 * - Next 의 Home 컴포넌트입니다
 */
import {NextPage} from "next";
import { LoginView } from "@archivist/ui";
import { Flex } from "@radix-ui/themes";

const Home : NextPage = () => {
    console.log( '<< LoginView >>' , LoginView )
    return (
        <Flex justify="center"
              align="center"
              style={ { backgroundColor : "#DBDBDB" } }
              width="100%"
              height="100%">
            <LoginView onLoginClick={ () => {} } />
        </Flex>
    )
}

export default Home;