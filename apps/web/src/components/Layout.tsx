import React, { PropsWithChildren } from "react";
import VStack from "./Stack/VStack";

const Layout = ({ children }: PropsWithChildren) => {
  return <VStack className="w-full px-8">{children}</VStack>;
};

export default Layout;
