import { styled, TextField } from "@mui/material";
import {
  RowAlignCenterFlex,
  FullWidthWrapper,
  CenterWidthWrapper,
  Flex,
  EmptyWidth,
} from "util/styledComponent";

import SimpleMenu from "util/SimpleMenu";

import BannerIdCard1 from "../../assets/img/home/BannerIDCard-1.png";
import BannerIdCard2 from "../../assets/img/home/BannerIDCard-2.png";
import BannerSearchIcon from "../../assets/icon/bannerSearch.svg";

const HomeBannerFullWidthWrapper = styled(FullWidthWrapper)`
  height: 450px;
  background-color: white;
`;
const HomeBannerWrapper = styled(Flex)`
  flex-direction: column;
  align-items: start;
  max-width: 1194px;
  width: 100%;
  position: relative;
  height: 640px;
  overflow-x: clip;
`;

const FirstBannerIdCard = styled("img")`
  position: absolute;
  margin-top: -214px;
  width: 444px;
  right: 181px;
`;

const SecondBannerIdCard = styled("img")`
  position: absolute;
  margin-top: -236px;
  width: 444px;
  right: -123px;
`;

const SearchBar = styled(RowAlignCenterFlex)`
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

const SearchBarTextField = styled(TextField)`
  font-size: 16px;
  color: #bdbdbd;
  width: 90px;
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

        {/* <SearchBar>
          <RowAlignCenterFlex>
            <SearchBarSpan>직무</SearchBarSpan>
            <EmptyWidth width={'6px'} />
            <SimpleMenu
              style={{ fontSize: 16 }}
              title="선택하세요"
              menuItems={["개발", "기획", "디자인"]}
            ></SimpleMenu>
          </RowAlignCenterFlex>

          <RowAlignCenterFlex>
            <SearchBarSpan>회사</SearchBarSpan>
            <EmptyWidth width={'14px'} />

            <SearchBarTextField
              placeholder="입력하세요"
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            ></SearchBarTextField>
          </RowAlignCenterFlex>

          <RowAlignCenterFlex>
            <SearchBarSpan>태그</SearchBarSpan>
            <EmptyWidth width={'14px'} />
            <SearchBarTextField
              placeholder="입력하세요"
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            ></SearchBarTextField>
          </RowAlignCenterFlex>

          <img src={BannerSearchIcon} alt="" />
        </SearchBar> */}

        <BannerTitle>
          평소 만나고 싶던
          <br />
          현직자를 만나보세요.
        </BannerTitle>

      </HomeBannerWrapper>
    </HomeBannerFullWidthWrapper>
  );
}

export default HomeBanner;
