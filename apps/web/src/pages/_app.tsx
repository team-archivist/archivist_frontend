/** 전역 style file import */
import "@radix-ui/themes/styles.css";
import "@arcave/assets/style/reset.css";
import "@arcave/assets/style/common.css";
import "@arcave/assets/style/tailwind.css";
import "@arcave/assets/style/radix.primitives.css";

import { Theme } from "@radix-ui/themes";
import { ConfigProvider, ThemeConfig } from "antd";
import { AppProps } from "next/app";

import { SemanticColor } from "@arcave/utils/color";

import UserLayout from "../layout/userLayout";

const theme: ThemeConfig = {
  token: { colorPrimary: SemanticColor.Primary.Default },
};

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Theme style={{ height: "100vh" }}>
      <UserLayout>
        {/* TODO: theme 정의 필요 */}
        <ConfigProvider theme={theme}>
          <Component {...pageProps} />
        </ConfigProvider>
      </UserLayout>
    </Theme>
  );
};

export default App;
