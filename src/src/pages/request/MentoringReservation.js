import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex,
} from "util/styledComponent";

import MentorProfile from 'component/mentor/Profile'
import MentorCalendar from 'component/calendar/Calendar'
import SelectContent from 'component/mentor/apply/SelectContent'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "API";
import MenteeCalendar from "component/calendar/MenteeCalendar";
import MenteeCalendar2 from "component/calendar/MenteeCalendar2";
import { getParsedLocalStorage } from "util/ts/util";

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: column;
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
  const [mentorData, setMentorData] = useState();
  const [nickName, setNickName] = useState('');
  const [initialData, setInitialData] = useState()

  const [isFinish, setIsFinish] = useState(false)
  useEffect(() => {
  }, [isFinish])

  useEffect(() => {
    API.getAccountMentor(params.id).then((value) => {
      if (value.status === 200) {
        setMentorData(value.data)
      }
    })

    API.getAccount(params.id).then((value) => {
      if (value.status === 200) {
        setNickName(value.data.Nickname);
      }
    })
    if (getParsedLocalStorage('reservations') && getParsedLocalStorage('reservations')[+params.id]) {
      setInitialData({
        startTime: new Date(getParsedLocalStorage('reservations')[+params.id].startTime),
        consultingTime: getParsedLocalStorage('reservations')[+params.id].consultingTime,
      })
    } else {
      setInitialData({
        startTime: null,
        consultingTime: null,
      })
    }

  }, [])


  return (
    <div>
      <FullWidthWrapper>
        <MaxWidthDiv>
          <MetorProfileBanner>
            {mentorData &&
              <MentorProfile
                name={nickName}
                description={`${mentorData.CompName} ${mentorData.DivisIsPub ? `| ${mentorData.DivisInComp}` : ''} | ${mentorData.JobInComp}`}
                id={mentorData.UserID}
                inService={mentorData.InService}
              />}
          </MetorProfileBanner>
        </MaxWidthDiv>
        <GrayBackground >
          <CardsWrapper >
            {/* <MentorCalendar setIsFinish={setIsFinish}>
            </MentorCalendar> */}
            {/* <MenteeCalendar
                userId={+params.id}
                startDate={new Date(2023, 1, 9, 12, 30)}
                consultingTime={20}
                setIsFinished={setIsFinish}
              /> */}
            {initialData !== undefined && <MenteeCalendar2
              userId={+params.id}
              startDate={initialData.startTime}
              consultingTime={initialData.consultingTime}
              setIsFinished={setIsFinish}
            />}

          </CardsWrapper>
          {
            isFinish &&
            <CardsWrapper2>
              {mentorData && <SelectContent mentorConsultContents={mentorData.ConsultContents} />}
            </CardsWrapper2>
          }

        </GrayBackground>
      </FullWidthWrapper>
    </div>
  );
}

export default MentoringReservation;
