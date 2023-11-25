import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRouteProps";
import Album from "../../pages/Album";
import SignUp from "../../pages/SignUp";
import Login from "../../pages/Login";
import KakaoCallback from "../../oauth/KakaoCallback";
import NaverCallback from "../../oauth/NaverCallback";
import DefaultLayout from "../../layout";
import Home from "../../pages/Home";
import ProtectRoute from "./ProtectRouteProps";
import Albumtest from "../../pages/Albumtest";
import LoginLayout from "../../layout/login/LoginLayout";
import Post from "../../pages/post/Post";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout/>}>
          {/* <Route index element={<Home />} /> */}
        </Route>
        {/* 인증을 반드시 하지 않아야 접속 가능한 (로그인, 회원가입) */}
        <Route element={<PrivateRoute authentication={false} />}>
          <Route element={<DefaultLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
            <Route path="/auth/naver/callback" element={<NaverCallback />} />
          </Route>
        </Route>

        {/* 인증이 반드시 해야지 접속 가능한 페이지 */}
        <Route element={<PrivateRoute authentication={true} />}>
          {/* 로그인 완료 시 보여주는 Layout */}
          <Route element={<LoginLayout/>}>
            {/* 권한 체크가 필요한 페이지 정의 */}
            {/* ProtectRoute는 반드시 로그인한 사용자의 한해서만 되도록 구현되어 PrivateRoute안에 종속되어야한다. */}
            <Route element={<ProtectRoute/>}>
              <Route path="/" element={<Home />} />
              <Route path="/album" element={<Album />}/>
              <Route path="/album/test" element={<Albumtest />}/>
              <Route path="/post/write" element={<Post />}/>
            </Route>
          </Route>
          <Route element={<ProtectRoute/>}>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
