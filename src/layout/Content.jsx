import { Box } from "@mui/material";
import React from "react";
import './Layout.css'

const Content = (props) => {

  const {
    children
  } = props

  return (
    <Box className='content'>
        <>
          {
            children
          }
        </>
    </Box>
  );
};

export default Content;