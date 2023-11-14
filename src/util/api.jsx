import axios from 'axios';
import { getCookie, removeCookie } from './cookie';
import { useNavigate } from 'react-router-dom';

const customAxios = axios.create();
/**
 1. 요청 인터셉터
 2개의 콜백 함수를 받습니다.
 */
customAxios.interceptors.request.use(
  (config) => {
    // HTTP Authorization 요청 헤더에 jwt-token을 넣음
    // 서버측 미들웨어에서 이를 확인하고 검증한 후 해당 API에 요청함.
    const token = localStorage.getItem('accessToken');
    try {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else{
        window.location.href = '/login';
      }
      return config;
    } catch (err) {
      console.error('[_axios.interceptors.config] config : ' + err);
    }
    return config;
  },
  (error) => {
    // 요청 에러 직전 호출됩니다.
    return Promise.reject(error);
  }
);

/**
 2. 응답 인터셉터
 2개의 콜백 함수를 받습니다.
 */
customAxios.interceptors.response.use(
  (response) => {
    /*
        http status가 200인 경우
        응답 성공 직전 호출됩니다.
        .then() 으로 이어집니다.
    */
    
    return response;
  },

  async (error) => {
    /*
        http status가 200이 아닌 경우
        응답 에러 직전 호출됩니다.
        .catch() 으로 이어집니다.
    */
   const { response, config } = error;
   if (response.status === 401){
        console.log("401 error")
        console.log(response)
        if (response.data.errorCode == 'EXPIRED_REFRESH_TOKEN'){
            alert("토큰 만료. 재로그인 해주세요.");
            localStorage.removeItem('accessToken');
            removeCookie("refreshToken");
            window.location.href = '/login';
        }else{
            const accessToken = localStorage.getItem('accessToken');
            // const refreshToken = getCookie("refreshToken");
            // console.log(accessToken);
            // console.log( getCookie("refreshToken"));
            // console.log(refreshToken);
            if(accessToken){
                const postData = {accessToken}
                await axios.post("/api/auth/reissue", postData)
                .then(function (response) {
                    console.log(response.data);
                    localStorage.removeItem('accessToken');
                    localStorage.setItem('accessToken', response.data.data.accessToken);
                    
                    config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
                })
                .catch(function (err) {
                    console.log(err.response)
                    if(err.response.status === 401){
                        alert("토큰 만료. 재로그인 해주세요.");
                        localStorage.removeItem('accessToken');
                        removeCookie("refreshToken");
                        window.location.href = '/login';
                    }
                  })
                const response = await axios.request(config);
                return response;
            }
        }
   }
    return Promise.reject(error);
  }
);

export default customAxios;
