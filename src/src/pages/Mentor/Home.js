import { Grid, styled } from "@mui/material";

import {
  FullWidthWrapper,
  GrayBackground,
  MaxWidthDiv,
  Flex,
  RowAlignCenterFlex,
  TextBody2,
  EmptyHeight,
  TextEllipsisContainer
} from "util/styledComponent";

import OnComingShedule from "component/consult/OnComingSchedule";
import ConsultList from "component/consult/ConsultList";
import ConsultingRequest from "component/consult/ConsultingRequest"
import { Card } from "util/Card";
import { ChevronRight } from "@material-ui/icons";
import CalendarMentor from "component/calendar/CalendarMentor";
import { useEffect, useState } from "react";
import API from "API";

const CardsWrapper = styled(Flex)`
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 154px;
`;

const dummyData = ['매드로봇님이 상담을 요청하였습니다.',
  '공부가싫어님이 상담을 요청하였습니다.',
  '멘토 여러분의 정보가 이제 블록체인으로 암호화 되어 보다 안전하게 이용 가능합니다! ellipsis testtesttest',
  '커리어다이브 클로즈드 베타 오픈 이벤트 🤙​']

function MentorHome() {

  const [consultList, setConsultList] = useState([])
  useEffect(async () => {
    const res = await API.getConsultMentorList(localStorage.getItem('UserID'), 'created')
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
                <OnComingShedule consultList={consultList}></OnComingShedule>
              </Grid>
              {/* <Grid item xs={6}>
                <Card
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
                </Card>
              </Grid> */}
              <Grid item xs={12}>
                <ConsultingRequest></ConsultingRequest>
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

export default MentorHome;
