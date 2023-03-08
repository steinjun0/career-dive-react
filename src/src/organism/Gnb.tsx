import { Avatar, Divider, styled } from "@mui/material";
import { RowAlignCenterFlex, CircleImg, LinkNoDeco, colorTextBody, colorCareerDiveBlue, colorBackgroundGrayLight, Flex, VerticalFlex, TextSubtitle2, TextBody2, colorTextLight, EmptyWidth, colorBackgroundGrayMedium } from 'util/styledComponent';

import { useLocation, useNavigate } from 'react-router-dom';

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import logoMentee from '../assets/img/logo/careerDiveLogoBeta.svg';
import logoMentor from '../assets/img/logo/careerDiveMentorLogoBeta.svg';
import testProfileImage from '../assets/img/logo/testProfileImage.png';
import { useContext, useEffect, useRef, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import API from "API";
import Login from "pages/login";
import DropDownMenu from "component/DropDownMenu";
import useCheckOverMouseOnElement from "util/hooks/useCheckOverMouseOnElement";
import React from "react";
import { IsMentorModeContext } from "index";


const GnbFullWidthWrapper = styled('nav')({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80px',
  width: '100%',
  backgroundColor: 'white',
  borderBottom: '1px solid #E0E0E0',
  zIndex: 3,
});

const GnbWrapper = styled(RowAlignCenterFlex)({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: 'white',
  padding: '0 30px',
  height: '80px',
  borderBottom: '1px solid #E0E0E0',
  zIndex: 3,

});


const CenterMenuStyle = styled('ul')({
  display: 'flex',
  flexDirection: 'row',
  gap: '32px',
  justifyContent: 'space-between',
  alignItems: 'center',
  listStyle: 'none',
  padding: 0,
  fontSize: '16px',
  fontWeight: 700,
  margin: 0,
  height: '100%',
  color: colorTextBody,

});

const RightTopGnb = styled(RowAlignCenterFlex)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  height: '41px',
  width: '193px',
  paddingLeft: '16px',
  maxWidth: '1194px',
  backgroundColor: 'white',
});


const HomeLogo = styled('img')({
  height: '24px',
});

const GnbLi = styled('li')((props: { highlight: 'true' | 'false'; }) => ({
  paddingTop: '4px',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  ...(props.highlight === 'true' && {
    color: `${colorCareerDiveBlue}`,
    borderBottom: `4px solid ${colorCareerDiveBlue}`,
    height: '74px',
    marginBottom: '-4px',
  })
}));


const onClickLogout = () => {
  localStorage.clear();
  window.location.href = '/';
};



function CenterMenu({ items, url }: { items: { name: string, link: string; }[], url: string; }) {
  return (
    <CenterMenuStyle>
      {
        items.map((item, index) => {
          return (
            // TODO: 기능 준비중입니다! 추후 삭제 필요
            <GnbLi key={index} highlight={item.link === url ? 'true' : 'false'}>
              <LinkNoDeco to={item.link} sx={{ color: 'inherit !important' }} onClick={(e) => { if (item.link === '') { e.preventDefault(); alert('기능 준비중입니다!'); } }}>
                {item.name}
              </LinkNoDeco>
            </GnbLi>
          );
        })
      }
    </CenterMenuStyle>
  );
}

function NoLoginRightMenu() {
  return (
    <RightTopGnb>
      <LinkNoDeco to={'/login'}>
        <CustomButton height={'48px'} background_color={colorBackgroundGrayLight} custom_color={colorCareerDiveBlue}>로그인</CustomButton>
      </LinkNoDeco>
    </RightTopGnb>
  );
}

