import { styled } from "@mui/material";
import {
  VerticalCenterAlignDiv,
  Flex,
  VerticalFlex,
  colorCareerDiveBlue,
} from "../util/styledComponent";

import speechBubble from "../assets/icon/speechBubble.svg";

const FooterFullWidthWrapper = styled(Flex)`
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  height: 188px;
  width: 100%;
  background-color: white;
  padding-top: 26px;
`;

const FooterTop = styled(Flex)`
  height: 152px;
  width: 100%;
  justify-content: center;
`;

const FooterBottom = styled(Flex)`
  height: 36px;
  width: 100%;
  background-color: ${colorCareerDiveBlue};
  justify-content: center;
`;

const FooterWrapper = styled(VerticalCenterAlignDiv)`
  flex-direction: row;
  justify-content: start;
  height: 96px;
  width: 100%;
  max-width: 1194px;
`;

const FooterBottomWrapper = styled(VerticalCenterAlignDiv)`
  justify-content: space-between;
  width: 100%;
  max-width: 1194px;
  font-size: 12px;
  color:white;
`;

const ColumnSet = styled(VerticalFlex)`
  align-items:start;
  justify-content: space-between;
  width: 175px;
  height: 96px;
  font-size: 14px;
`;

const ColumnTitle = styled('span')`
  color: ${colorCareerDiveBlue};
  font-weight: 700;
`

const ContactCCudaButton = styled(VerticalCenterAlignDiv)`

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

function Footer() {
  return (
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
            <div>FAQ</div>
            <div>꾸다센터</div>
          </ColumnSet>
          <ContactCCudaButton>
            <SpeechBubbleIcon src={speechBubble} alt='speech-bubble' />
            꾸다에게 문의하기
          </ContactCCudaButton>
        </FooterWrapper>
      </FooterTop>
      <FooterBottom>
        <FooterBottomWrapper>
          <div>(주)꾸다, 사업자 등록 번호: 876-22-01034, 통신판매업 등록번호</div>
          <div>Copyright 2022, (주)꾸다, AllRights reserved.</div>
        </FooterBottomWrapper>
      </FooterBottom>
    </FooterFullWidthWrapper>
  );
}

export default Footer;
