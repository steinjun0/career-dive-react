import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex,
  TextHeading6,
  LinkNoDeco
} from "util/styledComponent";

import SideNavigation from "component/myPage/SideNavigation";
import UserProfile from "component/myPage/UserProfile";
import MenteeIntroduce from "component/myPage/MenteeIntroduce";
import AccountInfo from 'component/myPage/AccountInfo'
import ReceiveAgreement from 'component/myPage/ReceiveAgreement'
import AccountInfoChange from 'component/myPage/AccountInfoChange'

import { useLocation, useParams } from "react-router-dom";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CareerInfo from "component/myPage/CareerInfo";
import MentorIntroduce from "component/myPage/MentorIntroduce";
import CareerInfoChange from "component/myPage/\bCareerInfoChange";
import { isMentorUrl } from "util/util";
const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;

const SideNavigationWrapper = styled(Flex)`
  width: 276px;
`

const MoveBackButtonWrapper = styled(Flex)`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: white;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  margin-top: -2px;
`

function MyPage() {
  const params = useParams();
  const location = useLocation();
  const isInAccountChange = () => location.pathname.includes('/account/change');
  const isHidingSideNavigation = () => {
    const hideUrlList = ['/account/change', '/mentor/mypage/career/change']
    let result = false;
    hideUrlList.forEach((url) => {
      if (location.pathname.includes(url)) {
        result = true
      }
    })
    return result
  }
  return (
    <FullWidthWrapper>
      <GrayBackground>
        <MaxWidthDiv>
          <CardsWrapper>
            <Grid container spacing={'30px'} marginTop={0}>
              <Grid item xs={3}>
                {
                  !isHidingSideNavigation() &&
                  <SideNavigationWrapper>
                    <SideNavigation />
                  </SideNavigationWrapper>
                }
                {
                  isHidingSideNavigation() &&
                  <div>
                    <SideNavigationWrapper>
                      <LinkNoDeco to={`/${isMentorUrl() ? 'mentor/mypage/profile' : 'mentee/mypage/account'}`}>
                        <MoveBackButtonWrapper>
                          <ChevronLeftIcon />
                        </MoveBackButtonWrapper>
                        <TextHeading6>마이페이지</TextHeading6>
                      </LinkNoDeco>
                    </SideNavigationWrapper>
                  </div>
                }
              </Grid>
              <Grid item xs={9}>
                {
                  params.subPage === 'profile' &&
                  <div>
                    <UserProfile />
                    <CareerInfo />
                    <MentorIntroduce />
                  </div>
                }
                {
                  params.subPage === 'account' &&
                  <div>
                    <AccountInfo />
                    <ReceiveAgreement />
                  </div>
                }
                {
                  isInAccountChange() &&
                  <div>
                    <AccountInfoChange />
                  </div>
                }
                {
                  location.pathname.includes('/mentor/mypage/career/change') &&
                  <div>
                    <CareerInfoChange />
                  </div>
                }
              </Grid>
            </Grid>
          </CardsWrapper>
        </MaxWidthDiv>
      </GrayBackground>
    </FullWidthWrapper>
  );
}

export default MyPage;
