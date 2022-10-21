import { Divider, styled } from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  RowAlignCenterFlex,
  Flex,
  VerticalFlex,
  colorCareerDiveBlue,
  colorBackgroundGrayMedium,
  colorTextLight,
} from "util/styledComponent";

import speechBubble from "../assets/icon/speechBubble.svg";

const FooterFullWidthWrapper = styled(Flex)`
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 218px;
  width: 100%;
  background-color: white;
`;

const FooterTop = styled(Flex)`
  height: 172px;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const FooterBottom = styled(Flex)`
  height: 46px;
  width: 100%;
  justify-content: center;
  border-top: 1px solid ${colorBackgroundGrayMedium};
`;

const FooterWrapper = styled(RowAlignCenterFlex)`
  flex-direction: row;
  justify-content: start;
  height: 100px;
  width: 100%;
  max-width: 1194px;
`;

const FooterBottomWrapper = styled(RowAlignCenterFlex)`
  justify-content: space-between;
  width: 100%;
  max-width: 1194px;
  font-size: 12px;
  color: ${colorTextLight};
`;

const ColumnSet = styled(VerticalFlex)`
  align-items:start;
  justify-content: space-between;
  width: 175px;
  height: 96px;
  font-size: 14px;
`;

const ColumnTitle = styled('span')`
  font-weight: 700;
`

const ContactCCudaButton = styled(RowAlignCenterFlex)`

  justify-content: center;

  background-color: ${colorCareerDiveBlue};
  border-radius: 16px;
  height: 32px;
  width: 194px;
  margin-left: auto;
  margin-bottom: auto;

  color: white;
  font-size: 14px;
`;

const SpeechBubbleIcon = styled('img')`
  margin-top: 2px;
  margin-right: 6px;
`;

const footerDisableUrl = ['/login', '/signup', '/mentor/register']

function Footer() {
  const { pathname } = useLocation();

  return (
    <Flex id='footer'>
      {!footerDisableUrl.includes(pathname) && <FooterFullWidthWrapper>
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
              <div>FAQ</div>
              <div>커다센터</div>
            </ColumnSet>
            <ContactCCudaButton>
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
      </FooterFullWidthWrapper>}
    </Flex>

  );
}

export default Footer;
