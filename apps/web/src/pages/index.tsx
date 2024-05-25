import { useEffect } from "react";
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