import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs';
import { useEffect, useState } from 'react';
import customAxios from '../../util/api';
import { useLocation } from 'react-router-dom';
import { Avatar, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import moment from 'moment';

const PostDetail = (props) => {
    const { state } = useLocation();
    const initialPost = {
        id: "",
        createdDate:"",
        nickname:"",
        viewCnt: 0,
        name: "",
        content: ""
    }

    const [post, setPost] = useState({initialPost});
    const {id, createdDate, nickname, viewCnt, name, content} = post;
    
    useEffect(() => {
        console.log(state)
        //spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
        customAxios.get('/api/post/detail/'+state) // 2) 게시글 목록 데이터에 할당  
        .then((response) => {
            console.log(response.data.data)
            
            setPost(response.data.data)
          })
        const formattedDate = moment(post.createdDate).format('YYYY/MM/DD HH:MM:SS');
        console.log(formattedDate)
        setPost({...post, ['createdDate']: formattedDate});
      }, []);

  return (
    <>
        <Card > 
            <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            사진
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
          </IconButton>
        }
        title={post.nickname}
        subheader={ post.createdDate}
      />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <br />
                {post.content && (
                    <Viewer
                    initialValue={post.content || ''}
                    plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                    />
                )}
            </CardContent>
        
        </Card>
      
    </>
  );
};

export default PostDetail;