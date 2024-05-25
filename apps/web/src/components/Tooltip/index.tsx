import { Tooltip as RadixTooltip } from "@radix-ui/themes";
import { PropsWithChildren, useState } from "react";

import * as S from "./styles";

type Props = PropsWithChildren<{
  text: string;
  side: RadixTooltip.PopperContentProps["side"];
  open?: boolean;
}>;

const Tooltip = ({ text, children, open, side }: Props) => {
  const [isOpen, setIsOpen] = useState(open ?? false);

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root open={isOpen}>
        <RadixTooltip.Trigger onClick={handleClick}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content side={side} css={S.tooltipContent}>
            {text}
            <RadixTooltip.Arrow css={S.tooltipArrow} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
