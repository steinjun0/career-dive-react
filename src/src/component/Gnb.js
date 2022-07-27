import { styled } from "@mui/material";
import { RowAlignCenterFlex, CircleImg, LinkNoDeco, colorTextBody, colorCareerDiveBlue, colorBackgroundGrayLight, Flex } from 'util/styledComponent';

import { useLocation, useNavigate } from 'react-router-dom'

import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../assets/img/logo/careerDiveLogo.svg';
import testProfileImage from '../assets/img/logo/testProfileImage.jpeg';
import { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";


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

const BlueSpan = styled('span')`
    color: #698CFF;
    font-weight: 700;
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



function Gnb() {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const isPresentUrl = (url) => {
    return url === location
  }
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const access_token = localStorage.getItem('access_token')
    if (access_token !== null) {
      // TODO: token확인 후 로그인 여부 확인.
      if (true) {
        setIsLogin(true)
      }
    }
  }, [])


  return (
    <GnbFullWidthWrapper>
      <GnbWrapper>

        <LeftTopGnb>
          <LinkNoDeco to={'/'}>
            <HomeLogo src={logo} alt="커리어 다이브" />
          </LinkNoDeco>
        </LeftTopGnb>

        {isLogin && <CenterGnb>
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
              <CustomButton width={'67px'} background_color={colorBackgroundGrayLight} custom_color={colorCareerDiveBlue}>로그인</CustomButton>
            </LinkNoDeco>
          </RightTopGnb>
        }

        {isLogin && <RightTopGnb>
          <CustomButton width={'83px'} style={{ marginRight: 24 }} background_color={colorBackgroundGrayLight} custom_color={colorCareerDiveBlue}>멘토 모드</CustomButton>
          <NotificationsNoneIcon style={{ marginRight: 14 }} />
          <LinkNoDeco to={'mentee/mypage/profile'}>
            <ProfileImg src={testProfileImage} alt="" />
          </LinkNoDeco>
        </RightTopGnb>}


      </GnbWrapper>
    </GnbFullWidthWrapper>
  );
}

export default Gnb;
