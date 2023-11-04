
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import React from 'react'
import SignIn from './pages/SignIn'
import Header from './layout/Header'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import Album from './pages/Album'
import Footer from './layout/Footer'
import './layout/Layout.css'
import Content from './layout/Content'
import { theme } from "./theme";

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
                <Route path="/" element={<Home/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/album" element={<Album/>}/>
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
