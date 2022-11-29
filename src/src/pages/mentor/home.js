import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex,
  RowAlignCenterFlex,
  TextBody2,
  EmptyHeight,
  TextEllipsisContainer,
  TextSubtitle1,
  TextSubtitle2,
  TextHeading5,
  TextHeading6,
  colorCareerDiveBlue,
  VerticalFlex,
  colorTextLight,
  colorCareerDivePink
} from "util/styledComponent";

import OnComingShedule from "component/consult/OnComingSchedule";
import ConsultList from "component/consult/ConsultList";
import ConsultingRequest from "component/consult/ConsultingRequest"
import { Card } from "util/Card";
import { ChevronRight } from "@material-ui/icons";
import CalendarMentor from "component/calendar/CalendarMentor";
import { useEffect, useState } from "react";
import API from "API";
import { useNavigate } from "react-router-dom";
import GuideLineMentorBook from "assets/img/home/GuidelineMentorBook.svg"

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-bottom: 154px;
`;

const dummyData = ['매드로봇님이 상담을 요청하였습니다.',
  '공부가싫어님이 상담을 요청하였습니다.',
  '멘토 여러분의 정보가 이제 블록체인으로 암호화 되어 보다 안전하게 이용 가능합니다! ellipsis testtesttest',
  '커리어다이브 클로즈드 베타 오픈 이벤트 🤙​']

function MentorHome() {
  const navigater = useNavigate();
  const [consultList, setConsultList] = useState([])
  const [reservationList, setReservationList] = useState([])
  const [onComingList, setOnComingList] = useState([])
  useEffect(async () => {
    const res = await API.getConsultMentorList(localStorage.getItem('UserID'), '')
    if (res.status === 200) {
      setConsultList(res.data)
      res.data && setReservationList(res.data.filter((e) => e.Status === 'created'))
      res.data && setOnComingList(res.data.filter((e) => e.Status === 'approved'))
    }
  }, [])

  return (
    <FullWidthWrapper>
      <GrayBackground>
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
                      window.open('https://www.notion.so/CBT-c57283dae1fe4602ad25f2b6ba0419aa')
                    }
                  }
                >
                  <VerticalFlex>
                    <TextHeading5 color={colorTextLight}>서비스 정책 및 가이드라인</TextHeading5>
                    <TextHeading5 color={colorCareerDivePink}>멘티편</TextHeading5>
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
                  onCategoryChange={(category) => {
                    API.getConsultMentorList(localStorage.getItem('UserID'), category).then((res) => {
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
    </FullWidthWrapper>
  );
}

export default MentorHome;
