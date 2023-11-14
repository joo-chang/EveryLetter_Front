import { useEffect } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../util/cookie";

function KakaoCallback() {
    const navigate = useNavigate()

    //최초 렌더링 시 발동
    useEffect(() => {
      const code = new URL(window.location.href).searchParams.get("code");
      
      //spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
      axios.post('/api/auth/oauth/kakao', {
        authorizationCode: code
      }).then((response) => {
          const accessToken = response.headers.authorization
          localStorage.setItem('accessToken', accessToken);
          navigate("/")
        }).catch((err) => {
          //에러발생 시 경고처리 후 login 페이지로 전환
          // alert(err.response.data.detail);
        
          window.location.href = "/login";
        })
    }, []);
  
    return (
      <div>
        <Loading />
      </div>
    )
  }
  
  export default KakaoCallback;