function MentorRightMenu() {
  const navigater = useNavigate();
  const menuRef = useRef(null);
  const isOverMenu = useCheckOverMouseOnElement(menuRef);
  return (
    <Flex>
      <CustomButton
        width={'83px'}
        height={'48px'}
        style={{ marginRight: 24 }}
        background_color={colorBackgroundGrayLight}
        custom_color={colorCareerDiveBlue}
        onClick={
          () => {
            localStorage.setItem('IsMentorMode', 'false');
            navigater('/');
          }
        }
      >
        <TextSubtitle2>
          멘티 모드
        </TextSubtitle2>
      </CustomButton>

      <Flex
        style={{ position: 'relative' }}
        ref={menuRef}
      >
        <LinkNoDeco to={'mentee/mypage/profile'}>
          <Avatar sx={{ cursor: 'pointer', width: 48, height: 48 }} src={testProfileImage} alt="" />
        </LinkNoDeco>
        <Flex
          sx={{
            top: '54px',
            right: 0,
            position: 'absolute',
          }}
        >
          <DropDownMenu
            isHide={!isOverMenu}
            mainItems={[
              { name: '멘토 프로필', link: 'mentor/mypage/profile' },
              { name: '계정', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
              { name: '대금 수령', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
            ]}
            subItems={[
              { name: '도움말', link: '' },
              { name: '로그아웃', link: '', onClick: () => { onClickLogout(); } }
            ]}
          />
        </Flex>
      </Flex>
    </Flex>

  );
}


function MenteeRightMenu() {
  const navigater = useNavigate();
  const menuRef = useRef(null);
  const isOverMenu = useCheckOverMouseOnElement(menuRef);
  return (
    <Flex>
      <CustomButton
        width={'83px'}
        height={'48px'}
        padding={'12px 14px'}
        style={{ marginRight: 24, }}
        background_color={colorBackgroundGrayLight}
        custom_color={colorCareerDiveBlue}
        onClick={
          () => {
            localStorage.setItem('IsMentorMode', 'true');
            navigater('/mentor');
          }
        }
      >
        <TextSubtitle2>
          {JSON.parse(localStorage.getItem('IsMentor')!) ? '멘토 모드' : '멘토 되기'}
        </TextSubtitle2>
      </CustomButton>
      <Flex
        style={{ position: 'relative' }}
        ref={menuRef}
      >
        <LinkNoDeco to={'mentee/mypage/profile'}>
          <Avatar sx={{ cursor: 'pointer', width: 48, height: 48 }} src={testProfileImage} alt="" />
        </LinkNoDeco>
        <Flex
          sx={{
            top: '54px',
            right: 0,
            position: 'absolute',
          }}
        >
          <DropDownMenu
            isHide={!isOverMenu}
            mainItems={[
              { name: '프로필', link: 'mentee/mypage/profile' },
              { name: '계정', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
              { name: '리뷰', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
              { name: '결제 관리', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
            ]}
            subItems={[
              { name: '도움말', link: '' },
              { name: '로그아웃', link: '', onClick: () => { onClickLogout(); } }
            ]}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}


const gnbDisableUrl = ['/session', '/review'];

function Gnb() {
  const location = useLocation().pathname;
  const navigater = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const { isMentorMode, setIsMentorMode } = useContext(IsMentorModeContext);

  useEffect(() => {
    async function checkToken() {
      const AccessToken = localStorage.getItem('AccessToken');
      setIsMentorMode(JSON.parse(localStorage.getItem('IsMentorMode')!));

      let isAccessTokenValid = false;

      if (AccessToken !== null) {
        const validResponse = await API.postAccountValid(AccessToken);
        if (validResponse.status === 200) {
          isAccessTokenValid = true;
        }
      } else {
        const isAutoLogin = JSON.parse(localStorage.getItem('isAutoLogin')!);
        if (isAutoLogin === true) {
          const RefreshToken = localStorage.getItem('RefreshToken');
          if (RefreshToken !== null) {
            const refreshResponse = await API.postAccountRenew(RefreshToken);
            if (refreshResponse.status === 200) {
              const newAccessToken = refreshResponse.data;
              localStorage.setItem('AccessToken', newAccessToken);
              isAccessTokenValid = true;
            }
          }
        }
      }

      if (isAccessTokenValid) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }

    }

    checkToken();

  }, [location]);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender && !gnbDisableUrl.map((e) => location.includes(e)).includes(true)) {
      setFirstRender(false);

      if (JSON.parse(localStorage.getItem('IsMentor')!)) {
        setIsMentorMode(true);
        localStorage.setItem('IsMentorMode', 'true');
        navigater('/mentor');
      }

      if (location === '/mentor') {
        if (!JSON.parse(localStorage.getItem('IsMentor')!)) {
          setIsMentorMode(false);
          alert('멘토 등록을 진행해주세요');
          navigater('/mentor/register');
        }
      }

    }

  }, [firstRender, navigater]);

  return (
    <>
      {
        !gnbDisableUrl.map((e) => location.includes(e)).includes(true) ?
          <GnbWrapper>
            <Flex className="gnb-left" sx={{ width: '215px' }}>
              <LinkNoDeco to={isMentorMode ? '/mentor' : '/'}>
                {isMentorMode ? <HomeLogo src={logoMentor} alt="커리어 다이브" /> : <HomeLogo src={logoMentee} alt="커리어 다이브" />}
              </LinkNoDeco>
            </Flex>

            <Flex className="gnb-center" sx={{ height: '100%' }}>
              {
                isLogin &&
                  isMentorMode ?
                  <CenterMenu
                    items={
                      [
                        { name: '상담', link: '/mentor' },
                        { name: '일정 등록', link: '/mentor/calendar' },
                        { name: '실적', link: '' }
                      ]
                    }
                    url={location}
                  /> :
                  <CenterMenu
                    items={
                      [
                        { name: '내 상담', link: '/mentee/schedule' },
                        { name: '찜한 멘토', link: '' },
                        { name: '상담 후기', link: '' }
                      ]
                    }
                    url={location}
                  />
              }
            </Flex>

            <Flex className="gnb-right" sx={{ width: '215px', justifyContent: 'end' }}>
              {
                isLogin ?
                  isMentorMode ?
                    <MentorRightMenu /> :
                    <MenteeRightMenu /> :
                  <NoLoginRightMenu />
              }
            </Flex>

          </GnbWrapper>
          :
          <div style={{ marginTop: -80 }}></div>
      }
    </ >

  );
}

export default Gnb;