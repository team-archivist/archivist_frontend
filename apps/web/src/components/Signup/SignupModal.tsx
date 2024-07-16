import * as Dialog from "@radix-ui/react-dialog";

/**
 * - 회원가입 모달입니다
 */
export const SignupModal = ({ open, setOpen, onClickByStart }) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="DialogOverlay"
          style={{
            backgroundColor: `var(--black-a9)`,
            position: `fixed`,
            inset: 0,
          }}
        />
        <Dialog.Content
          className="DialogContent focus:outline-none"
          style={{
            backgroundColor: "white",
            borderRadius: "6px",
            boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px`,
            position: `fixed`,
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
            width: `90vw`,
            maxWidth: `408px`,
            maxHeight: `85vh`,
            padding: `40px`,
          }}
          onPointerDownOutside={(e) => e.preventDefault()}
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
            회원가입 완료
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
            회원가입이 완료되었습니다! <br />
            북마크를 모으고 나의 취향을 찾아보세요.
          </Dialog.Description>
          <div style={{ display: "flex", justifyContent: "center" }}>
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
