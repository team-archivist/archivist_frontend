/**
 * - Next 의 Home 컴포넌트입니다
 */
import {NextPage} from "next";
import { BaseSample } from "@archivist/ui";

console.log( '<< BaseSample >>' , BaseSample );
const Home : NextPage = () => {

    return (
        <>
            <div>
                안뇽 안뇽 방가웡하잇~
                <BaseSample />
            </div>
        </>
    )
}

export default Home;