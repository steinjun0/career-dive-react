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
  colorCareerDiveBlue
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
      setReservationList(res.data.filter((e) => e.Status === 'created'))
      setOnComingList(res.data.filter((e) => e.Status === 'approved'))
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
                {/* <Card
                  style={{ boxSizing: 'border-box', maxWidth: '100%' }}
                  no_divider={'true'}
                  title={'공지 및 알림'}
                  titleHead={
                    <ChevronRight fontSize="medium" />
                  }>
                  <EmptyHeight height={'20px'} />
                  {dummyData.map((elem, index) => {
                    if (index == dummyData.length - 1) {
                      return (<TextEllipsisContainer key={index}>
                        <TextBody2>{elem}</TextBody2>
                      </TextEllipsisContainer>)
                    } else {
                      return (<TextEllipsisContainer key={index}>
                        <TextBody2 style={{ marginBottom: 12 }}>{elem}</TextBody2>
                      </TextEllipsisContainer>
                      )
                    }
                  })}
                </Card> */}
                <Flex style={{ backgroundColor: colorCareerDiveBlue, padding: '24px', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => {
                    window.open('https://www.notion.so/CBT-30539442ad874299a12b6e727de3a506')
                  }}>
                  <TextHeading6 color="white" style={{ textDecoration: 'underline' }}>
                    서비스 정책 및 가이드라인<br />멘토편 >
                  </TextHeading6>
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
