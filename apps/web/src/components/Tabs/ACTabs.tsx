import { SemanticColor } from "@archivist/ui";
import { css } from "@emotion/react";
import { Tabs, Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

type Props = {
  tabsList: string[];
  defaultValue?: string;
};

const ACTabs = ({
  tabsList,
  defaultValue,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Tabs.Root defaultValue={defaultValue ?? tabsList[0]}>
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
