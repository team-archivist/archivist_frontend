/** 전역 style file import */
import '@radix-ui/themes/styles.css';
import '../assets/style/reset.css';

/** radix-ui import */
import {Theme} from "@radix-ui/themes";

const App = ( { Component, pageProps } ) : JSX.Element => {
    return (
        <Theme style={ { height : '100vh' } }>
            <Component />
        </Theme>
    )
}

export default App;