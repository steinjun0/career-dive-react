import { styled } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv
} from "../util/styledComponent";

import MentorProfile from '../component/mentor/Profile'
import MentorCalendar from '../component/mentor/Calendar'
import HelpCategory from "../component/mentor/HelpCategory";

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
`;

const MentorCalendarWrapper = styled('div')`
  margin-top: 30px;
  margin-bottom: 30px;
`;

function Mentor() {
  return (
    <div>
      <FullWidthWrapper>
        <MetorProfileBanner>
          <MentorProfile name={'다슬기'} discription={'(주)다파다 | 무선사업부 | 디자이너'} />
        </MetorProfileBanner>
        <GrayBackground>
          <MaxWidthDiv>
            <MentorCalendarWrapper>
              <MentorCalendar></MentorCalendar>
            </MentorCalendarWrapper>
            <HelpCategory></HelpCategory>
          </MaxWidthDiv>
        </GrayBackground>
      </FullWidthWrapper>
    </div>
  );
}

export default Mentor;
