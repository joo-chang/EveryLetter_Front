import { useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NaverCallback() {
  const navigate = useNavigate()
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");
    //console.log(code);
    //console.log(state);

    axios.post('/api/auth/oauth/naver', {
      authorizationCode: code,
      state: state
    }).then((response) => {
      const accessToken = response.headers.authorization
      localStorage.setItem('accessToken', accessToken);
      navigate("/")
    }).catch((err) => {
      //에러발생 시 경고처리 후 login 페이지로 전환
      window.location.href = "/login";
    })
  }, []);
  
  return <Loading />
}

export default NaverCallback;