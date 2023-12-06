import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Box, Button, Grid, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import customAxios from "../../util/api";
import AddIcon from '@mui/icons-material/Add';
import SubCard from '../../components/SubCard';
import { Edit, LocationOn } from "@mui/icons-material";
import { elapsedTime } from "../../util/common";

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
    const handlePostDetail = (boardId) => {
      navigate('/post/detail', {state: boardId})
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
                <Grid item xs={10} >
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
            <Box sx={{ display: 'flex', justifyContent:'center' }}>
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
            </Box>
            <Button variant="contained" onClick={handleAddPost} startIcon={<AddIcon />}>
              작성하기
            </Button>
            <hr/>
            <Box>
                {boardList.map((board) => (
                    <Grid key={board.id} item xs={12} margin={1}>
                        <SubCard title={board.title} onClick={() => handlePostDetail(board.id)}>
                          <Box sx={{ display: 'flex'}}>
                            <Avatar sx={{width: 20, height: 20, marginRight:1}} aria-label="recipe" src={board.profileUrl} />
                            <Typography sx={{fontSize:12, marginRight:1}}>{board.nickname}</Typography>  
                            <Typography sx={{fontSize:12}} color="text.secondary"> {elapsedTime(board.createdDate)}
                            </Typography>
                          </Box>
                        </SubCard>
                    </Grid>
                ))}
            </Box>
        </>
    )
  }
  export default BBS;