import {LoginView, SignupView, BaseButtonMain} from "./index.ts";
import {Flex, Theme} from "@radix-ui/themes";
import React , { useState } from 'react';

/**
 * - 화면에 보여주기위해 App 으로 작성합니다
 */
export default function App(): JSX.Element {
  const [step , setStep] = useState( 1 );
  const [open, setOpen] = useState( true );

  return (
    <Theme style={{height: '100vh'}}>
      <Flex direction="column" align="center" height="100%">
        <SignupView step={ step } />
        {/*<LoginView/>*/}
        <SignupView.Modal open={ open } setOpen={setOpen} />
      </Flex>
    </Theme>
  );
}