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


const GnbFullWidthWrapper = styled("nav")`
      position: fixed;
      // min-width: 1194px;
      display:flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 80px;
      width: 100%;
      background-color: white;
      border-bottom: 1px solid #E0E0E0;
      z-index: 3;
    `;

const GnbWrapper = styled(RowAlignCenterFlex)`
    display:flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    max-width: 1194px;
    background-color: white;
    margin: 0 30px;

  `;

const CenterGnb = styled(RowAlignCenterFlex)`
    position: absolute;
  `;

const CenterMenu = styled("ul")`
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    list-style: none;
    padding: 0;
    font-size: 16px;
    font-weight: 700;

    margin: 0;
    height: 100%;
    // width: 270px;
    max-width: 1194px;
    background-color: white;
    
    li {
      color: ${colorTextBody};
    }
  `;

const LeftTopGnb = styled(RowAlignCenterFlex)`
    margin-right: auto;
  `;

const RightTopGnb = styled(RowAlignCenterFlex)`
    display:flex;
    flex-direction: row;
    justify-content: end;
    height: 41px;
    width: 193px;
    margin-left: auto;
    padding-left: 16px;
    max-width: 1194px;
    background-color: white;
  `;

const ProfileImg = styled(CircleImg)`
    width: 48px;
    height: 48px;
  `;

const HomeLogo = styled('img')`
    height: 24px;
`

const GnbLi = styled('li')`
  ${props => props.present_link === 'true' ? `
    color: ${colorCareerDiveBlue} !important;
    padding-top: 4px;
    border-bottom: 4px solid ${colorCareerDiveBlue};
    height: 100%;
    display:flex;
    align-items: center;
    box-sizing: border-box;
  `: ''
  }
`;

const ProfileMenu = styled(VerticalFlex)`
  transition: height 0.3s ease;
  top: 54px;
  right: 0;
  height: ${props => props.is_hide === 'true' ? '0px' : '289px'};
  position: absolute;
  width: 180px;
  background-color: #fff;
  box-sizing: content-box;
  box-shadow: 10px 20px 40px rgba(130, 130, 130, 0.1);
  border-radius: 8px;
  padding: 0 24px;
  gap: 16px;
  color: ${colorTextLight};
  overflow: hidden;
`;

const onClickLogout = () => {
  localStorage.clear();
  window.location.href = '/';
  // navigate('/')
}

const gnbDisableUrl = ['/session', '/review']

