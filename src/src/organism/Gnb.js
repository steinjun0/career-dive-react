import { Avatar, Divider, styled } from "@mui/material";
import { RowAlignCenterFlex, CircleImg, LinkNoDeco, colorTextBody, colorCareerDiveBlue, colorBackgroundGrayLight, Flex, VerticalFlex, TextSubtitle2, TextBody2, colorTextLight, EmptyWidth, colorBackgroundGrayMedium } from 'util/styledComponent';

import { useLocation, useNavigate } from 'react-router-dom'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import logoMentee from '../assets/img/logo/careerDiveLogoBeta.svg';
import logoMentor from '../assets/img/logo/careerDiveMentorLogoBeta.svg';
import testProfileImage from '../assets/img/logo/testProfileImage.png';
import { useEffect, useRef, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import API from "API";
import Login from "pages/login";
import DropDownMenu from "component/DropDownMenu";
import useCheckOverMouseOnElement from "util/hooks/useCheckOverMouseOnElement";


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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1194px',
  backgroundColor: 'white',
  margin: '0 30px',
});

const CenterGnb = styled(RowAlignCenterFlex)({
  position: 'absolute',
});

const CenterMenu = styled('ul')({
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
  maxWidth: '1194px',
  backgroundColor: 'white',

  li: {
    color: colorTextBody,
  },
});

const LeftTopGnb = styled(RowAlignCenterFlex)({
  marginRight: 'auto',
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

const ProfileImg = styled(CircleImg)({
  width: '48px',
  height: '48px',
});

const HomeLogo = styled('img')({
  height: '24px',
});

const GnbLi = styled('li')((props) => ({
  ...(props.present_link && {
    color: colorCareerDiveBlue,
    paddingTop: '4px',
    borderBottom: `4px solid ${colorCareerDiveBlue}`,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  }),
}));

const ProfileMenu = styled(VerticalFlex)((props) => ({
  transition: 'height 0.3s ease',
  top: '54px',
  right: 0,
  height: props.is_hide === 'true' ? '0px' : '289px',
  position: 'absolute',
  width: '180px',
  backgroundColor: '#fff',
  boxSizing: 'content-box',
  boxShadow: '10px 20px 40px rgba(130, 130, 130, 0.1)',
  borderRadius: '8px',
  padding: '0 24px',
  gap: '16px',
  color: colorTextLight,
  overflow: 'hidden',
}));

const onClickLogout = () => {
  localStorage.clear();
  window.location.href = '/';
}


function MentorCenterMenu({ url }) {
  return (
    <CenterMenu>
      <LinkNoDeco to={`/mentor`}>
        <GnbLi present_link={`/mentor` === url}>상담</GnbLi>
      </LinkNoDeco>
      <LinkNoDeco to={`/mentor/calendar`}>
        <GnbLi present_link={`/mentor/calendar` === url}>일정 등록</GnbLi>
      </LinkNoDeco>
      <LinkNoDeco to={`/mentor`}>
        <GnbLi>실적</GnbLi>
      </LinkNoDeco>
    </CenterMenu>
  )
}

function MenteeCenterMenu({ url }) {
  return (
    <CenterMenu>
      <LinkNoDeco to={`/mentee/schedule`}>
        <GnbLi present_link={`/mentee/schedule` === url}>내 상담</GnbLi>
      </LinkNoDeco>
      <LinkNoDeco to={`/mentee/schedule`}>
        <GnbLi>찜한 멘토</GnbLi>
      </LinkNoDeco>
      <LinkNoDeco to={`/mentee/schedule`}>
        <GnbLi>상담 후기</GnbLi>
      </LinkNoDeco>
    </CenterMenu>
  )
}

function NoLoginRightMenu() {
  return (
    <RightTopGnb>
      <LinkNoDeco to={'/login'}>
        <CustomButton height={'48px'} background_color={colorBackgroundGrayLight} custom_color={colorCareerDiveBlue}>로그인</CustomButton>
      </LinkNoDeco>
    </RightTopGnb>
  )
}

function MentorRightMenu() {
  const navigater = useNavigate();
  const menuRef = useRef(null)
  const isOverMenu = useCheckOverMouseOnElement(menuRef)
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
            localStorage.setItem('IsMentorMode', false)
            navigater('/')
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
              { name: '계정', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!') } },
              { name: '대금 수령', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!') } },
            ]}
            subItems={[
              { name: '도움말', link: '' },
              { name: '로그아웃', link: '', onClick: () => { onClickLogout() } }
            ]}
          />
        </Flex>
      </Flex>
    </Flex>

  )
}


function MenteeRightMenu() {
  const navigater = useNavigate();
  const menuRef = useRef(null)
  const isOverMenu = useCheckOverMouseOnElement(menuRef)
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
            localStorage.setItem('IsMentorMode', true)
            navigater('/mentor')
          }
        }
      >
        <TextSubtitle2>
          {JSON.parse(localStorage.getItem('IsMentor')) ? '멘토 모드' : '멘토 되기'}
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
              { name: '계정', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!') } },
              { name: '리뷰', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!') } },
              { name: '결제 관리', link: '', onClick: (e) => { e.preventDefault(); alert('기능 준비중입니다!') } },
            ]}
            subItems={[
              { name: '도움말', link: '' },
              { name: '로그아웃', link: '', onClick: () => { onClickLogout() } }
            ]}
          />
        </Flex>
      </Flex>
    </Flex>
  )
}


