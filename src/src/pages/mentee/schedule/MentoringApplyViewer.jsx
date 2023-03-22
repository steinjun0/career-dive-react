import { Grid, styled } from "@mui/material";

import {
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import RequestView from "component/mentor/apply/RequestView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "API.js";
import React from 'react'

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


function MentoringReservation() {
  const params = useParams()

  const [consultData, setConsultData] = useState()
  const [menteeData, setMenteeData] = useState()
  const [mentorData, setMentorData] = useState()

  useEffect(() => {
    API.getConsult(params.id).then((res) => {
      if (res.status === 200) {
        setConsultData(res.data)
        const menteeId = res.data.MenteeID
        const mentorId = res.data.MentorID
        API.getAccountMentee(menteeId).then((res) => {
          if (res.status === 200) {
            setMenteeData(res.data)
          }
        })

        API.getAccountMentor(mentorId).then((res) => {
          if (res.status === 200) {
            setMentorData(res.data)
          }
        })
      }
    })
  }, [])



  return (
    <GrayBackground>
      <MaxWidthDiv>
        {/* <MetorProfileBanner>
            {mentorData && <MentorProfile
              name={mentorData.Nickname}
              description={`${mentorData.CompName} | ${mentorData.DivisIsPub ? mentorData.DivisInComp + ' |' : ''} ${mentorData.JobInComp}`}
              id={mentorData.UserID} />}
          </MetorProfileBanner> */}
      </MaxWidthDiv>
      <CenterWidthWrapper>
        <Grid container spacing={'30px'} marginTop={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            {/* <RequestView
                  menteeIntroduce={menteeIntroduce}
                  requestContent={requestContent}
                  urlLink={urlLink} /> */}
            {consultData !== undefined &&
              <RequestView
                consultData={consultData}
                menteeIntroduce={menteeData && menteeData.Introduction}
                urlLink={menteeData && menteeData.Link}
                style={{ width: '100%', padding: 24 }} />}

          </Grid>
        </Grid>
        <CardsWrapper>
        </CardsWrapper>
      </CenterWidthWrapper>
    </GrayBackground>
  );
}

export default MentoringReservation;
