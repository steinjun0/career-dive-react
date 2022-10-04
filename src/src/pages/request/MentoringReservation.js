import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import MentorProfile from 'component/mentor/Profile'
import MentorCalendar from 'component/calendar/Calendar'
import SelectContent from 'component/mentor/apply/SelectContent'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const params = useParams();

  const [isFinishSet, setIsFinishSet] = useState(false)
  useEffect(() => {
    // console.log(isFinishSet)
  }, [isFinishSet])

  return (
    <div>
      <FullWidthWrapper>
        <MaxWidthDiv>
          <MetorProfileBanner>
            <MentorProfile name={'다슬기'} discription={'(주)다파다 | 무선사업부 | 디자이너'} />
          </MetorProfileBanner>
        </MaxWidthDiv>
        <GrayBackground >
          <CenterWidthWrapper>
            <CardsWrapper >
              <MentorCalendar setIsFinishSet={setIsFinishSet}>
              </MentorCalendar>
            </CardsWrapper>

            {
              isFinishSet &&
              <CardsWrapper2>
                <SelectContent >
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