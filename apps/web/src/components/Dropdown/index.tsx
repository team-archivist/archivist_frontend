import styled from "@emotion/styled";
import { Popover } from "antd";
import { PropsWithChildren } from "react";

type Props = {};

const Dropdown = ({ open, onOpen, children }: PropsWithChildren) => {
  return (
    <Popover>
      <DropdownLayout>{children}</DropdownLayout>
    </Popover>
  );
};

const DropdownLayout = styled.div`
  position: absolute;
  z-index: 2;
  transform: translateY(60px);

  width: 300px;
  height: 232px;
  padding: 16px;
  box-sizing: border-box;

  overflow-y: scroll;
  overflow-x: hidden;

  background: white;
  border-radius: 12px;
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.08);
`;

export default Dropdown;
