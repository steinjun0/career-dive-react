import { Divider, Grid, styled } from "@mui/material";
import ScheduleCard from 'component/schedule/ScheduleCard.js'
import {
  Flex,
  TextBody2,
  colorCareerDiveBlue,
  EmptyHeight,
  LinkNoDeco,
  TextBody1,
} from "util/styledComponent";
import { Card } from "util/Card";

import testMentorImage from "../../assets/img/testMentorImage.png";
import circleCalendarIcon from '../../assets/icon/circleCalendar.svg'
import ChevronRight from '@mui/icons-material/ChevronRight';

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ScheduleListWrapper = styled(Flex)`
  width: 100%;
`;

// const ScheduleCard = styled(VerticalFlex)`
//   border: 1px solid ${colorBlueGray};
//   border-radius: 8px;
// `;


function ScheduleList() {
  const calendarIcon = circleCalendarIcon;
  const testProfileIamge = testMentorImage;
  const navigater = useNavigate();

  const schedules = [
    { category: '예약 성공', date: '2022년 2월 18일', time: '오후 12시 20분', name: '다슬기', company: '(주)다파다', position: '루나' },
    { category: '예약 성공', date: '2022년 2월 5일', time: '오전 10시 40분', name: '고디', company: '(주)더퍼더', position: '루나' },
    { category: '예약 성공', date: '2022년 2월 3일', time: '오후 13시 40분', name: '은하수', company: '(주)삼성전자', position: '루나' },
    { category: '예약 대기', date: '2022년 1월 24일', time: '오후 12시 00분', name: 'RAM', company: '(주)SK하이닉스', position: '루나' },
    { category: '예약 대기', date: '2022년 1월 21일', time: '오전 11시 40분', name: '롤케익', company: '(주)삼립', position: '루나' },
    { category: '상담 완료', date: '2022년 1월 27일', time: '오후 18시 40분', name: '위즈원', company: '(주)CJ Ent.', position: '루나' },
    { category: '예약 실패', date: '2022년 1월 15일', time: '오후 15시 30분', name: '영박진', company: '(주)JYP', position: '루나' },
    { category: '상담 완료', date: '2022년 1월 2일', time: '오전 12시 40분', name: '고디', company: '(주)다파다', position: '루나' },
  ]

  const categories = ['전체', '예약 성공', '예약 대기', '예약 실패', '상담 완료']
  const [category, setCategory] = useState('전체');
  return (
    <ScheduleListWrapper>
      <Card no_divider={'true'} title={<LinkNoDeco to={'/mentor/schedule'}>내 상담 내역</LinkNoDeco>}
        titleHead={
          <LinkNoDeco to={'/mentor/schedule'}>
            <ChevronRight fontSize="medium" />
          </LinkNoDeco>
        }>
        <EmptyHeight height={'12px'} />
        <Flex>
          {categories.map((element, index) => {
            if (element === category) {
              return <TextBody1
                style={{ cursor: 'pointer', paddingBottom: '12px', marginRight: '24px', borderBottom: `3px solid ${colorCareerDiveBlue}` }}
                color={colorCareerDiveBlue}
                key={`${index}`}>
                {element}
              </TextBody1>;
            } else {
              return <TextBody1
                style={{ cursor: 'pointer', marginRight: '24px' }}
                is_selected={'false'}
                key={index}
                onClick={() => { setCategory(element) }}>
                {element}
              </TextBody1>;
            }
          })}
        </Flex>
        <Divider />
        <Grid container spacing={'30px'} marginTop={0}>
          {schedules.map((schedule, index) => {
            if (category === '전체' || schedule.category === category) {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                  <ScheduleCard schedule={schedule} requestFormOnClick={() => { navigater(`/mentee/mentor/mentoring/apply/viewer/1`) }}></ScheduleCard>
                </Grid>
              );
            }

          })}
        </Grid>
      </Card>
    </ScheduleListWrapper>

  );
}

export default ScheduleList;
