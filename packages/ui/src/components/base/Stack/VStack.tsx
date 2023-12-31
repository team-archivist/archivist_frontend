import { Flex } from "@radix-ui/themes";
import { FlexProps } from "@radix-ui/themes/dist/cjs/components/flex";
import { PropsWithChildren } from "react";

export const VStack = ({ children, ...rest }: PropsWithChildren<FlexProps>) => {
  return (
    <Flex direction={"column"} {...rest}>
      {children}
    </Flex>
  );
};
