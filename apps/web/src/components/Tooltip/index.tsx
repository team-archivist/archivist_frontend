// NOTE: 전환 완료
import { Tooltip as AntdTooltip, TooltipProps } from "antd";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  text: string;
  placement: TooltipProps["placement"];
  open?: boolean;
}>;

const Tooltip = ({ text, children, placement, open }: Props) => {
  return (
    <AntdTooltip placement={placement} title={text} arrow open={open}>
      {children}
    </AntdTooltip>
  );
};

export default Tooltip;
