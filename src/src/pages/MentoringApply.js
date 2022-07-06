import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import MentorProfile from 'component/mentor/Profile'
import MentorCalendar from 'component/mentor/Calendar'
import { useLocation } from "react-router-dom";
import { useState } from "react";

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
`;

const MentorCalendarWrapper = styled('div')`
  margin-top: 30px;
  margin-bottom: 30px;
`;

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
  width: 582px;
`;


function Mentor() {
  const location = useLocation();
  const [isFinishSet, setIsFinishSet] = useState(false)
  return (
    <div>
      <FullWidthWrapper>
        <MaxWidthDiv>
          <MetorProfileBanner>
            <MentorProfile name={'다슬기'} discription={'(주)다파다 | 무선사업부 | 디자이너'} />
          </MetorProfileBanner>
        </MaxWidthDiv>
        <GrayBackground>
          <CenterWidthWrapper>
            <CardsWrapper>
              <MentorCalendar setIsFinishSet={setIsFinishSet}>
              </MentorCalendar>
            </CardsWrapper>

          </CenterWidthWrapper>
        </GrayBackground>
      </FullWidthWrapper>
    </div>
  );
}

export default Mentor;
