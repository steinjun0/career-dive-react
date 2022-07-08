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
import SelectContent from 'component/mentor/apply/SelectContent'
import { useLocation } from "react-router-dom";
import { useState } from "react";

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
`;

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 158px;
  width: 582px;
`;

const CardsWrapper2 = styled(Flex)`
  justify-content: space-between;
  margin-top: -128px;
  margin-bottom: 128px;
  width: 582px;
`;


function MentoringReservation() {
  const [applyInformation, setApplyInformation] = useState({ isFinishSet: false, consultingDate: '' })
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
              <MentorCalendar applyInformation={applyInformation} setApplyInformation={setApplyInformation}>
              </MentorCalendar>
            </CardsWrapper>

            {
              applyInformation['isFinishSet'] &&
              <CardsWrapper2>
                <SelectContent applyInformation={applyInformation}>
                </SelectContent>
              </CardsWrapper2>
            }

          </CenterWidthWrapper>
        </GrayBackground>
      </FullWidthWrapper>
    </div>
  );
}

export default MentoringReservation;
