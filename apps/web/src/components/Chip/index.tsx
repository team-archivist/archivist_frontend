import { Badge } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const Chip = ({ children }: PropsWithChildren) => {
  // return <div>{children}</div>;
  return (
    <Badge variant="solid" radius="full" color="gray" size="2">
      {children}
    </Badge>
  );
};

export default Chip;
