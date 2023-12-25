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
import '../Layout.css';
import { deleteLoginInfo } from '../../util/common';

const pages = ['뉴스레터', '커뮤니티', '채팅'];
const settings = ['내정보', '로그아웃'];

function LoginHeader() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    console.log(e.target.value);
    if(e.target.value === '뉴스레터'){
      navigate("/album");
    }else if (e.target.value === '커뮤니티'){
      navigate("/post")
    }else if (e.target.value === '채팅'){
      navigate("/chat");
    }
  };

  const handleCloseUserMenu = (e) => {
    console.log(e.target.innerText);
    if(e.target.innerText === '내정보'){
      navigate("/profile");
    }else if (e.target.innerText === '로그아웃'){
      deleteLoginInfo();
      navigate('/login');
    }
    setAnchorElUser(null);
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
          
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu} value={setting}>
                    <Typography textAlign="center" onClick={handleCloseUserMenu} value={setting}>{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
    </header>

  );
}
export default LoginHeader;