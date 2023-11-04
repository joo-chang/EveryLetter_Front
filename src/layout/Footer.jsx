import { Typography } from '@mui/material';
import './Layout.css';
import * as React from 'react';

const Footer = () => {
    return (
        <footer className='footer'>
            <Typography variant="h6" gutterBottom>
                EveryLetter
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" component="p">
                박주창 개인 프로젝트입니다. / 010-3130-8644 / 
            </Typography>
        </footer>
    )
}
export default Footer;