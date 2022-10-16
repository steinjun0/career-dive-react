import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from './pages/SignUp';
import Mentor from "./pages/Mentor";
import MentoringReservation from './pages/request/MentoringReservation'
import MentoringApply from './pages/request/MentoringApply'
import MentoringApplyViewer from './pages/MentoringApplyViewer'
import MentoringApplyViewerMentor from './pages/Mentor/MentoringApplyViewer'

import Gnb from "./component/Gnb";
import Footer from "./component/Footer";
import SessionList from "./pages/ConsultList";
import MyPage from "./pages/MyPage";
import MentorHome from './pages/Mentor/Home'
import { colorCareerDiveBlue, VerticalFlex } from "util/styledComponent";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import MentorSchedule from "pages/Mentor/Schedule";
import Sendbird from "pages/Sendbird";
import Session from "./pages/Session";
import MentorCalendar from "pages/Mentor/Calendar";
import MentorRegister from "pages/MentorRegister";
import MentorMyPage from "./pages/Mentor/MyPage";
import CareerInfoChange from "component/myPage/CareerInfoChange";

import MentoringRequestFinish from 'pages/request/MentoringRequestFinish'
import Search from 'pages/Search'
import Review from "pages/Review";


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

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ScrollToTop />
      <Gnb />
      <VerticalFlex style={{ minHeight: 'calc(100vh - 80px - 214px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mentorCard/:id" element={<Mentor />} />
          <Route path="/mentee/request/:id" element={<MentoringReservation />} />
          <Route path="/mentee/request/form/:type/:id" element={<MentoringApply />} />
          <Route path="/mentee/request/finish" element={<MentoringRequestFinish />} />
          {/* TODO: type변수 설정해야함, [generalType1,generalType2,premium] */}
          <Route path="/mentee/sessionList/form/:id" element={<MentoringApplyViewer />} />
          <Route path="/mentee/sessionList" element={<SessionList />} />
          <Route path="/mentee/mypage/:subPage" element={<MyPage />} />
          <Route path="/mentee/mypage/account/change" element={<MyPage />} />
          <Route path="/mentee/mypage" element={<Navigate replace to="/mentee/mypage/profile" />} />

          <Route path="/mentor/register" element={<MentorRegister />} />

          <Route path="/mentor/mypage/:subPage" element={<MentorMyPage />} />
          <Route path="/mentor/mypage/account/change" element={<MentorMyPage />} />
          <Route path="/mentor/mypage/career/change" element={<MentorMyPage />} />
          <Route path="/mentor/mypage" element={<Navigate replace to="/mentor/mypage/profile" />} />
          <Route path="/mentor" element={<MentorHome />} />
          <Route path="/mentor/schedule" element={<MentorSchedule />} />
          <Route path="/mentor/calendar" element={<MentorCalendar />} />

          <Route path="/mentor/sessionList/form/:id" element={<MentoringApplyViewerMentor />} />
          {/* TODO: 멘토가 진입하는 멘티 요청서 화면 */}

          <Route path="/sendbird" element={<Sendbird />} />
          <Route path="/session/:id" element={<Session />} />
          <Route path="/search" element={<Search />} />

          <Route path="/review" element={<Review />} />


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
