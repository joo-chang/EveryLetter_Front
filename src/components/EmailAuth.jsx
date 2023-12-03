import { Button, Grid, TextField, FormHelperText} from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useState } from 'react';
import styled from "styled-components"

// mui의 css 우선순위가 높기때문에 important를 설정 - 실무하다 보면 종종 발생 우선순위 문제
const FormHelperTexts = styled(FormHelperText)`
  width: 100%;
  padding-left: 16px;
  font-weight: 700 !important;
  color: #d32f2f !important;
`

const EmailAuth = ({ email, toggleAuthDisable, toggleDisable }) => {
    const [authCode, setAuthCode] = useState("");
    const [emailError, setEmailError] = useState("");
    const onChange = e => {
        setAuthCode(e.target.value);
    };

    
    const handleEmailAuth =async () => {
        await axios
        .post("/api/users/join/email/auth", {email, authCode})
        .then(function (response) {
          console.log(response, "성공")
          toggleDisable();
          toggleAuthDisable();
        })
        .catch(function (err) {
          console.log(err.response)
          setEmailError(err.response.data.errorMessage)
        })
    }
    return (
        <>
            <Grid item xs={8}>
                <TextField
                required
                autoFocus
                fullWidth
                type="text"
                id="authCode"
                name="authCode"
                label="인증 번호"
                onChange={onChange}
                error={emailError !== "" || false}
                />

            </Grid>
            <Grid item xs={4}>
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={handleEmailAuth}
                >
                확인
                </Button>
            </Grid>
            <FormHelperTexts>{emailError}</FormHelperTexts>
        </>
    )
}
export default EmailAuth;