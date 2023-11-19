import React from 'react';
import { jwtDecode } from "jwt-decode";

const AuthenticatedComponent = ({ allowedRoles, children }) => {
    const token = localStorage.getItem('accessToken');

    // 토큰이 없으면 로그인 페이지로 이동
    if (!token) {
        window.location.href = '/login';
        return null;
    }

    // 토큰에서 권한 정보를 추출
        // 토큰 디코딩
        // 디코딩된 토큰의 내용 출력
    const decodedToken = jwtDecode(token);
    console.log('Decoded Token:', decodedToken);
    // 사용자의 권한이 허용된 권한에 포함되는지 확인
    
    console.log(allowedRoles[0]);
    console.log(decodedToken.auth);
    if(allowedRoles[0] !== decodedToken.auth){
        return <div>Unauthorized</div>;
    }

    // 권한이 없으면 권한이 없다는 메시지를 반환하거나 다른 처리를 수행

    // 허용된 경우 해당 컴포넌트를 반환
    return <>{children}</>;
};

export default AuthenticatedComponent;