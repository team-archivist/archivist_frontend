/**
 * - LoginView Component 입니다
 */
import React, {useState} from "react";
import {Cross2Icon} from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import './styles/loginView.css';

/**
 * - Login 관련 View 입니다
 */
export const LoginView = ( { onLoginClick } = { onLoginClick : () => {} } ): React.JSX.Element => {
  const [open, setOpen] = useState( true );
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/*<Dialog.Trigger onClick={() => setOpen( true )}>Open</Dialog.Trigger>*/}
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay"/>
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle" align="center">
            시작하기
          </Dialog.Title>
          <Dialog.Description className="DialogDescription" align="center">
            관심가는 순간 조각조각 모음, 아케이브
          </Dialog.Description>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <button className="Button primary">카카오톡 계정으로 시작하기</button>
          </div>
          <Dialog.Close asChild>
            <button onClick={ onLoginClick } className="IconButton" aria-label="Close">
              <Cross2Icon/>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}