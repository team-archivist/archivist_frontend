import { css } from "@emotion/react";
import { Skeleton } from "antd";

import VStack from "../Stack/VStack";

type Props = { count: number };

const ACSkeleton = ({ count }: Props) => {
  return (
    <VStack
      spacing={24}
      css={css`
        padding: 24px 0;
      `}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} active />
      ))}
    </VStack>
  );
};

export default ACSkeleton;
