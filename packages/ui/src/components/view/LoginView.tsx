/**
 * - LoginView Component 입니다
 */
import React, {useState} from "react";
import {Cross2Icon} from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';

/**
 * - Login 관련 View 입니다
 */
export const LoginView = ( { onLoginClick } = { onLoginClick : () => {} } ): React.JSX.Element => {
  const [open, setOpen] = useState( true );
  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      {/*<Dialog.Trigger onClick={() => setOpen( true )}>Open</Dialog.Trigger>*/}
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" style={{
            backgroundColor: `var(--black-a9)`,
            position: `fixed`,
            inset: 0,
            animation: `overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        />
        <Dialog.Content
          className="DialogContent focus:outline-none" style={{
            backgroundColor: 'white',
            borderRadius: '6px',
            boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px`,
            position: `fixed`,
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
            width: `90vw`,
            maxWidth: `408px`,
            maxHeight: `85vh`,
            padding: `40px`,
            animation: `contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
          onPointerDownOutside={ e => e.preventDefault() }
        >
          <Dialog.Title
            className="DialogTitle"
            align="center"
            style={{
              marginTop: `10px`,
              fontWeight: `bold`,
              color: `#222222`,
              fontSize: `24px`,
            }}
          >
            시작하기
          </Dialog.Title>
          <Dialog.Description
            className="DialogDescription"
            align="center"
            style={{
              margin: `10px 0 20px`,
              color: `#595959`,
              fontSize: `16px`,
              lineHeight: `2.6`,
            }}
          >
            관심가는 순간 조각조각 모음, 아케이브
          </Dialog.Description>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <button
              className="Button bg-primary-default text-white"
              style={{
                display: `inline-flex`,
                alignItems: `center`,
                justifyContent: `center`,
                padding: `6px 24px`,
                fontSize: `16px`,
                lineHeight: `2.4`,
                fontWeight: `300`,
                borderRadius: `24px`,
                height: `45px`,
              }}
            >카카오톡 계정으로 시작하기</button>
          </div>
          <Dialog.Close asChild>
            <button
              onClick={ onLoginClick }
              className="IconButton hover:bg-primary-lighten-300"
              aria-label="Close"
              style={{
                fontFamily: `inherit`,
                borderRadius: `100%`,
                height: `25px`,
                width: `25px`,
                display: `inline-flex`,
                alignItems: `center`,
                justifyContent: `center`,
                color: `#1A1A1A`,
                position: `absolute`,
                top: `10px`,
                right: `10px`,
              }}
            >
              <Cross2Icon/>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}