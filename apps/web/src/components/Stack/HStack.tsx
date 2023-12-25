import { Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const HStack = ({ children, ...rest }: PropsWithChildren) => {
  return <Flex {...rest}>{children}</Flex>;
};

export default HStack;
