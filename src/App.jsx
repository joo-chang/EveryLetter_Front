// import './App.css'
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import React, { useState } from "react";
import Login from "./pages/Login";
import LoginHeader from "./layout/login/LoginHeader";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "./layout/Layout.css";
import { theme } from "./theme";
import Router from "./util/Route/Router";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
