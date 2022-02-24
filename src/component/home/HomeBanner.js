import { styled } from "@mui/material";
import {
  VerticalCenterAlignDiv,
  FullWidthWrapper,
  CenterWidthWrapper,
} from "../../util/styledComponent";

import SimpleMenu from "../../util/SimpleMenu";

import BannerIdCard1 from "../../assets/img/home/BannerIDCard-1.png";
import BannerIdCard2 from "../../assets/img/home/BannerIDCard-2.png";
import BannerSearchIcon from "../../assets/icon/bannerSearch.svg";

const HomeBannerFullWidthWrapper = styled(FullWidthWrapper)`
  height: 600px;
  background-color: white;
`;
const HomeBannerWrapper = styled(CenterWidthWrapper)`
  position: relative;
  height: 640px;
  overflow-x: clip;
`;

const FirstBannerIdCard = styled("img")`
  position: absolute;
  margin-top: -74px;
  width: 444px;
  right: 181px;
`;

const SecondBannerIdCard = styled("img")`
  position: absolute;
  margin-top: -96px;
  width: 444px;
  right: -123px;
`;

const SearchBar = styled(VerticalCenterAlignDiv)`
  width: 652px;
  height: 56px;
  justify-content: space-between;
  margin-top: 62px;
  border: 1px solid #828282;
  border-radius: 25px;
  padding: 0 10px 0 24px;
  box-shadow: 0px 8px 16px rgba(33, 33, 33, 0.05);
`;

const SearchBarSpan = styled("span")`
  color: #4f4f4f;
  font-size: 14px;
  font-weight: 500;
`;

const BannerTitle = styled("span")`
  font-size: 48px;
  margin-top: 151px;
  line-height: 64px;
  font-weight: 700;
  color: #212121;
  text-align: start;
`;

function HomeBanner() {
  return (
    <HomeBannerFullWidthWrapper>
      <HomeBannerWrapper>
        <FirstBannerIdCard src={BannerIdCard1} alt="" />
        <SecondBannerIdCard src={BannerIdCard2} alt="" />
        <SearchBar>
          <VerticalCenterAlignDiv>
            <SearchBarSpan>직무</SearchBarSpan>
            <SimpleMenu
              title="직무를 선택하세요"
              menuItems={["개발", "기획", "디자인"]}
            ></SimpleMenu>
          </VerticalCenterAlignDiv>
          <VerticalCenterAlignDiv>
            <SearchBarSpan>회사</SearchBarSpan>
            <SimpleMenu
              title="회사를 선택하세요"
              menuItems={["네이버", "삼성전자", "JYP"]}
            ></SimpleMenu>
          </VerticalCenterAlignDiv>
          <VerticalCenterAlignDiv>
            <SearchBarSpan>태그</SearchBarSpan>
            <SimpleMenu
              title="태그를 선택하세요"
              menuItems={["취업준비", "이직", "사내 분위기"]}
            ></SimpleMenu>
          </VerticalCenterAlignDiv>
          <img src={BannerSearchIcon} alt="" />
        </SearchBar>
        <BannerTitle>
          평소 만나고 싶던
          <br />
          현직자를 만나보세요
        </BannerTitle>
      </HomeBannerWrapper>
    </HomeBannerFullWidthWrapper>
  );
}

export default HomeBanner;
