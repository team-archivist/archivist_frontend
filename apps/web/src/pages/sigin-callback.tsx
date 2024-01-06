import { useRouter } from 'next/router';
import {useEffect} from "react";
import axios from 'axios';

/**
 * - 카카오 로그인 callback 페이지
 */
const SiginCallback = () => {

  const router = useRouter();

  useEffect( () => {
    if ( !router.query?.code ){
      return;
    }
    ( async () => {
      try {
        // const res = await axios.post( `/login/kakao` , { code : router.query?.code } );
        const res = await axios.post( `/posts` , {
          userId: 22,
          id: 5,
          title: "1o",
          body: "11"
        }, );
        console.log( 'res' , res );
      }
      catch(e){
        console.log( 'e' , e );
      }
    } )();


    console.log( 'router' , router.query?.code );
  } , [ router.query ] );
  return (
    <div>카카오톡 로그인 콜백</div>
  )
}
export default SiginCallback;