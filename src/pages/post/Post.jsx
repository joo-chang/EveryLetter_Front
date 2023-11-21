import { useEffect, useState } from "react";
import Writer from "../../components/editor/Writer";
import customAxios from "../../util/api";
import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Post = () => {
    const navigate = useNavigate();
    // 게시글 데이터 세팅
    const [inputs, setInputs] = useState({
        title: "",
        content: "",
        categoryId: 0,
        userId: 0
    })

    useEffect(() => {
      console.log(inputs.title + " " + inputs.content);
    }, [inputs]);    //
    // const onChange = e => {
    //     setInputs(prestate => {
    //     return {
    //         ...prestate,
    //         [e.target.name]: e.target.value
    //     }
    //     });
    // };
    const { title, content } = inputs;

    const handlePost = () => {
      console.log(inputs.title)
      console.log(inputs.content)
        if(confirm('해당 글을 게시 하시겠습니까?')){
            customAxios.post("/api/post/write", inputs)
            .then(function (response) {
                console.log(response, "성공");
                alert("게시글 등록 완료했습니다.");
                navigate('/');
            })
            .catch(function (err) {
                console.log(err.response)
        })
      }
    }



    return (
      <div >
        <Writer setInputs={setInputs} onClick={handlePost}/>


      </div>
    )
  }
  export default Post;