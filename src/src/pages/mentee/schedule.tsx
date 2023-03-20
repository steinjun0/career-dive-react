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
            const startTime = new Date(apiRes.Date);
            startTime.setHours(+apiRes.StartTime.slice(0, apiRes.StartTime.indexOf(':')));
            startTime.setMinutes(+apiRes.StartTime.slice(apiRes.StartTime.indexOf(':') + 1));
            const endTime = new Date(apiRes.Date);
            endTime.setHours(+apiRes.EndTime.slice(0, apiRes.EndTime.indexOf(':')));
            endTime.setMinutes(+apiRes.EndTime.slice(apiRes.EndTime.indexOf(':') + 1));

            const consult: IConsult = {
              id: apiRes.ID,
              date: new Date(apiRes.Date),
              startTime: startTime,
              endTime: endTime,
              menteeId: apiRes.MenteeId,
              status: apiRes.Status,
              consultContentList: apiRes.ConsultContentList.map((apiContent) => {
                return {
                  id: apiContent.ID,
                  name: apiContent.Name,
                  type: apiContent.Type
                };
              }),
              company: apiRes.CompName,
              divisIsPub: apiRes.DivisIsPub,
              job: apiRes.JobInComp,
              nickname: apiRes.Nickname,
              inJob: apiRes.InService,
              duration: apiRes.TotEmpMonths,
            };
            return consult;
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
                  // API.getConsultMenteeList(localStorage.getItem('UserID'), status)
                  //   .then((res) => {
                  //     if (res.status === 200) {
                  //       setConsultList(res.data);
                  //     }
                  //   });
                }}></ConsultList>
            </Grid>
          </Grid>
        </CardsWrapper>
      </MaxWidthDiv>
    </GrayBackground>
  );
}

export default Schedule;
