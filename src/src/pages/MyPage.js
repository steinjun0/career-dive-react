import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "../util/styledComponent";

import SideNavigation from "../component/myPage/SideNavigation";
import UserProfile from "../component/myPage/UserProfile";
import MenteeIntroduce from "../component/myPage/MenteeIntroduce";
import { useParams } from "react-router-dom";

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;

const CardWrapper = styled(Flex)`
  margin-bottom: 38px;
`;

const SideNavigationWrapper = styled(Flex)`
  width: 276px;
  height: 288px;
`

function MyPage() {
  const params = useParams();
  return (
    <FullWidthWrapper>
      <GrayBackground>
        <MaxWidthDiv>
          <CardsWrapper>
            <Grid container spacing={'30px'} marginTop={0}>
              <Grid item xs={3}>
                <SideNavigationWrapper>
                  <SideNavigation />
                </SideNavigationWrapper>
              </Grid>
              <Grid item xs={9}>
                {
                  params.subPage === 'profile' &&
                  <div>
                    <UserProfile />
                    <MenteeIntroduce />
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