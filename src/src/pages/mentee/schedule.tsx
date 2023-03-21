import { Grid, styled } from "@mui/material";

import {
  GrayBackground,
  MaxWidthDiv,
  Flex
} from "util/styledComponent";

import OnComingShedule from "component/consult/OnComingSchedule";
import ConsultList from "component/consult/ConsultList";
import React, { useEffect, useState } from "react";
import * as apiConsult from "apis/consult";
import { IConsult, TConsultStatus } from "interfaces/consult";

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 154px;
`;

function Schedule() {
  const [consultList, setConsultList] = useState<IConsult[]>([]);
  const [reservationList, setReservationList] = useState<IConsult[]>([]);
  const [onComingList, setOnComingList] = useState<IConsult[]>([]);
  const [status, setStatus] = useState<TConsultStatus | ''>('');

  useEffect(() => {
    if (localStorage.getItem('UserID') !== null) {
      apiConsult.getConsultMenteeList(+localStorage.getItem('UserID')!, '')
        .then((res) => {
          const parsedConsultList: IConsult[] = res.data.map((apiRes) => {
            return apiConsult.convertIConsultAPI2IConsult(apiRes);
          });

          setConsultList(parsedConsultList);
          setReservationList(parsedConsultList.filter((e) => e.status === 'created'));
          setOnComingList(parsedConsultList.filter((e) => e.status === 'approved'));
        });
    }
  }, [status]);


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
                onCategoryChange={(newStatus: TConsultStatus) => {
                  setStatus(newStatus);
                }}></ConsultList>
            </Grid>
          </Grid>
        </CardsWrapper>
      </MaxWidthDiv>
    </GrayBackground>
  );
}

export default Schedule;
