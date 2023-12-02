import React, { useEffect, useRef } from "react";
import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-java.js';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import { useState } from "react";
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import customAxios from "../../util/api";

export default function Writer(props) {
  const navigate = useNavigate();
  const editorRef = useRef();
  const [categoryList, setCategoryList] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  useEffect(() => {
    customAxios.get("/api/post/category/list")
    .then(function (response){
      setCategoryList(response.data.data.categoryList);
    })
  }, []);

  const onChange = e => {
    props.setInputs(prestate => {
      console.log(e.target.name + e.target.value)
      if(e.target.name === 'categoryId'){
        setCategoryName(e.target.value)
      }
      return {
        ...prestate,
        [e.target.name]: e.target.value
      }
    });
  };
  const onChangeContent = () => {
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();

    props.setInputs(prestate => {
      return {
        ...prestate,
        ['content']: getContent_md
      }
    });
  };
  const handleClick = () => {
    const editorInstance = editorRef.current.getInstance();

    const getContent_md = editorInstance.getMarkdown();
    const getContent_html = editorInstance.getHTML();
    
    console.log(getContent_md);
    console.log(getContent_html)

    props.setInputs(prestate => {
      return {
        ...prestate,
        ['content']: getContent_md
      }
    });
    handlePost();
  }
  const handlePost = () => {
    props.onClick();
  }
  const handleCancle = () => {
    navigate(-1);
  }

  return (
    <>
      <TextField id="title" name="title" label="제목" variant="outlined" onChange={onChange} fullWidth/>
      <br /><br />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-helper-label">카테고리</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={categoryName}
          name="categoryId"
          label="category"
          onChange={onChange}
        >
          {categoryList
            .map((row) => (
              <MenuItem key={row.id} value={row.id}>{row.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <Editor
      id="content"
      name="content"
      ref={editorRef}
      previewStyle="vertical"
      initialEditType="markdown"
      placeholder="글을 작성해 주세요"
      onChange={onChangeContent}
      plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
      height="60vh"
      hooks={{
        addImageBlobHook: async (blob, callback) => {
          const formData = new FormData();
          console.log(formData)
          formData.append("file", blob);
          const img = await customAxios.post(
            "/api/file/upload",
            formData
          );
          console.log(img);
          const url = img.data.data;

          callback(url, "");
        },
      }}
      />
      <br />
              <Grid container spacing={2}>
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  
                  sx={{ mb: 2 , fontSize: 13}}
                  size="large"
                  onClick={handleCancle}
                >
                  나가기
                </Button>
              </Grid>
              <Grid item xs={8} />
              <Grid item xs={2}>
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2, fontSize: 13}}
                  onClick={handleClick}
                  size="large"
                >
                  게시하기
                </Button>
              </Grid>
        </Grid>
    </>
  );
}
