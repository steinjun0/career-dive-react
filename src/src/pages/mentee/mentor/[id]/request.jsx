import { Grid, styled } from "@mui/material";

import {
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex,
  EmptyHeight,
} from "util/styledComponent";

import MentorProfile from 'organism/mentor/Profile'
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import API from "API.js";
import MenteeCalendar from "component/calendar/MenteeCalendar";
import { getParsedLocalStorage } from "util/ts/util";
import SelectContent from "component/mentor/apply/SelectContent2";

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  width: calc(100% - 32px);
`;

const CardsWrapper = styled(Flex)({
  justifyContent: 'space-between',
  marginTop: '30px',
  maxWidth: '582px',
})

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
        startTime: getParsedLocalStorage('reservations')[+params.id].startTime ? new Date(getParsedLocalStorage('reservations')[+params.id].startTime) : null,
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
    <GrayBackground>
      <Flex sx={{ minWidth: '100vw', backgroundColor: 'white', justifyContent: 'center' }}>
        <MaxWidthDiv>
          {mentorData && <MentorProfile
            name={nickName}
            description={`${mentorData.CompName} ${mentorData.DivisIsPub ? `| ${mentorData.DivisInComp}` : ''} | ${mentorData.JobInComp}`}
            inService={mentorData.InService}
            id={mentorData.UserID} />}
        </MaxWidthDiv>
      </Flex>
      <MaxWidthDiv style={{ alignItems: 'center' }}>
        <CardsWrapper >
          {initialData !== undefined && <MenteeCalendar
            userId={+params.id}
            startDate={initialData.startTime}
            consultingTime={initialData.consultingTime}
            setIsFinished={setIsFinish}
          />}

        </CardsWrapper>
        <EmptyHeight height={(!isFinish || !mentorData) ? '158px' : '30px'} />
        {isFinish && mentorData && <SelectContent mentorConsultContents={mentorData.ConsultContents} />}
        <EmptyHeight height={(!isFinish || !mentorData) ? '0' : '30px'} />

      </MaxWidthDiv>
    </GrayBackground>
  );
}

export default MentoringReservation;
