import { VStack } from "@archivist/ui";
import React, { PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  return <VStack className="w-full px-8">{children}</VStack>;
};

export default Layout;
