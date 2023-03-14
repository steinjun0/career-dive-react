import { Grid, styled } from "@mui/material";

import {
  CenterWidthWrapper,
  GrayBackground,
  Flex
} from "util/styledComponent";

import MentorProfile from 'component/mentor/Profile'
import Request from "component/mentor/apply/Request";
import RequestBasic from "component/mentor/apply/RequestBasic";
import RequestPremium from "component/mentor/apply/RequestPremium";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "API";

const MetorProfileBanner = styled(CenterWidthWrapper)`
  height: 200px;
  flex-direction: row;
  align-items: center;
  background-color: white;
  width: '100%';
`;

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 158px;
  width: 582px;
`;


function MentoringReservation() {
  const params = useParams()
  const [mentorData, setMentorData] = useState()
  useEffect(() => {
    API.getAccountMentor(params.id).then((value) => {
      if (value.status === 200) {
        setMentorData(value.data)
      }
    })
  }, [])

  return (
    <GrayBackground sx={{ overflow: 'visible' }}>
      <Flex sx={{ minWidth: '100vw', backgroundColor: 'white', justifyContent: 'center' }}>
        <MetorProfileBanner>
          {mentorData && <MentorProfile
            name={mentorData.Nickname}
            description={`${mentorData.CompName} ${mentorData.DivisIsPub ? `| ${mentorData.DivisInComp}` : ''} | ${mentorData.JobInComp}`}
            id={mentorData.UserID}
            inService={mentorData.InService}
          />}
        </MetorProfileBanner>
      </Flex>
      <CenterWidthWrapper>
        <Grid container spacing={'30px'} marginTop={0}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

            <Request type={params.type} />
            {/* {params.type === 'careerConsult' && <RequestBasic />}
                {params.type === 'prepare' && <RequestPremium />} */}
          </Grid>
        </Grid>
        <CardsWrapper>
        </CardsWrapper>
      </CenterWidthWrapper>
    </GrayBackground>
  );
}

export default MentoringReservation;
