import {LoginView, SignupView, BaseButtonMain, NavigationBar, ArcaveCard, ArcaveCardDetail} from "./index.ts";
// import NavigationBar from "./components/view/NavigationBar/index.tsx";
import { Flex, Theme } from "@radix-ui/themes";


/**
 * - 화면에 보여주기위해 App 으로 작성합니다
 */
export default function App(): JSX.Element {

  return (
    <Theme style={{height: '100vh'}}>
      <NavigationBar rightItems={{
        ['hi']:  (<span>1</span>),}} />
      <ArcaveCardDetail />
    </Theme>
  );
}
