import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-java.js';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import 'prismjs/components/prism-java.js';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import { useRef, useState } from "react";
import customAxios from "../util/api";
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardHeader } from '@mui/material';

const ReplyCard = (props) => {
    const editorRef = useRef();

    const handleReply = () => {
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
    return (
        <>
            <Card sx={{
                padding:2,
                marginBottom:3,
                ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                }
               }}>
                <Editor
                    id="content"
                    name="content"
                    ref={editorRef}
                    
                    initialEditType="markdown"
                    placeholder="댓글을 자유롭게 작성해 주세요"
                    onChange={onChangeContent}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    height="20vh"
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
                <Button variant="contained" sx={{marginTop:1}} onClick={handleReply} >
                    댓글 쓰기
                </Button>
            </Card>
        </>
    );
};


export default ReplyCard;