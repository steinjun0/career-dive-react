import { Divider, styled } from "@mui/material";
import { RowAlignCenterFlex, CircleImg, LinkNoDeco, colorTextBody, colorCareerDiveBlue, colorBackgroundGrayLight, Flex, VerticalFlex, TextSubtitle2, TextBody2, colorTextLight } from 'util/styledComponent';

import { useLocation, useNavigate } from 'react-router-dom'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import logoMentee from '../assets/img/logo/careerDiveLogo.svg';
import logoMentor from '../assets/img/logo/careerDiveMentorLogo.svg';
import testProfileImage from '../assets/img/logo/testProfileImage.jpeg';
import { useEffect, useRef, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import API from "API";
import { isMentorUrl } from "util/util";


const GnbFullWidthWrapper = styled("nav")`
      position: relative;
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
    height: 80px;
    width: 100%;
    max-width: 1194px;
    background-color: white;
    padding: 0 30px;
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
    width: 270px;
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
    height: 28px;
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

function Gnb() {
  const location = useLocation().pathname;

  const isPresentUrl = (url) => {
    return url === location
  }
  const [isLogin, setIsLogin] = useState(false)
  const [isMentor, setIsMentor] = useState(false)
  const [isHideProfileMenu, setIsHideProfileMenu] = useState(true)
  const isMouseOnProfileMenuRef = useRef(false);


  useEffect(async () => {
    const AccessToken = localStorage.getItem('AccessToken')
    setIsMentor(JSON.parse(localStorage.getItem('IsMentor')))

    if (AccessToken !== null) {
      // TODO: token확인 후 로그인 여부 확인.
      const validResponse = await API.postAccountValid(AccessToken);
      if (validResponse.status === 200) {
        setIsLogin(true)
        return
      }
    }
    const isAutoLogin = JSON.parse(localStorage.getItem('isAutoLogin'))
    if (isAutoLogin === true) {
      const RefreshToken = localStorage.getItem('RefreshToken')
      if (RefreshToken !== null) {
        const refreshResponse = await API.postAccountRenew(RefreshToken);
        if (refreshResponse.status === 200) {
          const newAccessToken = refreshResponse.data
          localStorage.setItem('AccessToken', newAccessToken)
          setIsLogin(true)
          return
        }
      }
    }
    setIsLogin(false)
  }, [location])


  // useEffect(async () => {
  //   const isAutoLogin = JSON.parse(localStorage.getItem('isAutoLogin'))
  //   if (isAutoLoginLocalStorage === true) {
  //     const loginResponse = await API.postAccountLogin(email, password);
  //   }
  // }, [])




  return (
    <GnbFullWidthWrapper>
      <GnbWrapper>

        <LeftTopGnb>
          <LinkNoDeco to={isMentorUrl() ? '/mentor' : '/'}>
            {isMentorUrl() ? <HomeLogo src={logoMentor} alt="커리어 다이브" /> : <HomeLogo src={logoMentee} alt="커리어 다이브" />}

          </LinkNoDeco>
        </LeftTopGnb>

        {isLogin && isMentorUrl() && <CenterGnb>
          <CenterMenu>
            <LinkNoDeco to={`/mentor`}>
              <GnbLi present_link={isPresentUrl(`/mentor`).toString()}>상담</GnbLi>
            </LinkNoDeco>
            <LinkNoDeco to={`/mentor/calendar`}>
              <GnbLi present_link={isPresentUrl(`/mentor/calendar`).toString()}>일정 등록</GnbLi>
            </LinkNoDeco>
            <LinkNoDeco to={`/mentor`}>
              <GnbLi>실적</GnbLi>
            </LinkNoDeco>
          </CenterMenu>
        </CenterGnb>}
        {isLogin && !isMentorUrl() && <CenterGnb>
          <CenterMenu>
            <LinkNoDeco to={`/mentee/schedule`}>
              <GnbLi present_link={isPresentUrl(`/mentee/schedule`).toString()}>내 상담</GnbLi>
            </LinkNoDeco>
            <LinkNoDeco to={`/mentee/schedule`}>
              <GnbLi>찜한 멘토</GnbLi>
            </LinkNoDeco>
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
          {isMentorUrl() && <LinkNoDeco to={'/'}>
            <CustomButton
              width={'83px'}
              height={'43px'}
              style={{ marginRight: 24 }}
              background_color={colorBackgroundGrayLight}
              custom_color={colorCareerDiveBlue}
            >
              <TextSubtitle2>
                멘티 모드
              </TextSubtitle2>
            </CustomButton>
          </LinkNoDeco>}
          {!isMentorUrl() && !isMentor && <LinkNoDeco to={'/mentor/register'}>
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
          {!isMentorUrl() && isMentor && <LinkNoDeco to={'/mentor'}>
            <CustomButton
              width={'83px'}
              height={'48px'}
              padding={'12px 14px'}
              style={{ marginRight: 24, }}
              background_color={colorBackgroundGrayLight}
              custom_color={colorCareerDiveBlue}>
              <TextSubtitle2>
                멘토 모드
              </TextSubtitle2>
            </CustomButton>
          </LinkNoDeco>}


          <NotificationsNoneIcon style={{ marginRight: 14 }} />
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
            <ProfileImg src={testProfileImage} alt="" />
            {isMentorUrl() ?
              <ProfileMenu is_hide={String(isHideProfileMenu)}>
                <LinkNoDeco to={`${'mentor'}/mypage/profile`}>
                  <TextSubtitle2 style={{ overFlow: 'auto', marginTop: 24 }}>멘토 프로필</TextSubtitle2>
                </LinkNoDeco>

                <LinkNoDeco to={`${'mentor'}/mypage/account`}>
                  <TextSubtitle2>계정</TextSubtitle2>
                </LinkNoDeco>
                <LinkNoDeco to={`${'mentor'}/mypage/review`}>
                  <TextSubtitle2>대금 수령</TextSubtitle2>
                </LinkNoDeco>
                <Divider></Divider>
                <TextBody2 style={{ overflow: 'initial', }}>도움말</TextBody2>
                <TextBody2 style={{ overflow: 'initial', marginBottom: 24, cursor: 'pointer' }}
                  onClick={onClickLogout}>로그아웃</TextBody2>
              </ProfileMenu>
              :
              <ProfileMenu is_hide={String(isHideProfileMenu)}>
                <LinkNoDeco to={`${'mentee'}/mypage/profile`}>
                  <TextSubtitle2 style={{ overFlow: 'auto', marginTop: 24 }}>프로필</TextSubtitle2>
                </LinkNoDeco>

                <LinkNoDeco to={`${'mentee'}/mypage/account`}>
                  <TextSubtitle2>계정</TextSubtitle2>
                </LinkNoDeco>
                <LinkNoDeco to={`${'mentee'}/mypage/review`}>
                  <TextSubtitle2>후기</TextSubtitle2>
                </LinkNoDeco>
                <LinkNoDeco to={`${'mentee'}/mypage/payment`}>
                  <TextSubtitle2>결제</TextSubtitle2>
                </LinkNoDeco>
                <Divider></Divider>
                <TextBody2 style={{ overflow: 'initial', }}>도움말</TextBody2>
                <TextBody2 style={{ overflow: 'initial', marginBottom: 24, cursor: 'pointer' }}
                  onClick={onClickLogout}>로그아웃</TextBody2>
              </ProfileMenu>
            }

          </Flex>


        </RightTopGnb>}


      </GnbWrapper>
    </GnbFullWidthWrapper>
  );
}

export default Gnb;
