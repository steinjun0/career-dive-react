import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import OnComingShedule from "component/schedule/OnComingSchedule";
import ConsultList from "component/schedule/ConsultList";
import { useEffect, useState } from "react";
import API from "API";

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;

function Schedule() {
  const [consultList, setConsultList] = useState([])
  useEffect(async () => {
    const res = await API.getConsultMenteeList(localStorage.getItem('UserID'), 'created')
    if (res.status === 200) {
      setConsultList(res.data)
      console.log('consultList', res.data)
    }
  }, [])


  return (
    <FullWidthWrapper>
      <GrayBackground>
        <MaxWidthDiv>
          <CardsWrapper>
            <Grid container spacing={'30px'} marginTop={0}>
              <Grid item xs={12}>
                <OnComingShedule></OnComingShedule>
              </Grid>
              <Grid item xs={12}>
                <ConsultList consultList={consultList}></ConsultList>
              </Grid>
            </Grid>
          </CardsWrapper>
        </MaxWidthDiv>
      </GrayBackground>
    </FullWidthWrapper>
  );
}

export default Schedule;
