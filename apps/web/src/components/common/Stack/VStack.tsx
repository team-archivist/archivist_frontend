import { PropsWithChildren, forwardRef } from "react";

import Stack, { StackProps } from ".";

const VStack = forwardRef(
  ({ children, ...restProps }: PropsWithChildren<StackProps>, ref) => {
    return (
      <Stack {...restProps} ref={ref} direction="column">
        {children}
      </Stack>
    );
  },
);

VStack.displayName = "VStack";

export default VStack;
