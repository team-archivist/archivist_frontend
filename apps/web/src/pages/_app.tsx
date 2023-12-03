import {Theme} from "@radix-ui/themes";

const App = ( { Component, pageProps } ) : JSX.Element => {
    return (
        <div>
            <Theme>
                <Component />
            </Theme>
        </div>
    )
}

export default App;