import React, { createContext, ReactNode, SetStateAction, useEffect, useState } from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Mentor from "./pages/mentee/mentor/[id]";
import MentoringReservation from './pages/mentee/mentor/[id]/request';
import MentoringForm from './pages/mentee/mentor/[id]/form';
import MentoringApplyViewer from './pages/mentee/schedule/MentoringApplyViewer';

import Gnb from "./organism/Gnb";
import Footer from "./organism/Footer";
import SessionList from "./pages/mentee/schedule";
import MyPage from "./pages/mentee/myPage";
import MentorHome from './pages/mentor/home';
import { colorCareerDiveBlue, EmptyHeight, VerticalFlex } from "util/styledComponent";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sendbird from "pages/Sendbird";
// import Session from "./pages/session/id";
import SessionTs from "./pages/session/[id]";
import MentorCalendar from "pages/mentor/Calendar";
import MentorRegister from "pages/mentor/register";
import MentorMyPage from "./pages/mentor/myPage";

import MentoringRequestFinish from 'pages/request/MentoringRequestFinish';
import Search from 'pages/search';
import Review from "pages/review/id";
import Signup from 'pages/signup/Signup';
import SignupNickname from 'pages/signup/SignupNickname';
import BusniessScrollToTop from 'services/businessComponent/BusinessScrollToTop';
import BusinessRouteChangeTracker from 'services/businessComponent/BusinessRouteChangeTracker';
import BusinessCheckToken from "services/businessComponent/BusinessCheckToken";
import BusinessCheckMentor from "services/businessComponent/BusinessCheckMentor";
import { useMediaQuery } from "@mui/material";


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
  useEffect(() => {
    localStorage.setItem('isMentorMode', accountData.isMentorMode.toString());
  }, [accountData]);

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

function Page(props: { children: ReactNode; }) {
  const isDown730 = useMediaQuery(theme.breakpoints.down(730));
  const [gnbHeight, setGnbHeight] = useState<number>(80);
  useEffect(() => {
    if (isDown730) setGnbHeight(48);
    else setGnbHeight(80);
  }, [isDown730]);
  return (
    <VerticalFlex
      sx={{
        minHeight: `calc(100vh - ${gnbHeight}px - 220px)`,
        paddingTop: `${gnbHeight}px`,
        '& > *': {
          minHeight: `calc(100vh - ${gnbHeight}px - 220px)`
        }
      }}
    >
      {props.children}
    </VerticalFlex>
  );

}

const container = document.getElementById('app');
const root = createRoot(container!);

root.render(
  <App>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BusniessScrollToTop />
        <BusinessRouteChangeTracker />
        <BusinessCheckToken />
        <BusinessCheckMentor />
        <Gnb />
        <Page>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/nickname" element={<SignupNickname />} />
            <Route path="/mentee/mentor/:id" element={<Mentor />} />
            <Route path="/mentee/mentor/:id/request" element={<MentoringReservation />} />
            <Route path="/mentee/request/:id/form/:type" element={<MentoringForm />} />
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
            <Route path="/mentor/calendar" element={<MentorCalendar />} />

            {/* <Route path="/mentor/sessionList/form/:id" element={<MentoringApplyViewerMentor />} /> */}
            {/* TODO: 멘토가 진입하는 멘티 요청서 화면 */}

            <Route path="/sendbird" element={<Sendbird />} />
            {/* <Route path="/js/session/:id" element={<Session />} /> */}
            <Route path="/session/:id" element={<SessionTs />} />
            <Route path="/search" element={<Search />} />

            <Route path="/review/:id" element={<Review />} />


          </Routes>
        </Page>
        <Footer />
      </ThemeProvider>
    </BrowserRouter>
  </App>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
