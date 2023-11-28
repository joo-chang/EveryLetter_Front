// import './App.css'
import React from "react";
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
