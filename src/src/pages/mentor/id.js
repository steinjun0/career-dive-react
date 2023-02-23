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
import { useParams } from "react-router-dom";
import MenteeCalendar2 from "component/calendar/MenteeCalendar2";


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
  const downMd = useMediaQuery(theme.breakpoints.down('md'))
  const params = useParams();

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

  useEffect(() => {
    // console.log('mentorData', mentorData)
  }, [mentorData])


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
          <Flex sx={{ padding: '0 30px', [theme.breakpoints.down('md')]: { padding: '0 16px' } }}>
            <CardsWrapper>
              <Grid container spacing={downMd ? '16px' : '30px'} marginTop={0} paddingTop={0}>
                <Grid container item spacing={downMd ? '16px' : '30px'} xs={12} md={6} direction="column">
                  <Grid item >
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
                  <Grid container item spacing={2}>
                    <Grid item xs={12}>
                      <MenteeCalendar2 userId={+params.id} startDate={null} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardsWrapper>

          </Flex>
        </GrayBackground>
      </FullWidthWrapper>
    </div >
  );
}

export default Mentor;
