import { LoginView, SignupView, BaseButtonMain , NavigationBar } from "./index.ts";
// import NavigationBar from "./components/view/NavigationBar/index.tsx";
import { Flex, Theme } from "@radix-ui/themes";
import { useState } from 'react';


/**
 * - 화면에 보여주기위해 App 으로 작성합니다
 */
export default function App(): JSX.Element {
  const [step , setStep] = useState( 1 );
  const [openBySignupModal, setOpenBySignupModal] = useState( false );

  const onSignup = async ( { nickName , chipListByActive }) => {
    console.log( 'nickName' , nickName );
    console.log( 'chipListByActive' , chipListByActive );
    setOpenBySignupModal( true );

    return await Promise.resolve( 'hi' );
  }

  return (
    <Theme style={{height: '100vh'}}>
      <NavigationBar />
      <Flex direction="column" align="center" height="100%">
        <SignupView
          step={step}
          setStep={setStep}
          onSignup={ onSignup }
        />
        {/*<LoginView onClickByClose={ () => console.log( 'close' ) } />*/}
        <SignupView.Modal
          open={ openBySignupModal }
          setOpen={openBySignupModal}
          onClickByStart={ () => setOpenBySignupModal( false ) }
        />
      </Flex>
    </Theme>
  );
}
