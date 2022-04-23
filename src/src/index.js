import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Mentor from "./pages/Mentor";

import Gnb from "./component/Gnb";
import Footer from "./component/Footer";
import Schedule from "./pages/Schedule";
import MyPage from "./pages/MyPage";
import { colorCareerDiveBlue, VerticalFlex } from "util/styledComponent";

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: colorCareerDiveBlue
    },
  },
  typography: {
    fontFamily: 'Spoqa Han Sans Neo'
  }
});

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Gnb />
      <VerticalFlex style={{ minHeight: 'calc(100vh - 80px - 214px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mentee/mentor/profile/:id" element={<Mentor />} />
          <Route path="/mentee/schedule" element={<Schedule />} />
          <Route path="/mentee/mypage/:subPage" element={<MyPage />} />
          <Route path="/mentee/mypage/account/change" element={<MyPage />} />
          <Route path="/mentee/mypage" element={<Navigate replace to="/mentee/mypage/profile" />} />

          <Route path="/mentor/mypage/:subPage" element={<MyPage />} />
          <Route path="/mentor/mypage/account/change" element={<MyPage />} />
          <Route path="/mentor/mypage" element={<Navigate replace to="/mentor/mypage/profile" />} />
        </Routes>
      </VerticalFlex>
      <Footer />
    </ThemeProvider>
  </BrowserRouter>
  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
