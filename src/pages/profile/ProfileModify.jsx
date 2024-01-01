import { useRecoilState } from "recoil";
import { userState } from "../../util/atom";
import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from "react";
import { Avatar, Button, Container, FormControl, InputBase, InputLabel, alpha, styled } from "@mui/material";
import { useCallback } from "react";
import customAxios from "../../util/api";
import { useRef } from "react";



const ProfileModify = () => {
  const [user, setUser] = useRecoilState(userState);
  const [url, setUrl] = useState(user.profileUrl);
  const inputRef = useRef();
  const [inputs, setInputs] = useState({
    email: user.email,
    nickname: user.nickname,
    profile: user.profileUrl,
  })

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const onUploadImage = useCallback(async (e) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0].name);
    const formData = new FormData();
    console.log(formData)
    formData.append("file", e.target.files[0]);
    const img = await customAxios.post(
      "/api/file/upload",
      formData
    );
    console.log(img);
    const url = img.data.data;
    setUrl(url);
    setInputs(prestate => {
      return {
        ...prestate,
        ["profile"]: url
      }
    });
  }, []);
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
      border: '1px solid',
      borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  return (
    <Box>
      <input hidden type="file" accept="image/*" ref={inputRef} onChange={onUploadImage} />
      <Avatar onClick={onUploadImageButtonClick} sx={{ ":hover": { filter: blur("100px") }, margin: 2, width: '15vh', height: '15vh' }} aria-label="recipe" src={url} />
      <FormControl variant="standard">
        <InputLabel shrink htmlFor="bootstrap-input">
          닉네임
        </InputLabel>
        <BootstrapInput defaultValue={user.nickname} id="bootstrap-input" />
      </FormControl>
      <Box height="200px" />
      <Button variant="contained" >
        수정하기
      </Button>
    </Box>
  )
}
export default ProfileModify;