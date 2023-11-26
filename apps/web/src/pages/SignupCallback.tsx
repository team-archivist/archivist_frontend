import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios';

const SignupCallback = () => {

  const params = useParams<{token?: string}>();

  useEffect(() => {
    (async () => {

      if (params?.token) {  
        // TODO : token을 회원가입으로 추가
        try {
          const response = await axios.post('/api/TBD', {token: params.token});
          // TODO : 성공 액션에 대한 UI 처리
        } catch (error) {
          throw error;
        }
      }
    })()
  }, [])
  
  return (
    <div>회원가입 중입니다</div>
  )
}

export default SignupCallback