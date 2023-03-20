import { Grid, styled } from "@mui/material";

import {
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import OnComingShedule from "component/consult/OnComingSchedule";
import ConsultList from "component/consult/ConsultList";
import React, { useEffect, useState } from "react";
import API from "API"

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 154px;
`;

function Schedule() {
  const [consultList, setConsultList] = useState([])
  const [reservationList, setReservationList] = useState([])
  const [onComingList, setOnComingList] = useState([])
  useEffect(() => {
    const res = API.getConsultMenteeList(localStorage.getItem('UserID'), '')
    res.then(() => {
      setConsultList(res.data)
      setReservationList(res.data.filter((e) => e.Status === 'created'))
      setOnComingList(res.data.filter((e) => e.Status === 'approved'))
    })
  }, [])


  return (
    <GrayBackground>
      <MaxWidthDiv>
        <CardsWrapper>
          <Grid container spacing={'30px'} marginTop={0}>
            <Grid item xs={12}>
              <OnComingShedule consultList={onComingList}></OnComingShedule>
            </Grid>
            <Grid item xs={12}>
              <ConsultList
                consultList={consultList}
                onCategoryChange={(category) => {
                  API.getConsultMenteeList(localStorage.getItem('UserID'), category).then((res) => {
                    if (res.status === 200) {
                      setConsultList(res.data)
                    }
                  })
                }}></ConsultList>
            </Grid>
          </Grid>
        </CardsWrapper>
      </MaxWidthDiv>
    </GrayBackground>
  );
}

export default Schedule;