const gnbDisableUrl = ['/session', '/review']

function Gnb() {
  const location = useLocation().pathname;
  const navigater = useNavigate();


  const [isLogin, setIsLogin] = useState(false)
  const [isMentorMode, setIsMentorMode] = useState(false)


  useEffect(() => {
    async function checkToken() {
      const AccessToken = localStorage.getItem('AccessToken');
      setIsMentorMode(JSON.parse(localStorage.getItem('IsMentorMode')))

      let isAccessTokenValid = false

      if (AccessToken !== null) {
        const validResponse = await API.postAccountValid(AccessToken);
        if (validResponse.status === 200) {
          isAccessTokenValid = true
        }
      } else {
        const isAutoLogin = JSON.parse(localStorage.getItem('isAutoLogin'))
        if (isAutoLogin === true) {
          const RefreshToken = localStorage.getItem('RefreshToken')
          if (RefreshToken !== null) {
            const refreshResponse = await API.postAccountRenew(RefreshToken);
            if (refreshResponse.status === 200) {
              const newAccessToken = refreshResponse.data
              localStorage.setItem('AccessToken', newAccessToken)
              isAccessTokenValid = true
            }
          }
        }
      }

      if (isAccessTokenValid) {
        setIsLogin(true)
      } else {
        setIsLogin(false)
      }

    }

    checkToken();

  }, [location])

  const [firstRender, setFirstRender] = useState(true)

  useEffect(() => {
    if (firstRender && !gnbDisableUrl.map((e) => location.includes(e)).includes(true)) {
      setFirstRender(false)

      if (JSON.parse(localStorage.getItem('IsMentor'))) {
        setIsMentorMode(true)
        localStorage.setItem('IsMentorMode', true)
        navigater('/mentor')
      }

      if (location === '/mentor') {
        if (!JSON.parse(localStorage.getItem('IsMentor'))) {
          setIsMentorMode(false)
          alert('멘토 등록을 진행해주세요')
          navigater('/mentor/register')
        }
      }

    }

  }, [firstRender, navigater])

  return (
    <div>
      {
        !gnbDisableUrl.map((e) => location.includes(e)).includes(true) ?
          <GnbFullWidthWrapper>
            <GnbWrapper>

              <Flex className="gnb-left">
                <LinkNoDeco to={isMentorMode ? '/mentor' : '/'}>
                  {isMentorMode ? <HomeLogo src={logoMentor} alt="커리어 다이브" /> : <HomeLogo src={logoMentee} alt="커리어 다이브" />}
                </LinkNoDeco>
              </Flex>

              <Flex className="gnb-center">
                {
                  isLogin &&
                    isMentorMode ?
                    <MentorCenterMenu url={location} /> :
                    <MenteeCenterMenu url={location} />
                }
              </Flex>

              <Flex className="gnb-right">
                {
                  isLogin ?
                    isMentorMode ?
                      <MentorRightMenu /> :
                      <MenteeRightMenu /> :
                    <NoLoginRightMenu />
                }
              </Flex>

            </GnbWrapper>
          </GnbFullWidthWrapper> :
          <div style={{ marginTop: -80 }}></div>
      }
    </div >

  );
}

export default Gnb;