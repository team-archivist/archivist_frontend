/** 전역 style file import */
import "@radix-ui/themes/styles.css";
import "@assets/style/reset.css";
import "@assets/style/common.css";
import "@assets/style/tailwind.css";

import { Theme } from "@radix-ui/themes";
import { AppProps } from "next/app";
import UserLayout from "../layout/userLayout";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <Theme style={{ height: "100vh" }}>
            <UserLayout>
              <Component {...pageProps} />
            </UserLayout>
        </Theme>
    );
};

export default App;
