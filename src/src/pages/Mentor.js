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

  const [mentorData, setMentorData] = useState({});
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

    API.getAccountConsultContent('일반').then((res) => {
      if (res.stauts === 200) {
        console.log(res.data)
        setConsultContents(Object.assign(consultContents, { regular: res.data }))
      }
    })

    API.getAccountConsultContent('프리미엄').then((res) => {
      if (res.stauts === 200) {
        console.log(res.data)
        setConsultContents(Object.assign(consultContents, { premium: res.data }))
      }
    })

  }, [])

  useEffect(() => {
    console.log('mentorData', mentorData)
  }, [mentorData])


  return (
    <div>
      <FullWidthWrapper>
        <MaxWidthDiv>
          <MetorProfileBanner>

            <MentorProfile name={nickName} discription={`${mentorData.CompName} | ${mentorData.DivisInComp} | ${mentorData.Job}`} />
          </MetorProfileBanner>
        </MaxWidthDiv>
        <GrayBackground>
          {mentorData.Nickname}

          <MaxWidthDiv>
            <CardsWrapper>
              <Grid container spacing={'30px'} marginTop={0}>
                <Grid container item xs={12} md={6}>
                  <Grid item xs={12} >
                    <HelpCategory ></HelpCategory>
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
