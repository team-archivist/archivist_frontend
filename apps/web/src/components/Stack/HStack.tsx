import { Flex } from "@radix-ui/themes";
import { FlexProps } from "@radix-ui/themes/dist/cjs/components/flex";
import { PropsWithChildren } from "react";

const HStack = ({ children, ...rest }: PropsWithChildren<FlexProps>) => {
  return <Flex {...rest}>{children}</Flex>;
};

export default HStack;
