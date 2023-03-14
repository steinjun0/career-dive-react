import { Grid, styled } from "@mui/material";

import {
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

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
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

  return (
    <GrayBackground>
      <MaxWidthDiv>
        <CardsWrapper>
          <Grid container spacing={'30px'} marginTop={0}>
            <Grid item xs={3}>
              {
                !isInAccountChange() &&
                <SideNavigationWrapper>
                  <SideNavigation />
                </SideNavigationWrapper>
              }
              {
                isInAccountChange() &&
                <div>
                  <SideNavigationWrapper>
                    <LinkNoDeco to={'/mentee/mypage/account'}>
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
                  <MenteeIntroduce />
                </div>
              }
              {
                params.subPage === 'account' &&
                <div>
                  <AccountInfo />
                  {/* <ReceiveAgreement /> */}
                </div>
              }
              {
                isInAccountChange() &&
                <div>
                  <AccountInfoChange />
                </div>
              }
            </Grid>
          </Grid>
        </CardsWrapper>
      </MaxWidthDiv>
    </GrayBackground>
  );
}

export default MyPage;
