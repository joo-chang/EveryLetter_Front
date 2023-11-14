import SNSLink from "../components/SNSLink";

function NaverLogin() {
    // .env 작성
    const client_id = import.meta.env.VITE_NAVER_CLIENT_ID;
    const redirect_uri = import.meta.env.VITE_NAVER_REDIRECT_URI;
    const state = import.meta.env.VITE_NAVER_STATE;
  
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_uri}`;
  
    //cors 이슈로 인해 href 방식으로 호출
    const loginKaKao = () => {
      window.location.href = url;
    }
    return <SNSLink img="./img/login/naver.png" onClick={loginKaKao} />
  }
  
  export default NaverLogin;