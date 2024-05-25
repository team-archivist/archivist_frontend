import { css } from "@emotion/react";
import { Tabs } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

import { SemanticColor } from "@arcave/utils/color";

type Props = {
  tabsList: string[];
  defaultValue?: string;
  value: string;
  onValueChange: (value: string) => void;
};

const ACTabs = ({
  tabsList,
  defaultValue,
  value,
  onValueChange,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Tabs.Root
      defaultValue={defaultValue ?? tabsList[0]}
      value={value}
      onValueChange={onValueChange}
    >
      <Tabs.List
        css={css`
          .rt-TabsTrigger::before {
            background-color: ${SemanticColor.Primary.Default};
          }
        `}
      >
        {tabsList.map((tab) => (
          <Tabs.Trigger key={tab} value={tab}>
            {tab}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {children}
    </Tabs.Root>
  );
};

export default ACTabs;
