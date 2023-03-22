import { Grid, styled, useMediaQuery, useTheme } from "@mui/material";

import {
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import MentorProfile from 'organism/mentor/Profile'
import HelpCategory from "component/mentor/HelpCategory";
import Introduction from "component/mentor/Introduction";

import React, { useEffect, useState } from "react";
import API from 'API';
import { useNavigate, useParams } from "react-router-dom";
import MenteeCalendar from "component/calendar/MenteeCalendar";
import { getParsedLocalStorage } from "util/ts/util";


const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 154px;
`;


function Mentor() {
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  const params = useParams();
  const navigater = useNavigate();

  const [mentorData, setMentorData] = useState();
  const [nickName, setNickName] = useState('');


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
      <MaxWidthDiv>
        <CardsWrapper>
          <Grid container spacing={isDownMd ? '24px' : '30px'} marginTop={0} paddingTop={0}>
            <Grid container item spacing={isDownMd ? '24px' : '30px'} xs={12} md={6} direction="column">
              <Grid item>
                {mentorData && mentorData.ConsultContents ?
                  <HelpCategory
                    regularTags={[...mentorData.ConsultContents.filter((e) => e.Type === '커리어 상담').map((e) => e.Name)]}
                    premiumTags={[...mentorData.ConsultContents.filter((e) => e.Type === '전형 준비').map((e) => e.Name)]} />
                  :
                  <HelpCategory
                    regularTags={[]}
                    premiumTags={[]} />
                }
              </Grid>
              <Grid item>
                <Introduction introductionText={mentorData && mentorData.Introduction}></Introduction>
              </Grid>
              {/* <Grid item xs={12}>
                    <RatingAndReview></RatingAndReview>
                  </Grid> */}
            </Grid>
            <Grid item xs={12} md={6}>

              <MenteeCalendar
                userId={+params.id}
                consultingTime={
                  (getParsedLocalStorage('reservations') ?? null) &&
                  (getParsedLocalStorage('reservations')[+params.id] ?? null) &&
                  getParsedLocalStorage('reservations')[+params.id]['consultingTime']
                }
                startDate={
                  (getParsedLocalStorage('reservations') ?? null) &&
                  (getParsedLocalStorage('reservations')[+params.id] ?? null) &&
                  (getParsedLocalStorage('reservations')[+params.id]['startTime'] ?? null) &&
                  new Date(getParsedLocalStorage('reservations')[+params.id]['startTime'])
                }
              />
            </Grid>
          </Grid>
        </CardsWrapper>
      </MaxWidthDiv>

      {/* {
        isDownMd &&
        <Flex
          style={{
            position: 'fixed',
            zIndex: 10,
            bottom: 0,
            padding: '8px 16px',
            heihgt: '84px',
            backgroundColor: 'white',
            width: '100vw',
            filter: 'drop-shadow(0px -20px 40px rgba(130, 130, 130, 0.1))'
          }}
        >
          <FavoriteButton
            menteeId={+localStorage.getItem('UserID')}
            mentorId={+params.id}
          />
          <CustomButton
            style={{ width: '100%', marginLeft: '8px', marginRight: '32px' }}
            onClick={() => { navigater(`/mentee/mentor/${params.id}/request`) }}
          >
            상담 신청
          </CustomButton>
        </Flex>
      } */}

    </GrayBackground >
  );
}

export default Mentor;
