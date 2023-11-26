import {BaseSample} from "./components/base/BaseSample";

/**
 * - 화면에 보여주기위해 App 으로 작성합니다
 */
export default function App() : JSX.Element {
    return (
        <div data-testid="app-wrapper">
            <BaseSample />
        </div>
    );
}