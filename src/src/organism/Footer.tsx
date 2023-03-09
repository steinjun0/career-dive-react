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
  colorBackgroundGrayDark,
  TextCaption,
  colorTextBody,
} from "util/styledComponent";

import speechBubble from "../assets/icon/speechBubble.svg";



const ContactCCudaButton = styled(RowAlignCenterFlex)({
  justifyContent: 'center',
  backgroundColor: colorCareerDiveBlue,
  borderRadius: '16px',
  height: '32px',
  width: '100%',
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

function SupportButton() {
  return (
    <ContactCCudaButton onClick={
      () => {
        window.open('http://pf.kakao.com/_xhHtxlxj/chat');
      }
    }>
      <SpeechBubbleIcon src={speechBubble} alt='speech-bubble' />
      문의하기
    </ContactCCudaButton>
  );
}

function FooterTop(props: { items: { title: string, value: { name: string, link: string; }[]; }[]; }) {
  function Column(props: { title: string, value: { name: string, link: string; }[]; }) {
    return (
      <VerticalFlex sx={{ justifyContent: 'space-between', width: '120px', gap: '14px' }}>
        <span style={{ fontWeight: 700, fontSize: '14px' }}>{props.title}</span>
        {props.value.map((e, i) => {
          return <span key={i} style={{ color: colorTextBody, fontSize: '14px', lineHeight: '24px' }}>{e.name}</span>;
        })}
      </VerticalFlex>
    );
  }
  return (
    <Flex sx={{ width: '100%', justifyContent: 'space-between', padding: '36px 16px ' }}>
      <Flex sx={{ gap: '48px' }}>
        {props.items.map((item, i) => {
          return <Column key={i} title={item.title} value={item.value} />;
        })}

      </Flex>
      <Flex sx={{ width: '133px' }}>
        <SupportButton />
      </Flex>

    </Flex>
  );
}

function MobileFooterTop(props: { items: { title: string, value: { name: string, link: string; }[]; }[]; }) {

  function Row(props: { title: string, value: { name: string, link: string; }[]; }) {
    return (
      <Flex sx={{ justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, fontSize: '12px' }}>{props.title}</span>
        <Flex sx={{ gap: '8px' }}>
          {props.value.map((e, i) => {
            return <TextCaption color={colorBackgroundGrayDark} key={i}>{e.name}</TextCaption>;
          })}
        </Flex>
      </Flex>
    );
  }

  return (
    <VerticalFlex sx={{ color: colorBackgroundGrayDark, width: '100%', gap: '8px', padding: '16px' }}>
      {props.items.map((item, i) => {
        return <Row key={i} title={item.title} value={item.value} />;
      })}
      <SupportButton />
    </VerticalFlex>
  );
}

function FooterBottom() {
  return (
    <Flex sx={{
      justifyContent: 'space-between', width: '100%', borderTop: `1px solid ${colorBackgroundGrayMedium}`,
      fontSize: '12px', color: colorTextLight,
      padding: '14px 16px',
    }}>
      <div>artisd.studio, 사업자 등록 번호: 876-22-01034, 대표자: 김인종</div>
      <div>Copyright 2022, 커리어다이브, All Rights Reserved.</div>
    </Flex>
  );
}

function MobileFooterBottom() {
  return (
    <VerticalFlex sx={{ width: '100%', padding: '14px 16px', borderTop: `1px solid ${colorBackgroundGrayMedium}` }}>
      <VerticalFlex sx={{
        justifyContent: 'space-between',
        fontSize: '12px', color: colorBackgroundGrayDark,

      }}>
        <div>artisd.studio, 사업자 등록 번호: 876-22-01034, 대표자: 김인종</div>
        <div>Copyright 2022, 커리어다이브, All Rights Reserved.</div>
      </VerticalFlex>
    </VerticalFlex>
  );
}

function Footer() {
  const { pathname } = useLocation();
  const theme = useTheme();
  const isDown730 = useMediaQuery(theme.breakpoints.down(730));

  return (
    <Flex id='footer' sx={{ justifyContent: 'center', width: '100%', backgroundColor: 'white' }}>
      {!footerDisableUrl.map((e) => pathname.includes(e)).includes(true) &&
        <VerticalFlex sx={{
          justifyContent: 'center', alignValue: 'center', width: '100%',
          maxWidth: 'calc(1192px + 32px)', backgroundColor: 'white',

        }}>
          {
            isDown730 ?
              <>
                <MobileFooterTop
                  items={[
                    { title: "Company", value: [{ name: '기업소개', link: '' }, { name: '공지사항', link: '' }] },
                    { title: "Policy", value: [{ name: '이용약관', link: '' }, { name: '개인정보처리방침', link: '' }] },
                    { title: "Support", value: [{ name: '커다센터', link: '' }, { name: 'FAQ', link: '' }] },
                  ]}
                />
                <MobileFooterBottom />
              </> :
              <>
                <FooterTop
                  items={[
                    { title: "COMPANY", value: [{ name: '기업소개', link: '' }, { name: '공지사항', link: '' }] },
                    { title: "POLICY", value: [{ name: '이용약관', link: '' }, { name: '개인정보처리방침', link: '' }] },
                    { title: "SUPPORT", value: [{ name: '커다센터', link: '' }, { name: 'FAQ', link: '' }] },
                  ]}
                />
                <FooterBottom />
              </>
          }
        </VerticalFlex>
      }
    </Flex >

  );
}

export default Footer;
