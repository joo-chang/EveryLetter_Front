
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material/"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import styled from "styled-components"
import { setCookie } from "../util/cookie"
import customAxios from "../util/api"
import axios from "axios"
import KakaoLogin from "../oauth/KakaoLogin"
import NaverLogin from "../oauth/NaverLogin"
import { setLoginInfo } from "../util/common"
import { useSetRecoilState } from "recoil"
import { userState } from "../util/atom"

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`

const Boxs = styled(Box)`
  padding-bottom: 40px !important;
`

const Login = () => {
  const [checked, setChecked] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [passwordState, setPasswordState] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [nameError, setNameError] = useState("")
  const [registerError, setRegisterError] = useState("")
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState);


  const handleAgree = event => {
    setChecked(event.target.checked)
  }

  const onhandlePost = async data => {
    const { email, password } = data
    const postData = { email, password }

    // post
    await axios
      .post("/api/auth/login", postData)
      .then(function (response) {
        const accessToken = response.headers.authorization
        console.log(response.data.data)
        setLoginInfo(accessToken);
        setUser(response.data.data);
        navigate("/")
      })
      .catch(function (err) {
        console.log(err)
        setRegisterError(err.response.data.errorMessage)
      })
  }
  const handleSignUp = (e) => {
      navigate("/signup");
  };

  const handleSubmit = e => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)
    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    }
    const { email, password} = loginData

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if (!emailRegex.test(email)) setEmailError("올바른 이메일 형식이 아닙니다.")
    else setEmailError("")

    if (
      emailRegex.test(email)
    ) {
      onhandlePost(loginData)
    }
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    error={emailError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호"
                    error={passwordState !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                로그인
              </Button>
             </FormControl>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  size="large"
                >
                  ID/PW 찾기
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2}}
                  size="large"
                  onClick={handleSignUp}
                >
                  회원가입
                </Button>
              </Grid>
            </Grid>
             <Grid container spacing={2}>
              <Grid item xs={6}>
                <KakaoLogin />
              </Grid>
              <Grid item xs={6}>
                <NaverLogin />
              </Grid>
            </Grid>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Box>
        </Box>
      </Container>
  )
}

export default Login
