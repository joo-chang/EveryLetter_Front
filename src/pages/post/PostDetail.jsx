import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-java.js';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import { useEffect, useState } from 'react';
import customAxios from '../../util/api';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import moment from 'moment';
import { elapsedTime } from "../../util/common"
import ReplyCard from '../../components/ReplyCard';

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
    const [inputs, setInputs] = useState({
      content: "",
      userId: localStorage.getItem('userId')
    })
    const [post, setPost] = useState({initialPost});
    const [replyList, setRelpyList] = useState([]);
    const {content, postId, userId} = inputs;
    
    useEffect(() => {
        console.log(state)
        //spring 서버로 인증키를 통해 유저정보를 획득하고 로그인 처리 요청
        customAxios.get('/api/post/detail/'+state) // 2) 게시글 목록 데이터에 할당  
        .then((response) => {
            console.log(response.data.data)
            setPost(response.data.data.postDto);
            setRelpyList(response.data.data.replyList);
          })
        const formattedDate = moment(post.createdDate).format('YYYY/MM/DD HH:MM:SS');
        console.log(formattedDate)
        setPost({...post, ['createdDate']: formattedDate});

      }, []);


      const handleReplyPost = () => {
          if(confirm('댓글을 등록 하시겠습니까?')){
              customAxios.post("/api/post/reply/write/"+ state, inputs)
              .then(function (response) {
                  console.log(response, "성공");
                  alert("게시글 등록 완료했습니다.");
                  location.reload();
              })
              .catch(function (err) {
                  console.log(err.response)
              })
        }
      }

  
  

  return (
    <Box >
        <Card sx={{marginBottom:2}}> 
            <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={post.profileUrl} />
        }
        title={post.nickname}
        subheader={ elapsedTime(post.createdDate) }
        />
            <CardContent sx={{margin:'20px'}}>
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
        <ReplyCard setInputs={setInputs} onClick={handleReplyPost} />
        {replyList.map(reply => {
          return (
            <Card key={reply.replyId} variant=""> 
              <CardHeader 
                avatar={
                  <Avatar aria-label="recipe" src={reply.profileUrl} />
                }
                title={reply.nickname}
                subheader={ elapsedTime(reply.createdDate) }
                />
              <CardContent >
                {reply.content && (
                  <Viewer
                  initialValue={reply.content || ''}
                  plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
                  />
                  )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
  );
};

export default PostDetail;