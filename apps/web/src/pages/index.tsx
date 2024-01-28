/**
 * - Next 의 Home 컴포넌트입니다
 */
import { useEffect , useState } from "react";
import {useRouter} from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect( () => {
    router.replace( '/landing' );
  } , [] );

  return (
    <div>
      index 페이지
    </div>)
}

export default Home;