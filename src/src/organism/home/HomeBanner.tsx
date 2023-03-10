import { styled, TextField } from "@mui/material";
import {
  RowAlignCenterFlex,
  Flex,
  colorTextTitle,
} from "util/styledComponent";

import SimpleMenu from "util/SimpleMenu";

import BannerIdCard1 from "../../assets/img/home/BannerIDCard-1.png";
import BannerIdCard2 from "../../assets/img/home/BannerIDCard-2.png";
import BannerSearchIcon from "../../assets/icon/bannerSearch.svg";
import React from "react";

const HomeBannerFullWidthWrapper = styled(Flex)({
  justifyContent: 'center',
  backgroundColor: 'white',
  height: '450px',
  '@media (max-width:614px)': {
    height: '180px',
  }
});

const HomeBannerWrapper = styled(Flex)({
  flexDirection: 'column',
  alignItems: 'start',
  maxWidth: '1194px',
  width: '100%',
  position: 'relative',
  height: '640px',
  overflowX: 'clip',
});

const FirstBannerIdCard = styled("img")({
  position: 'absolute',
  marginTop: '-214px',
  maxWidth: '444px',
  right: '181px',
  width: '40%',
  '@media (max-width:900px)': {
    right: '131px',
    width: '360px',
  },
  '@media (max-width:614px)': {
    marginTop: '-25px',
    right: '50px',
    width: '112px',
  }
});

const SecondBannerIdCard = styled("img")({
  position: 'absolute',
  marginTop: '-236px',
  maxWidth: '444px',
  right: '-123px',
  width: '40%',
  '@media (max-width:900px)': {
    right: '-100px',
    width: '360px',
  },
  '@media (max-width:614px)': {
    marginTop: '-36px',
    right: '-20px',
    width: '112px',
  }
});


const SearchBar = styled(RowAlignCenterFlex)({
  width: '652px',
  height: '56px',
  justifyContent: 'space-between',
  marginTop: '62px',
  border: '1px solid #828282',
  borderRadius: '25px',
  padding: '0 10px 0 24px',
  boxShadow: '0px 8px 16px rgba(33, 33, 33, 0.05)',
});

const SearchBarSpan = styled("span")({
  color: '#4f4f4f',
  fontSize: '14px',
  fontWeight: '500',
});

const SearchBarTextField = styled(TextField)({
  fontSize: '16px',
  color: '#bdbdbd',
  width: '90px',
});

const BannerTitle = styled("span")({
  fontSize: '48px',
  marginTop: '151px',
  lineHeight: '64px',
  fontWeight: '700',
  color: colorTextTitle,
  textAlign: 'start',
  marginLeft: '16px',
  zIndex: '2',
  backgroundColor: 'white',
  '@media (max-width:614px)': {
    marginTop: '63px',
    fontSize: '20px',
    lineHeight: '26px'
  }
});



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
          평소 만나고 싶던 <br />
          현직자를 만나보세요.
        </BannerTitle>

      </HomeBannerWrapper>
    </HomeBannerFullWidthWrapper>
  );
}

export default HomeBanner;
