// NOTE: 전환 완료
import { Tooltip as AntdTooltip, TooltipProps } from "antd";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  text: string;
  placement: TooltipProps["placement"];
}>;

const Tooltip = ({ text, children, placement }: Props) => {
  return (
    <AntdTooltip placement={placement} title={text} arrow>
      {children}
    </AntdTooltip>
  );
};

export default Tooltip;
