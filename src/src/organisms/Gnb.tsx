import { Avatar, IconButton, styled, useMediaQuery, useTheme } from "@mui/material";
import { RowAlignCenterFlex, LinkNoDeco, colorTextBody, colorCareerDiveBlue, colorBackgroundGrayLight, Flex, VerticalFlex, TextSubtitle2, TextBody2, colorTextLight, EmptyWidth, colorBackgroundGrayMedium, TextHeading6, colorTextDisabled, colorTextTitle } from 'util/styledComponent';

import { useLocation, useNavigate } from 'react-router-dom';

import logoMentee from '../assets/img/logo/careerDiveLogoBeta.svg';
import logoMentor from '../assets/img/logo/careerDiveMentorLogoBeta.svg';
import testProfileImage from '../assets/img/logo/testProfileImage.png';
import { SetStateAction, useContext, useEffect, useRef, useState, } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import DropDownMenu from "component/DropDownMenu";
import useCheckOverMouseOnElement from "util/hooks/useCheckOverMouseOnElement";
import React from "react";
import { AccountDataContext } from "index";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

interface IProfileMenu {
  mainItems: { name: string, link: string, onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; }[],
  subItems: { name: string, link: string, onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void; }[],
}

interface INavigation {
  name: string,
  link: string,
}

