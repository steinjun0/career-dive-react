import { Grid, styled, useMediaQuery, useTheme } from "@mui/material";

import {
  FullWidthWrapper,
  CenterWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import MentorProfile from 'component/mentor/Profile'
import HelpCategory from "component/mentor/HelpCategory";
import Introduction from "component/mentor/Introduction";

import { useEffect, useState } from "react";
import API from 'API';
import { useNavigate, useParams } from "react-router-dom";
import MenteeCalendar2 from "component/calendar/MenteeCalendar2";
import { CustomButton } from "util/Custom/CustomButton";
import FavoriteButton from "component/mentor/FavoriteButton";
import { getParsedLocalStorage } from "util/ts/util";


const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
`;

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
    <div>
      <FullWidthWrapper>
        <MaxWidthDiv>
          <MetorProfileBanner>
            {mentorData && <MentorProfile
              name={nickName}
              description={`${mentorData.CompName} ${mentorData.DivisIsPub ? `| ${mentorData.DivisInComp}` : ''} | ${mentorData.JobInComp}`}
              inService={mentorData.InService}
              id={mentorData.UserID} />}
          </MetorProfileBanner>
        </MaxWidthDiv>
        <GrayBackground>
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

                  <MenteeCalendar2
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

        </GrayBackground>
      </FullWidthWrapper>
      {
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
            onClick={() => { navigater(`/mentee/request/${+params.id}`) }}
          >
            상담 신청
          </CustomButton>
        </Flex>
      }

    </div >
  );
}

export default Mentor;
