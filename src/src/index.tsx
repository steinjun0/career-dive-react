import React, { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Mentor from "./pages/mentor/id";
import MentoringReservation from './pages/request/MentoringReservation';
import MentoringApply from './pages/request/MentoringApply';
import MentoringApplyViewer from './pages/mentee/schedule/MentoringApplyViewer';

import Gnb from "./organism/Gnb";
import Footer from "./component/Footer";
import SessionList from "./pages/mentee/schedule";
import MyPage from "./pages/mentee/myPage";
import MentorHome from './pages/mentor/home';
import { colorCareerDiveBlue, EmptyHeight, VerticalFlex } from "util/styledComponent";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import MentorSchedule from "pages/mentor/Schedule";
import Sendbird from "pages/Sendbird";
// import Session from "./pages/session/id";
import SessionTs from "./pages/session/id";
import MentorCalendar from "pages/mentor/Calendar";
import MentorRegister from "pages/mentor/register";
import MentorMyPage from "./pages/mentor/myPage";

import MentoringRequestFinish from 'pages/request/MentoringRequestFinish';
import Search from 'pages/search';
import Review from "pages/review/id";
import Signup2 from 'pages/signup/signup2';
import Signup2Nickname from 'pages/signup/signup2Nickname';
import BusniessScrollToTop from 'services/businessComponent/BusinessScrollToTop';
import BusinessRouteChangeTracker from 'services/businessComponent/BusinessRouteChangeTracker';
import BusinessCheckToken from "services/businessComponent/BusinessCheckToken";
import BusinessCheckMentor from "services/businessComponent/BusinessCheckMentor";


const theme = createTheme({
  palette: {
    primary: {
      main: colorCareerDiveBlue!
    },
  },
  typography: {
    fontFamily: 'Spoqa Han Sans Neo'
  }
});


interface IAccountData {
  isMentorMode: boolean,
  isLogin: boolean;
}

export const AccountDataContext =
  createContext
    <{ accountData: IAccountData, updateAccountData: (name: keyof IAccountData, value: any) => void; }>
    ({
      accountData: { isLogin: false, isMentorMode: false },
      updateAccountData: (name, value) => { }
    });

function App(props: { children: ReactNode; }) {
  const [accountData, setAccountData] = useState<IAccountData>({ isLogin: false, isMentorMode: false });

  function updateAccountData(name: keyof IAccountData, value: any) {
    switch (name) {
      case 'isLogin':
        setAccountData((prev) => { return { ...prev, isLogin: value }; });
        break;
      case 'isMentorMode':
        setAccountData((prev) => { return { ...prev, isMentorMode: value }; });
        break;
    }

  }
  return <AccountDataContext.Provider value={{ accountData, updateAccountData }}>
    {props.children}
  </AccountDataContext.Provider>;
}

ReactDOM.render(
  <App>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BusniessScrollToTop />
        <BusinessRouteChangeTracker />
        <BusinessCheckToken />
        <BusinessCheckMentor />
        <Gnb />
        <EmptyHeight height={'80px'} />
        <VerticalFlex style={{ minHeight: 'calc(100vh - 80px - 220px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/signup" element={<SignUp />} /> */}
            <Route path="/signup" element={<Signup2 />} />
            {/* <Route path="/signup/phone" element={<Signup2Phone />} /> */}
            <Route path="/signup/nickname" element={<Signup2Nickname />} />
            <Route path="/mentor/:id" element={<Mentor />} />
            <Route path="/mentee/request/:id" element={<MentoringReservation />} />
            <Route path="/mentee/request/form/:type/:id" element={<MentoringApply />} />
            <Route path="/mentee/request/finish" element={<MentoringRequestFinish />} />
            {/* TODO: type변수 설정해야함, [generalType1,generalType2,premium] */}
            <Route path="/mentee/schedule/:id" element={<MentoringApplyViewer />} />
            <Route path="/mentee/schedule" element={<SessionList />} />
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

            {/* <Route path="/mentor/sessionList/form/:id" element={<MentoringApplyViewerMentor />} /> */}
            {/* TODO: 멘토가 진입하는 멘티 요청서 화면 */}

            <Route path="/sendbird" element={<Sendbird />} />
            {/* <Route path="/js/session/:id" element={<Session />} /> */}
            <Route path="/session/:id" element={<SessionTs />} />
            <Route path="/search" element={<Search />} />

            <Route path="/review/:id" element={<Review />} />


          </Routes>
        </VerticalFlex>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  </App>

  ,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
