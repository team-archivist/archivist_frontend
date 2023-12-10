import { LoginView } from "./index.ts";
import { Flex, Theme} from "@radix-ui/themes";

/**
 * - 화면에 보여주기위해 App 으로 작성합니다
 */
export default function App() : JSX.Element {
    return (
            <Theme style={ { height : '100vh' } }>
                <Flex justify="center"
                      align="center"
                      style={ { backgroundColor : "#DBDBDB" } }
                      width="100%"
                      height="100%">
                    <LoginView />
                </Flex>
            </Theme>
    );
}