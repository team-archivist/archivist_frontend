import { PropsWithChildren, forwardRef } from "react";

import Stack, { StackProps } from ".";

const HStack = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<StackProps>, ref) => {
    return (
      <Stack {...restProps} ref={ref} direction="row">
        {children}
      </Stack>
    );
  },
);

HStack.displayName = "HStack";

export default HStack;
