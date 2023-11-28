import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import customAxios from "../../util/api";
import AddIcon from '@mui/icons-material/Add';

const BBS = () => {
    const navigate = useNavigate();
    const [categoryId, setCategoryId] = useState(0);
    const [boardList, setBoardList] = useState([]);
    const [categoryInfo, setCategoryInfo] = useState({
      name: "",
      content: ""
    });
    
    const categorys = ['전체', 'IT', '수다'];
    const [page, setPage] = useState(0);
    const getBoardList = async () => {
      const resp = await customAxios.get('/api/post/list/'+categoryId, {params:{page: page}}) // 2) 게시글 목록 데이터에 할당  
      setBoardList(resp.data.data.postList.content); // 3) boardList 변수에 할당
    }
    const getCategory = async () => {
      const resp = await customAxios.get('/api/post/category/'+categoryId)  
      setCategoryInfo(resp.data.data);
    }
    const handleCloseNavMenu = (e) => {
        console.log(e.target.value);
        if(e.target.value === '전체'){
          setCategoryId(0);
        }else if (e.target.value === 'IT'){
          setCategoryId(1);
        }else if (e.target.value === '수다'){
          // 카테고리ID 세팅해서 재호출
          setCategoryId(2)
        }
      };
    
    const handleAddPost = () => {
      navigate('/post/write');
    }
    useEffect(() => {
      getCategory();
      getBoardList(); // 1) 게시글 목록 조회 함수 호출
    }, []);
    useEffect(() => {
      getCategory();
      getBoardList();
    }, [categoryId])
    return (
        <>
            <Grid container spacing={2} justifyContent={"center"}>
                <Grid item xs={8} >
                    <Card >
                        <CardContent>
                            <Typography sx={{ fontSize: 18 }} bcolor="text.secondary" gutterBottom>
                                {categoryInfo.name}
                            </Typography>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {categoryInfo.content}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container 
  justifyContent="center"
  alignItems="center">
              <Grid item xs={2}>
                {categorys.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{  my: 2, color: '#515151', marginRight: 3}}
                    value={page}
                  >
                    {page}
                  </Button>
                ))}
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent={"flex-end"}>
              <Grid item xs={1}>
                <Button variant="contained" onClick={handleAddPost} startIcon={<AddIcon />}>
                  작성하기
                </Button>
                {/* <IconButton color="secondary" aria-label="add an alarm">
                  <AddIcon>작성하기</AddIcon>
                </IconButton> */}
              </Grid>
            </Grid>
            <ul>
                {boardList.map((board) => (
                    // 4) map 함수로 데이터 출력
                    <li key={board.id}>{board.title}{board.viewCnt}</li>
                ))}
            </ul>
            
        </>
    )
  }
  export default BBS;