const mentorProfileMenuItems: IProfileMenu = {
  mainItems:
    [
      { name: '멘토 프로필', link: 'mentor/mypage/profile' },
      { name: '계정', link: '', onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
      { name: '대금 수령', link: '', onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
    ],
  subItems:
    [
      { name: '도움말', link: '' },
      { name: '로그아웃', link: '', onClick: () => { onClickLogout(); } }
    ]
};

const menteeProfileMenuItems: IProfileMenu = {
  mainItems: [
    { name: '프로필', link: 'mentee/mypage/profile' },
    { name: '계정', link: '', onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
    { name: '리뷰', link: '', onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
    { name: '결제 관리', link: '', onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => { e.preventDefault(); alert('기능 준비중입니다!'); } },
  ],
  subItems: [
    { name: '도움말', link: '' },
    { name: '로그아웃', link: '', onClick: () => { onClickLogout(); } }
  ]
};

const mentorNavigations: INavigation[] = [
  { name: '상담', link: '/mentor' },
  { name: '일정 등록', link: '/mentor/calendar' },
  { name: '실적', link: '' }
];

const menteeNavigations: INavigation[] = [
  { name: '내 상담', link: '/mentee/schedule' },
  { name: '찜한 멘토', link: '' },
  { name: '상담 후기', link: '' }
];

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

const NavigationStyle = styled('ul')({
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

// common

const onClickLogout = () => {
  localStorage.clear();
  localStorage.setItem('CBTCode', 'cbt2023');
  window.location.href = '/';
};


function ModeButton() {
  const isMentor = JSON.parse(localStorage.getItem('IsMentor')!);
  const { accountData, updateAccountData } = useContext(AccountDataContext);
  const { isMentorMode, isLogin } = accountData;
  const navigate = useNavigate();
  const location = useLocation();
  const [buttonString, setButtonString] = useState<string>('');

  useEffect(() => {
    if (isLogin) {
      if (isMentorMode) {
        setButtonString('멘티 모드');
      }
      else {
        if (isMentor) {
          setButtonString('멘토 모드');
        }
        else {
          setButtonString('멘토 되기');
        }
      }
    }
    else {
      setButtonString('로그인');
    }
  }, [accountData]);

  function onClickButton() {
    if (isLogin) {
      if (isMentorMode) {
        updateAccountData('isMentorMode', false);
        localStorage.setItem('IsMentorMode', 'false');
        navigate('/');
        console.log(location.pathname);
      }
      else {
        if (isMentor) {
          updateAccountData('isMentorMode', true);
          localStorage.setItem('IsMentorMode', 'true');
          navigate('/mentor');
        }
        else {
          updateAccountData('isMentorMode', false);
          localStorage.setItem('IsMentorMode', 'false');
          navigate('/mentor/register');
        }
      }
    }
    else {
      navigate('/login');
    }
  }

  return <CustomButton
    width={'83px'}
    height={'48px'}
    style={{ marginRight: 24 }}
    background_color={colorBackgroundGrayLight}
    custom_color={colorCareerDiveBlue}
    onClick={onClickButton}
  >
    <TextSubtitle2>
      {buttonString}
    </TextSubtitle2>
  </CustomButton>;
}

// PC

function Navigation({ items, url }: { items: { name: string, link: string; }[], url: string; }) {
  return (
    <NavigationStyle>
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
    </NavigationStyle>
  );
}

function NoLoginRightMenu() {
  return (
    <RightTopGnb>
      <LinkNoDeco to={'/login'}>
        <CustomButton
          height={'48px'}
          background_color={colorBackgroundGrayLight}
          custom_color={colorCareerDiveBlue}>
          <TextSubtitle2>
            로그인
          </TextSubtitle2>
        </CustomButton>
      </LinkNoDeco>
    </RightTopGnb>
  );
}

function ProfileMenu(
  {
    type,
    mainItems,
    subItems
  }
    :
    {
      type: 'mentor' | 'mentee',
      mainItems: IProfileMenu["mainItems"],
      subItems: IProfileMenu["subItems"];
    }
) {
  const menuRef = useRef(null);
  const isOverMenu = useCheckOverMouseOnElement(menuRef);
  return (
    <Flex>
      <ModeButton />

      <Flex
        style={{ position: 'relative' }}
        ref={menuRef}
      >
        <LinkNoDeco to={`${type}/mypage/profile`}>
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
            mainItems={mainItems}
            subItems={subItems}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

function PcGnb() {
  const location = useLocation();
  const { accountData } = useContext(AccountDataContext);
  const { isLogin, isMentorMode } = accountData;
  return <GnbWrapper>
    <Flex className="gnb-left" sx={{ width: '215px' }}>
      <LinkNoDeco to={isMentorMode ? '/mentor' : '/'}>
        <img src={isMentorMode ? logoMentor : logoMentee} alt="커리어다이브" style={{ height: '24px' }} />
      </LinkNoDeco>
    </Flex>
    <Flex className="gnb-center" sx={{ height: '100%' }}>
      {
        isLogin &&
        (
          isMentorMode ?
            <Navigation
              items={
                mentorNavigations
              }
              url={location.pathname}
            /> :
            <Navigation
              items={
                menteeNavigations
              }
              url={location.pathname}
            />
        )
      }
    </Flex>

    <Flex className="gnb-right" sx={{ width: '215px', justifyContent: 'end' }}>
      {
        isLogin ?
          isMentorMode ?
            <ProfileMenu
              type="mentor"
              mainItems={mentorProfileMenuItems.mainItems}
              subItems={mentorProfileMenuItems.subItems}
            /> :
            <ProfileMenu
              type="mentee"
              mainItems={menteeProfileMenuItems.mainItems}
              subItems={menteeProfileMenuItems.subItems}
            /> :
          <NoLoginRightMenu />
      }
    </Flex>

  </GnbWrapper>;
}

// Mobile

function MobileNavigation({ items, url, onClick }: { items: { name: string, link: string; }[], url: string, onClick: () => void; }) {
  // highlight={item.link === url ? 'true' : 'false'}
  return (
    <VerticalFlex sx={{ padding: '16px', gap: '16px', maxHeight: 'min-content', backgroundColor: 'white' }}>
      {
        items.map((item, index) => {
          return (
            // TODO: 기능 준비중입니다! 추후 삭제 필요
            <LinkNoDeco
              key={index}
              to={item.link}
              onClick={(e) => {
                if (item.link === '') {
                  e.preventDefault(); alert('기능 준비중입니다!');
                } else {
                  onClick();
                }
              }}>
              <TextHeading6
                sx={{
                  color: item.link === url ? colorCareerDiveBlue : colorTextTitle,
                }}
              >
                {item.name}
              </TextHeading6>
            </LinkNoDeco>
          );
        })
      }
    </VerticalFlex>
  );
}

function MobileProfileMenu({ items, url, onClick }: { items: IProfileMenu, url: string, onClick: () => void; }) {
  // highlight={item.link === url ? 'true' : 'false'}
  return (
    <VerticalFlex sx={{ padding: '16px', gap: '16px', maxHeight: 'min-content', backgroundColor: 'white' }}>
      {
        items.mainItems.map((item, index) => {
          return (
            <LinkNoDeco
              key={index}
              to={item.link}
              onClick={(e) => {
                // TODO: 여기서 link로 판단하지 말아야함
                if (item.link === '') { e.preventDefault(); alert('기능 준비중입니다!'); }
                else { onClick(); }
              }}>
              <TextSubtitle2
                sx={{
                  color: item.link === url ? colorCareerDiveBlue : colorTextTitle,
                }}
              >
                {item.name}
              </TextSubtitle2>
            </LinkNoDeco>
          );
        })
      }
      {
        items.subItems.map((item, index) => {
          return (
            <LinkNoDeco
              key={index}
              to={item.link}
              onClick={(e) => {
                if (item.onClick) {
                  item.onClick(e);
                  onClick();
                }
                else if (item.link === '') { e.preventDefault(); alert('기능 준비중입니다!'); }
              }}>
              <TextBody2
                sx={{
                  color: item.link === url ? colorCareerDiveBlue : colorTextLight,
                }}>
                {item.name}
              </TextBody2>
            </LinkNoDeco>
          );
        })}
    </VerticalFlex>
  );
}

function MobileGnbContent({ navigations, items, onClick }: { navigations: INavigation[], items: IProfileMenu, onClick: () => void; }) {
  const location = useLocation();
  return (
    <VerticalFlex sx={{ justifyContent: 'start', gap: '8px', backgroundColor: colorBackgroundGrayLight }}>
      <Flex sx={{ justifyContent: 'space-between', padding: '16px', backgroundColor: 'white' }}>
        <ModeButton />
        <LinkNoDeco to={'mentee/mypage/profile'}>
          <Avatar sx={{ cursor: 'pointer', width: 48, height: 48 }} src={testProfileImage} alt="" />
        </LinkNoDeco>
      </Flex>
      <MobileNavigation
        items={navigations}
        url={location.pathname}
        onClick={onClick}
      />
      <MobileProfileMenu
        items={items}
        url={location.pathname}
        onClick={onClick}
      />

    </VerticalFlex>
  );
}

function MobileGnb() {
  const location = useLocation();
  const navigate = useNavigate();
  const { accountData } = useContext(AccountDataContext);
  const { isLogin, isMentorMode } = accountData;
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const theme = useTheme();
  const isDown730 = useMediaQuery(theme.breakpoints.down(730));

  useEffect(() => {
    setIsOpenMobileMenu(false);
  }, [isDown730, location]);

  return <Flex sx={{
    position: 'fixed', zIndex: 10,
    width: '100%', height: '48px',
    backgroundColor: 'white',
    borderBottom: `0.5px solid ${colorBackgroundGrayMedium}`,
    justifyContent: 'space-between', alignItems: 'center',
    padding: '0 16px'
  }}>
    <LinkNoDeco to={isMentorMode ? '/mentor' : '/'}>
      <img src={isMentorMode ? logoMentor : logoMentee} alt="커리어다이브" style={{ height: '18px' }} />
    </LinkNoDeco>

    {
      isLogin ?
        <IconButton onClick={() => setIsOpenMobileMenu((prev) => !prev)}>
          {
            isOpenMobileMenu ?
              <CloseIcon /> :
              <MenuIcon />
          }
        </IconButton>
        :
        <CustomButton
          background_color={colorBackgroundGrayLight}
          custom_color={colorCareerDiveBlue}
          onClick={() => { navigate('/login'); }}
        >
          <TextSubtitle2>
            로그인
          </TextSubtitle2>
        </CustomButton>
    }
    <VerticalFlex
      sx={{
        height: isOpenMobileMenu ? '-webkit-fill-available' : 0, position: 'fixed', zIndex: 3,
        top: '48px', width: '100%', marginLeft: '-16px', overflow: 'hidden',
      }}
    >
      <VerticalFlex
        sx={{
          height: isOpenMobileMenu ? '100%' : 0, transition: isOpenMobileMenu ? 'ease 0.3s all' : '',
          backgroundColor: 'white', overflow: 'hidden',
          justifyContent: 'space-between'
        }}
      >
        {
          isLogin &&
          (
            isMentorMode ?
              <MobileGnbContent
                navigations={mentorNavigations}
                items={mentorProfileMenuItems}
                onClick={() => { setIsOpenMobileMenu(false); }} />
              :
              <MobileGnbContent
                navigations={menteeNavigations}
                items={menteeProfileMenuItems}
                onClick={() => { setIsOpenMobileMenu(false); }} />
          )
        }
      </VerticalFlex>
    </VerticalFlex>
  </Flex>;
}

// Integration

const gnbDisableUrl = ['/session', '/review'];

function Gnb() {
  const location = useLocation();
  const theme = useTheme();
  const isDown730 = useMediaQuery(theme.breakpoints.down(730));

  return (
    <>
      {
        !gnbDisableUrl.map((e) => location.pathname.includes(e)).includes(true) ?
          isDown730 ?
            <MobileGnb /> :
            <PcGnb /> :
          isDown730 ?
            <div style={{ marginTop: -48 }} /> :
            <div style={{ marginTop: -80 }} />
      }
    </>
  );
}

export default Gnb;