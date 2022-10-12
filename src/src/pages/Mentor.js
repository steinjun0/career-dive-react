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
import HelpCategory from "component/mentor/HelpCategory";
import Introduction from "component/mentor/Introduction";

import { useEffect, useState } from "react";
import API from 'API';
import { useParams } from "react-router-dom";


const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
`;

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;


function Mentor() {

  const params = useParams();

  const [mentorData, setMentorData] = useState();
  const [nickName, setNickName] = useState('');
  const [consultContents, setConsultContents] = useState({})



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

            <MentorProfile name={nickName} discription={`${mentorData && mentorData.CompName} ${mentorData && mentorData.DivisIsPub ? `| ${mentorData && mentorData.DivisInComp}` : ''} | ${mentorData && mentorData.JobInComp}`} />
          </MetorProfileBanner>
        </MaxWidthDiv>
        <GrayBackground>
          {mentorData && mentorData.Nickname}

          <MaxWidthDiv>
            <CardsWrapper>
              <Grid container spacing={'30px'} marginTop={0}>
                <Grid container item xs={12} md={6}>
                  <Grid item xs={12} >
                    {mentorData &&
                      <HelpCategory
                        regularTags={[...mentorData.ConsultContents.filter((e) => e.Type === '일반').map((e) => e.Name)]}
                        premiumTags={[...mentorData.ConsultContents.filter((e) => e.Type === '프리미엄').map((e) => e.Name)]} />}
                    <Introduction introductionText={mentorData && mentorData.Introduction}></Introduction>
                    {/* <RatingAndReview></RatingAndReview> */}
                  </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container item spacing={2}>
                    <Grid item xs={12}>
                      <MentorCalendar></MentorCalendar>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardsWrapper>

          </MaxWidthDiv>
        </GrayBackground>
      </FullWidthWrapper>
    </div >
  );
}

export default Mentor;
