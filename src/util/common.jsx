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