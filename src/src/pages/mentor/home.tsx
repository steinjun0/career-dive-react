import { Grid, styled } from "@mui/material";

import {
  MaxWidthDiv,
  Flex,
  TextHeading5,
  VerticalFlex,
  colorTextLight,
  colorCareerDivePink
} from "util/styledComponent";

import OnComingShedule from "component/consult/OnComingSchedule";
import ConsultList from "component/consult/ConsultList";
import ConsultingRequest from "component/consult/ConsultingRequest";
import React, { useEffect, useState } from "react";
import API from "API.js";
import { useNavigate } from "react-router-dom";
import GuideLineMentorBook from "assets/img/home/GuidelineMentorBook.svg";
import { IConsult, TConsultStatus } from "interfaces/consult";
import * as apiConsult from "apis/consult";

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 154px;
`;

function MentorHome() {
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
    <VerticalFlex sx={{ backgroundColor: '#f8f8f8', alignItems: 'center' }}>
      <MaxWidthDiv>
        <CardsWrapper>
          <Grid container spacing={'30px'} marginTop={0}>
            <Grid item xs={6}>
              <OnComingShedule consultList={onComingList}></OnComingShedule>
            </Grid>
            <Grid item xs={6}>
              <Flex style={{
                justifyContent: 'space-between',
                backgroundColor: 'white', borderRadius: 8,
                padding: 24,
                height: '184px',
                cursor: 'pointer',
                boxShadow: '10px 20px 40px rgba(130, 130, 130, 0.1)'
              }}
                onClick={
                  () => {
                    window.open('https://www.notion.so/CBT-30539442ad874299a12b6e727de3a506#a1ad0076d52e456fa46601d031fa34b3');
                  }
                }
              >
                <VerticalFlex>
                  <TextHeading5 color={colorTextLight}>서비스 정책 및 가이드라인</TextHeading5>
                  <TextHeading5 color={colorCareerDivePink}>멘토편</TextHeading5>
                </VerticalFlex>
                <VerticalFlex
                  style={{ justifyContent: 'end' }}>
                  <img src={GuideLineMentorBook} alt="" />
                </VerticalFlex>
              </Flex>
            </Grid>
            <Grid item xs={12}>
              <ConsultingRequest reservationList={reservationList}></ConsultingRequest>
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
    </VerticalFlex>
  );
}

export default MentorHome;
