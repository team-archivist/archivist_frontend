import { useParams, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios';

const SignupCallback = () => {

  const params = useSearchParams();

  useEffect(() => {
    (async () => {
      if (params.get('token')) {  
        // TODO : token을 회원가입으로 추가
        try {
          // TEST : console.log({ params: params.get('token') })
          const response = await axios.post('/api/TBD', {token: params.get('token')});
          // TODO : 성공 액션에 대한 UI 처리
        } catch (error) {
          throw error;
        }
      }
    })();

  }, [])
  
  
  return (
    <div>회원가입 중입니다</div>
  )
}

export default SignupCallback