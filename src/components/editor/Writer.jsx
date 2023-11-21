import React, { useEffect, useRef } from "react";
import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Writer(props) {
  const navigate = useNavigate();
  const editorRef = useRef();
  const handleClick = () => {
    const title = document.getElementById('title').value;
    const editorInstance = editorRef.current.getInstance();
    const getContent_md = editorInstance.getMarkdown();
    console.log(getContent_md);
    const getContent_html = editorInstance.getHTML();

    props.setInputs({['title']: title, ['content']: getContent_md});
    props.onClick();
  }
  const handleCancle = () => {
    navigate(-1);
  }

  return (
    <>
      <TextField id="title" name="title" label="제목" variant="standard" fullWidth/>
      <br />
      <br />
      <Editor
      id="content"
      name="content"
      ref={editorRef}
      previewStyle="vertical"
      initialEditType="markdown"
      placeholder="글을 작성해 주세요"
      height="60vh"
      toolbarItems={[
          ["bold", "italic", "strike"],
          ["hr"],
          ["ul", "ol"],
          ["code", "codeblock"],
          ]}
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