function Gnb() {
  const location = useLocation().pathname;

  const navigater = useNavigate();

  const isPresentUrl = (url) => {
    return url === location
  }
  const [isLogin, setIsLogin] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [isMentorMode, setIsMentorMode] = useState(false)
  const [isHideProfileMenu, setIsHideProfileMenu] = useState(true)
  const isMouseOnProfileMenuRef = useRef(false);


  useEffect(() => {
    async function checkToken() {
      const AccessToken = localStorage.getItem('AccessToken');
      setIsMentor(JSON.parse(localStorage.getItem('IsMentor')))
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
        !gnbDisableUrl.map((e) => location.includes(e)).includes(true) ? <GnbFullWidthWrapper>
          <GnbWrapper>

            <LeftTopGnb>
              <LinkNoDeco to={isMentorMode ? '/mentor' : '/'}>
                {isMentorMode ? <HomeLogo src={logoMentor} alt="커리어 다이브" /> : <HomeLogo src={logoMentee} alt="커리어 다이브" />}

              </LinkNoDeco>
            </LeftTopGnb>

            {isLogin && isMentorMode && <CenterGnb>
              <CenterMenu>
                <LinkNoDeco to={`/mentor`}>
                  <GnbLi present_link={isPresentUrl(`/mentor`).toString()}>상담</GnbLi>
                </LinkNoDeco>
                <EmptyWidth width={'32px'} />
                <LinkNoDeco to={`/mentor/calendar`}>
                  <GnbLi present_link={isPresentUrl(`/mentor/calendar`).toString()}>일정 등록</GnbLi>
                </LinkNoDeco>
                <EmptyWidth width={'32px'} />
                <LinkNoDeco to={`/mentor`}>
                  <GnbLi>실적</GnbLi>
                </LinkNoDeco>
              </CenterMenu>
            </CenterGnb>}
            {isLogin && !isMentorMode && <CenterGnb>
              <CenterMenu>
                <LinkNoDeco to={`/mentee/schedule`}>
                  <GnbLi present_link={isPresentUrl(`/mentee/schedule`).toString()}>내 상담</GnbLi>
                </LinkNoDeco>
                <EmptyWidth width={'32px'} />
                <LinkNoDeco to={`/mentee/schedule`}>
                  <GnbLi>찜한 멘토</GnbLi>
                </LinkNoDeco>
                <EmptyWidth width={'32px'} />
                <LinkNoDeco to={`/mentee/schedule`}>
                  <GnbLi>상담 후기</GnbLi>
                </LinkNoDeco>

              </CenterMenu>
            </CenterGnb>}

            {!isLogin &&
              <RightTopGnb>
                <LinkNoDeco to={'/login'}>
                  <CustomButton height={'48px'} background_color={colorBackgroundGrayLight} custom_color={colorCareerDiveBlue}>로그인</CustomButton>
                </LinkNoDeco>
              </RightTopGnb>
            }

            {isLogin && <RightTopGnb>
              {isMentorMode &&
                <CustomButton
                  width={'83px'}
                  height={'43px'}
                  style={{ marginRight: 24 }}
                  background_color={colorBackgroundGrayLight}
                  custom_color={colorCareerDiveBlue}
                  onClick={
                    () => {
                      setIsMentorMode(false)
                      localStorage.setItem('IsMentorMode', false)
                      navigater('/')
                    }
                  }
                >
                  <TextSubtitle2>
                    멘티 모드
                  </TextSubtitle2>
                </CustomButton>
              }
              {!isMentorMode && !isMentor && <LinkNoDeco to={'/mentor/register'}>
                <CustomButton
                  width={'83px'}
                  height={'48px'}
                  padding={'12px 14px'}
                  style={{ marginRight: 24, }}
                  background_color={colorBackgroundGrayLight}
                  custom_color={colorCareerDiveBlue}>
                  <TextSubtitle2>
                    멘토 되기
                  </TextSubtitle2>
                </CustomButton>
              </LinkNoDeco>}
              {!isMentorMode && isMentor &&
                <CustomButton
                  width={'83px'}
                  height={'48px'}
                  padding={'12px 14px'}
                  style={{ marginRight: 24, }}
                  background_color={colorBackgroundGrayLight}
                  custom_color={colorCareerDiveBlue}
                  onClick={
                    () => {
                      setIsMentorMode(true)
                      localStorage.setItem('IsMentorMode', true)
                      navigater('/mentor')
                    }
                  }
                >
                  <TextSubtitle2>
                    멘토 모드
                  </TextSubtitle2>
                </CustomButton>
              }
              <NotificationsNoneIcon style={{ marginRight: 24 }} />
              <Flex
                style={{ position: 'relative' }}
                onMouseEnter={() => {
                  isMouseOnProfileMenuRef.current = true
                  setIsHideProfileMenu(false)
                }}
                onMouseLeave={() => {
                  isMouseOnProfileMenuRef.current = false
                  setTimeout(() => {
                    setIsHideProfileMenu(!isMouseOnProfileMenuRef.current)
                  }, 300);
                }}>
                {/* <ProfileImg style={{ cursor: 'pointer' }} onClick={() => { navigater(`${isMentorMode ? 'mentor' : 'mentee'}/mypage/profile`) }} src={testProfileImage} alt="" /> */}
                <Avatar sx={{ cursor: 'pointer', width: 48, height: 48 }} onClick={() => { navigater(`${isMentorMode ? 'mentor' : 'mentee'}/mypage/profile`) }} src={testProfileImage} alt="" />
                {isMentorMode ?
                  <ProfileMenu is_hide={String(isHideProfileMenu)}>
                    <LinkNoDeco to={`${'mentor'}/mypage/profile`}>
                      <TextSubtitle2 style={{ overFlow: 'auto', marginTop: 24 }}>멘토 프로필</TextSubtitle2>
                    </LinkNoDeco>

                    {/* <LinkNoDeco to={`${'mentor'}/mypage/account`}>
                      <TextSubtitle2>계정</TextSubtitle2>
                    </LinkNoDeco> */}
                    <Flex style={{ cursor: 'pointer' }} onClick={() => alert('기능 준비중입니다!')}>
                      <TextSubtitle2 style={{ color: 'black' }}>계정</TextSubtitle2>
                    </Flex>


                    <LinkNoDeco to={`${'mentor'}/mypage/review`}>
                      <TextSubtitle2>대금 수령</TextSubtitle2>
                    </LinkNoDeco>
                    <Divider style={{ color: colorBackgroundGrayMedium }}></Divider>
                    <TextBody2 style={{ overflow: 'initial', }}>도움말</TextBody2>
                    <TextBody2 style={{ overflow: 'initial', marginBottom: 24, cursor: 'pointer' }}
                      onClick={onClickLogout}>로그아웃</TextBody2>
                  </ProfileMenu>
                  :
                  <ProfileMenu is_hide={String(isHideProfileMenu)}>
                    <LinkNoDeco to={`${'mentee'}/mypage/profile`}>
                      <TextSubtitle2 style={{ overFlow: 'auto', marginTop: 24 }}>프로필</TextSubtitle2>
                    </LinkNoDeco>

                    {/* <LinkNoDeco to={`${'mentee'}/mypage/account`}>
                      <TextSubtitle2>계정</TextSubtitle2>
                    </LinkNoDeco> */}
                    <Flex style={{ cursor: 'pointer' }} onClick={() => alert('기능 준비중입니다!')}>
                      <TextSubtitle2 style={{ color: 'black' }}>계정</TextSubtitle2>
                    </Flex>


                    <LinkNoDeco to={`${'mentee'}/mypage/review`}>
                      <TextSubtitle2>리뷰</TextSubtitle2>
                    </LinkNoDeco>
                    <LinkNoDeco to={`${'mentee'}/mypage/payment`}>
                      <TextSubtitle2>결제 관리</TextSubtitle2>
                    </LinkNoDeco>
                    <Divider style={{ color: colorBackgroundGrayMedium }}></Divider>
                    <TextBody2 style={{ overflow: 'initial', }}>도움말</TextBody2>
                    <TextBody2 style={{ overflow: 'initial', marginBottom: 24, cursor: 'pointer' }}
                      onClick={onClickLogout}>로그아웃</TextBody2>
                  </ProfileMenu>
                }
              </Flex>
            </RightTopGnb>}
          </GnbWrapper>
        </GnbFullWidthWrapper> :
          <div style={{ marginTop: -80 }}></div>
      }
    </div >

  );
}

export default Gnb;
