import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Avatar,
  Alert,
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
  AlertTitle,
} from "@mui/material/"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import styled from "styled-components"
import EmailAuth from "../components/EmailAuth"

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`

const SignUp = () => {
  const [isDisable, setIsDisable] = useState(false);
  const [checked, setChecked] = useState(false);
  const [authEmail, setAuthEmail] = useState(null);
  const [emailError, setEmailError] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    nickname: ""
  })
  const onChange = e => {
    setInputs(prestate => {
      return {
        ...prestate,
        [e.target.name]: e.target.value
      }
    });
  };
  const {
    email, password, nickname, rePassword
  } = inputs;

  // 인증 완료 후 이메일 TextField, 이메일 인증 버튼 비활성화
  const toggleDisable = () => {
    setIsDisable(!isDisable);
  }
  // 인증 비활성화
  const toggleAuthDisable = () => {
    setAuthEmail(!authEmail);
  }
  // 약관 동의 체크 여부
  const handleAgree = event => {
    setChecked(event.target.checked)
  }
  const dialog = () => {

  }
  
  // 회원가입 요청
  const handleJoin = async data => {
    // post
    if(confirm('회원가입 하시겠습니까?')){
      await axios
        .post("/api/users/join", data)
        .then(function (response) {
          console.log(response, "성공");
          alert("회원가입을 완료했습니다.");
          navigate('/signin');
        })
        .catch(function (err) {
          console.log(err.response)
          setRegisterError(err.response.data.errorMessage)
        })
    }
  }

  // 이메일 인증 요청
  const handleEmailSend = () => {
    if(confirm('이메일을 전송 하시겠습니까?')){
      axios
      .post("/api/users/join/email/send", {email})
      .then(function (response) {
        console.log(response, "성공")
        setAuthEmail(true);
      })
      .catch(function (err) {
        console.log(err.response)
        setEmailError(err.response.data.errorMessage)
      })  
    }
  }

  // 이메일 유효성 체크
  const handleEmailRegex = e =>{
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      if (!emailRegex.test(email)) setEmailError("올바른 이메일 형식이 아닙니다.")
      else setEmailError("")

      if (
        emailRegex.test(email)
      ) {
        handleEmailSend()
      }
  }

  // 가입 정보 유효성 체크
  const handleSubmit = e => {
    e.preventDefault()

    // 이메일 유효성 체크
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    if (!emailRegex.test(email)) setEmailError("올바른 이메일 형식이 아닙니다.")
    else setEmailError("")

    // 비밀번호 유효성 체크
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if (!passwordRegex.test(password))
      setPasswordState("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!")
    else setPasswordState("")

    // 비밀번호 같은지 체크
    if (password !== rePassword)
      setPasswordError("비밀번호가 일치하지 않습니다.")
    else setPasswordError("")

    // 닉네임 유효성 검사
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/
    if (!nicknameRegex.test(nickname) || nickname.length < 1)
      setNameError("올바른 닉네임을 입력해주세요.")
    else setNameError("")

    // 회원가입 동의 체크
    if (!checked) alert("회원가입 약관에 동의해주세요.")

    if (
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === rePassword &&
      nicknameRegex.test(nickname) &&
      checked
    ) {
      handleJoin(inputs)
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
            회원가입
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    label="이메일 주소"
                    onChange={onChange}
                    disabled={isDisable}
                    error={emailError !== "" || false}
                  />

                </Grid>
                <Grid item xs={4}>
                  <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={isDisable}
                      onClick={handleEmailRegex}
                    >
                    이메일 인증
                  </Button>
                </Grid>
                <FormHelperTexts>{emailError}</FormHelperTexts>
                {authEmail ? <EmailAuth email={email} toggleAuthDisable={toggleAuthDisable} toggleDisable={toggleDisable}/> : ''}
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="비밀번호 (숫자+영문자+특수문자 8자리 이상)"
                    onChange={onChange}
                    error={passwordState !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{passwordState}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    label="비밀번호 재입력"
                    error={passwordError !== "" || false}
                    onChange={onChange}
                  />
                </Grid>
                <FormHelperTexts>{passwordError}</FormHelperTexts>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="nickname"
                    name="nickname"
                    label="닉네임"
                    onChange={onChange}
                    error={nameError !== "" || false}
                  />
                </Grid>
                <FormHelperTexts>{nameError}</FormHelperTexts>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleAgree} color="primary" />
                    }
                    label="회원가입 약관에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
            <FormHelperTexts>{registerError}</FormHelperTexts>
          </Box>
        </Box>
      </Container>
  )
}

export default SignUp
