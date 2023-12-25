import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from "react-router-dom"

const pages = ['뉴스레터', '커뮤니티', '로그인'];

function Header() {
  const navigate = useNavigate();

  const handleCloseNavMenu = (e) => {
    console.log(e.target.value);
    if(e.target.value === '뉴스레터'){
      navigate("/album");
    }else if (e.target.value === '커뮤니티'){
      navigate("/community")
    }else if (e.target.value === '로그인'){
      navigate("/login");
    }
  };

  return (
    <header className='header'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component="a"
              href='/'
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'flex' },
                fontFamily: 'monospace',
                letterSpacing: '.3rem',
                color: '#515151',
                textDecoration: 'none',
              }}
            >
              EveryLetter
            </Typography>

            <Box sx={{flexGrow: 0.98}}></Box>
            <Box sx={{ flexGrow: 0.02, display: { xs: 'flex', md: 'flex' }}}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: '#515151', marginRight: 3}}
                  value={page}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
    </header>

  );
}
export default Header;