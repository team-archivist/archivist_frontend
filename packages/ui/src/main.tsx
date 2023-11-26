import * as ReactDOM from "react-dom/client";
import * as React from "react";
import App from "./App";

/**
 * - UI 패키지의 Sample 을 실행시키기 위한 파일입니다
 *
 * --> 해당 file 로 UI 패키지 Sample 환경을 띄웁니다
 */
const $container : HTMLElement = document.querySelector( `#root` );
const root = ReactDOM.createRoot( $container );

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
