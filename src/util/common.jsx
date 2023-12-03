import { jwtDecode } from "jwt-decode";
import { removeCookie } from "./cookie";

export const setLoginInfo = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    console.log(decodedToken);
    const userRole = decodedToken.auth.substring(5);
    const userId = decodedToken.sub;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', userRole);
    localStorage.setItem('userId', userId);
};

export const deleteLoginInfo = () => {
    
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    removeCookie("refreshToken");
};

export const elapsedTime = (date) => {
    const start = new Date(date);
    const end = new Date();
  
    const diff = (end - start) / 1000;
    
    const times = [
      { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
      { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
      { name: '일', milliSeconds: 60 * 60 * 24 },
      { name: '시간', milliSeconds: 60 * 60 },
      { name: '분', milliSeconds: 60 },
    ];
  
    for (const value of times) {
      const betweenTime = Math.floor(diff / value.milliSeconds);
  
      if (betweenTime > 0) {
        return `${betweenTime}${value.name} 전`;
      }
    }
    return '방금 전';
}