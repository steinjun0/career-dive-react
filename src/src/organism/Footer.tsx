import { Divider, styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import {
  RowAlignCenterFlex,
  Flex,
  VerticalFlex,
  colorCareerDiveBlue,
  colorBackgroundGrayMedium,
  colorTextLight,
  LinkNoDeco,
} from "util/styledComponent";

import speechBubble from "../assets/icon/speechBubble.svg";

const FooterFullWidthWrapper = styled(Flex)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundColor: 'white',
});

const FooterTop = styled(Flex)({
  height: '172px',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

const FooterBottom = styled(Flex)({
  height: '46px',
  width: '100%',
  justifyContent: 'center',
  borderTop: `1px solid ${colorBackgroundGrayMedium}`,
});

const FooterWrapper = styled(RowAlignCenterFlex)({
  flexDirection: 'row',
  justifyContent: 'start',
  height: '100px',
  width: '100%',
  maxWidth: '1194px',
});

const FooterBottomWrapper = styled(RowAlignCenterFlex)({
  justifyContent: 'space-between',
  width: '100%',
  maxWidth: '1194px',
  fontSize: '12px',
  color: colorTextLight,
});

const ColumnSet = styled(VerticalFlex)({
  alignItems: 'start',
  justifyContent: 'space-between',
  width: '175px',
  height: '96px',
  fontSize: '14px',
});

const ColumnTitle = styled('span')({
  fontWeight: '700',
});

const ContactCCudaButton = styled(RowAlignCenterFlex)({
  justifyContent: 'center',
  backgroundColor: colorCareerDiveBlue,
  borderRadius: '16px',
  height: '32px',
  width: '194px',
  marginLeft: 'auto',
  marginBottom: 'auto',
  color: 'white',
  fontSize: '14px',
  cursor: 'pointer',
});

const SpeechBubbleIcon = styled('img')({
  marginTop: '2px',
  marginRight: '6px',
});

const footerDisableUrl = ['/login', '/signup', '/mentor/register', '/session', '/review'];


function Footer() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isDown730 = useMediaQuery(theme.breakpoints.down(730));


  return (
    <Flex id='footer'>
      {!footerDisableUrl.map((e) => pathname.includes(e)).includes(true) &&
        <FooterFullWidthWrapper>
          <FooterTop>
            <FooterWrapper>
              <ColumnSet>
                <ColumnTitle>COMPANY</ColumnTitle>
                <div>기업소개</div>
                <div>공지사항</div>
              </ColumnSet>
              <ColumnSet>
                <ColumnTitle>POLICY</ColumnTitle>
                <div>이용약관</div>
                <div>개인정보처리방침</div>
              </ColumnSet>
              <ColumnSet>
                <ColumnTitle>SUPPORT</ColumnTitle>
                <div style={{ cursor: 'pointer' }} onClick={() => {
                  if (JSON.parse(localStorage.getItem('IsMentorMode')!)) {
                    window.open('https://www.notion.so/CBT-30539442ad874299a12b6e727de3a506#a1ad0076d52e456fa46601d031fa34b3');
                  } else {
                    window.open('https://www.notion.so/CBT-c57283dae1fe4602ad25f2b6ba0419aa#c92e00a335c0443b986c70e77da7b5e1');
                  }
                }}>FAQ</div>
                <div>커다센터</div>
              </ColumnSet>
              <ContactCCudaButton onClick={
                () => {
                  window.open('http://pf.kakao.com/_xhHtxlxj/chat');
                }
              }>
                <SpeechBubbleIcon src={speechBubble} alt='speech-bubble' />
                문의하기
              </ContactCCudaButton>
            </FooterWrapper>
          </FooterTop>
          <FooterBottom>
            <FooterBottomWrapper>
              <div>artisd.studio, 사업자 등록 번호: 876-22-01034, 대표자: 김인종</div>
              <div>Copyright 2022, 커리어다이브, All Rights Reserved.</div>
            </FooterBottomWrapper>
          </FooterBottom>
        </FooterFullWidthWrapper>
      }
    </Flex>

  );
}

export default Footer;
