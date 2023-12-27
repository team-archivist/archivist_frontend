import { Button } from "@radix-ui/themes";
import { SemanticColor } from "../../../utils/color";
import { ButtonProps } from "@radix-ui/themes/dist/cjs/components/button";
import { PropsWithChildren } from "react";

// FIXME : backgroundColor와 관련된 영역을 시맨틱한 이름으로 다룰 수 있도록 변경 필요
type Props = ButtonProps & { backgroundColor?: string };

/**
 * - Main Button Component 입니다
 */
export const BaseButtonMain = ({
  children,
  size,
  onClick,
  backgroundColor,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <Button
      size={size ?? "2"}
      variant="solid"
      radius="full"
      style={{
        backgroundColor: `${backgroundColor ?? SemanticColor.Primary.Default}`,
        cursor: "pointer",
      }}
      {...(onClick ? { onClick } : {})}
      {...rest}
    >
      {children}
    </Button>
  );
};
