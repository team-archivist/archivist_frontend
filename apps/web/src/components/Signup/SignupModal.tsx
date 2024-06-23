import * as Dialog from "@radix-ui/react-dialog";

/**
 * - 회원가입 모달입니다
 */
export const SignupModal = ({ open, setOpen, onClickByStart }: any) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="DialogOverlay"
          style={{
            backgroundColor: `rgba(16, 16, 16, 0.2)`,
            position: `fixed`,
            inset: 0,
          }}
        />
        <Dialog.Content
          className="DialogContent focus:outline-none"
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: `0 0 12px 4px rgba(0, 0, 0, 0.12)`,
            position: `fixed`,
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
            width: `90vw`,
            maxWidth: `408px`,
            maxHeight: `85vh`,
            padding: `32px 24px`,
          }}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <Dialog.Title
            className="DialogTitle"
            align="center"
            style={{
              fontWeight: `bold`,
              color: `#222222`,
              fontSize: `24px`,
            }}
          >
            회원가입 완료
          </Dialog.Title>
          <Dialog.Description
            className="DialogDescription"
            align="center"
            style={{
              color: `#666666`,
              fontSize: `16px`,
              lineHeight: `1.625em`,
              marginTop: `8px`,
            }}
          >
            회원가입이 완료되었습니다! <br />
            북마크를 모으고 나의 취향을 찾아보세요.
          </Dialog.Description>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "24px",
            }}
          >
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
              onClick={onClickByStart || function () {}}
            >
              시작하기
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
