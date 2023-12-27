import { useEffect } from "react";

/**
 * - Login 관련 기능을 제공해주는 Hook 입니다
 */
const useLogin = () => {

    /** loginClick 시 실행할 기능입니다 */
    const onLoginClick = () => {

    }

    useEffect(() => {
        console.log( 'onLoad' );
    } , [] );

    return {
        // login 관련 view 입니다
        // login 관련 기능
        onLoginClick,
    }
}

export default useLogin;