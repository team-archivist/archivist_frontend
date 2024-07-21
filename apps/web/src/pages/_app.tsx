import "reflect-metadata";

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
import { useEffect } from "react";
import mixpanelBrowser from "mixpanel-browser";

const theme: ThemeConfig = {
  token: { colorPrimary: SemanticColor.Primary.Default },
};

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  // NOTE: 레퍼런스 - https://docs.mixpanel.com/docs/quickstart/install-mixpanel
  useEffect(() => {
    mixpanelBrowser.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  }, []);

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
