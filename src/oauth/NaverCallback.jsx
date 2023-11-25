import { useEffect } from "react";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoginInfo } from "../util/common";

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
      const accessToken = response.headers.authorization;
      setLoginInfo(accessToken);
      navigate("/")
    }).catch((err) => {
      //에러발생 시 경고처리 후 login 페이지로 전환
      const errorCode = err.response.data.errorCode;
      const errorMessage = err.response.data.errorMessage;
      if(errorCode === "ALREADY_EXIST_USER"){
        alert(errorMessage)
      }else if(errorCode === "INTERNAL_SERVER_ERROR"){
        alert(errorMessage)
      }
      navigate("/login")
    })
  }, []);
  
  return <Loading />
}

export default NaverCallback;