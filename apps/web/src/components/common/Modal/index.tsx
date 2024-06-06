import { css } from "@emotion/react";
import { Modal as AntdModal, ModalProps } from "antd";
import { PropsWithChildren } from "react";

import { PaletteColor } from "@arcave/utils/color";

import Button from "../Button/Button";
import HStack from "../Stack/HStack";
import VStack from "../Stack/VStack";

type Props = PropsWithChildren<
  Pick<
    ModalProps,
    | "width"
    | "open"
    | "title"
    | "onCancel"
    | "cancelText"
    | "cancelButtonProps"
    | "onOk"
    | "okText"
    | "okButtonProps"
  >
>;

const ACModal = ({
  width = 348,
  open,
  title,
  cancelText = "취소",
  onCancel,
  cancelButtonProps,
  okText = "확인",
  onOk,
  okButtonProps,
  children,
}: Props) => {
  return (
    <AntdModal
      width={width}
      open={open}
      onCancel={onCancel}
      footer={null}
      bodyStyle={{ padding: "0" }}
      centered
      closable={false}
      destroyOnClose
    >
      <VStack spacing={24}>
        <span css={modalTitle}>{title}</span>
        <div>{children}</div>
        <HStack spacing={8} justify="end">
          {onCancel && (
            <Button
              onClick={onCancel}
              backgroundColor={PaletteColor.Gray[200]}
              {...cancelButtonProps}
            >
              {cancelText}
            </Button>
          )}
          {onOk && (
            <Button onClick={onOk} {...okButtonProps}>
              {okText}
            </Button>
          )}
        </HStack>
      </VStack>
    </AntdModal>
  );
};

const modalTitle = css`
  align-self: center;

  color: var(--TextNormal, #1a1a1a);
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px; /* 133.333% */
  letter-spacing: -0.576px;
`;

export default ACModal;
