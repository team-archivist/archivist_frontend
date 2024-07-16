import { css } from "@emotion/react";
import React, { ForwardedRef } from "react";

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "stretch" | "start" | "end" | "center" | "baseline";
  wrap?: boolean;
  spacing?: number;
  grow?: number;
  columnSpacing?: number;
  rowSpacing?: number;
  className?: string;
  ref?: ForwardedRef<unknown>;
}

const Stack = ({
  children,
  direction = "row",
  wrap = false,
  justify = "start",
  alignItems = "stretch",
  spacing = 0,
  grow = 0,
  columnSpacing,
  rowSpacing,
  className,
  ref,
  ...rest
}: StackProps) => {
  return (
    <div
      className={className}
      css={css`
        display: flex;
        flex-direction: ${direction};
        flex-wrap: ${wrap ? "wrap" : "nowrap"};
        justify-content: ${justify};
        align-items: ${alignItems};
        gap: ${spacing}px;
        flex-grow: ${grow};
        ${columnSpacing !== undefined ? `column-gap: ${columnSpacing}px;` : ""}
        ${rowSpacing !== undefined ? `row-gap: ${rowSpacing}px;` : ""}
      `}
      ref={ref as ForwardedRef<HTMLDivElement>}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Stack;
