import React from "react";
import * as Dialog from '@radix-ui/react-dialog';
import '../styles/loginView.css';

/**
 * - 회원가입 모달입니다
 */
export const SignupModal = ({ open, setOpen } ) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay"/>
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle" align="center">
            회원가입 완료
          </Dialog.Title>
          <Dialog.Description className="DialogDescription" align="center">
            회원가입이 완료되었습니다! <br/>
            북마크를 모으고 나의 취향을 찾아보세요.
          </Dialog.Description>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <button className="Button primary">시작하기</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}