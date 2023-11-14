
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import React from 'react'
import Login from './pages/Login'
import Header from './layout/Header'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Album from './pages/Album'
import Footer from './layout/Footer'
import './layout/Layout.css'
import Content from './layout/Content'
import { theme } from "./theme";
import KakaoCallback from './oauth/KakaoCallback'
import NaverCallback from './oauth/NaverCallback'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <CssBaseline />
        <div className='wrapper'>
          <div className='contentWrapper'>
            <Header/>
            <Content>
              <Routes>
                {/* 메인 페이지 */}
                <Route path="/" element={<Album/>}/>


                <Route path="/album" element={<Album/>}/>

                {/* 회원 가입, 로그인 페이지 */}
                <Route path='/signup' element={<SignUp/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
                <Route path="/auth/naver/callback" element={<NaverCallback />} />
              </Routes>
            </Content>
          </div>
          <Footer/>
        </div>

      </React.Fragment>
    </ThemeProvider>
  )
}

export default App
