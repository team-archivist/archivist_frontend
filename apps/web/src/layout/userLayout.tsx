import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

import Footer from "@arcave/layout/Footer";

const UserLayout = ({ children }: PropsWithChildren) => {
  const currentPathname = usePathname();
  const [_, currentPath] = currentPathname?.split("/") || ["", ""];
  const isUseFooter =
    currentPath && currentPath !== "login" && currentPath !== "landing";

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative flex-1">{children}</div>
      {isUseFooter && <Footer className="flex-none" />}
    </div>
  );
};
export default UserLayout;
