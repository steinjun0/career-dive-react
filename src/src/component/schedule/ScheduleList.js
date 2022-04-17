import { Button, Grid, styled } from "@mui/material";

import {
  VerticalFlex,
  Flex,
  CircleImg,
  TextBody2,
  TextSubtitle1,
  TextSubtitle2,
  colorBlueGray,
  colorCareerDiveBlue,
} from "util/styledComponent";
import { CustomButton } from 'util/CustomButton'
import { Card } from "util/Card";

import testMentorImage from "../../assets/img/testMentorImage.png";
import circleCalendarIcon from '../../assets/icon/circleCalendar.svg'
import { useState } from "react";

const ScheduleListWrapper = styled(Flex)`
  width: 100%;
`;

const ScheduleCard = styled(VerticalFlex)`
  border: 1px solid ${colorBlueGray};
  border-radius: 8px;
`;

const CategoryButton = styled(Button)`
  // styled-component props can't get boolean
  background-color: ${props => props.is_selected === 'true' ? 'rgba(105, 140, 255, 0.2)' : 'rgba(175, 175, 175, 0.1)'};
  color: ${props => props.is_selected === 'true' ? colorCareerDiveBlue : '#828282'};
  &:hover {
    background-color: ${props => props.is_selected === 'true' ? 'rgba(105, 140, 255, 0.2)' : 'rgba(175, 175, 175, 0.1)'};
    color: ${props => props.is_selected === 'true' ? colorCareerDiveBlue : '#828282'};
  }

  min-width: 0px;
  padding: 4px 10px;
  margin-right: 12px;
  border-radius: 16px;

  font-size: 16px;
  line-height: 24px;

  cursor: pointer;
`;

const ScheduleCardTop = styled(Flex)`
  border-bottom: 1px solid ${colorBlueGray};
  padding: 20px;
  align-items: start;
`;

const ScheduleDate = styled(TextBody2)`
  margin-bottom: 4px;
`

const ScheduleTime = styled(TextSubtitle1)`
  margin-bottom: 10px;
`

const ManageScheduleButton = styled(CustomButton)`
  font-size: 14px;
  width: 79px;
  height: 32px;
`;


const ScheduleCardBottom = styled(Flex)`
  padding: 20px;
`;

const ProfileImg = styled(CircleImg)`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const ContentWrapper = styled(VerticalFlex)`
  margin-left: 16px;
`;



function ScheduleList() {
  const calendarIcon = circleCalendarIcon;
  const testProfileIamge = testMentorImage;

  const schedules = [
    { category: '예약 성공', date: '2022년 2월 18일', time: '오후 12시 20분', name: '다슬기', company: '(주)다파다' },
    { category: '예약 성공', date: '2022년 2월 5일', time: '오전 10시 40분', name: '고디', company: '(주)더퍼더' },
    { category: '예약 성공', date: '2022년 2월 3일', time: '오후 13시 40분', name: '은하수', company: '(주)삼성전자' },
    { category: '예약 대기', date: '2022년 1월 24일', time: '오후 12시 00분', name: 'RAM', company: '(주)SK하이닉스' },
    { category: '예약 대기', date: '2022년 1월 21일', time: '오전 11시 40분', name: '롤케익', company: '(주)삼립' },
    { category: '상담 완료', date: '2022년 1월 27일', time: '오후 18시 40분', name: '위즈원', company: '(주)CJ Ent.' },
    { category: '예약 실패', date: '2022년 1월 15일', time: '오후 15시 30분', name: '영박진', company: '(주)JYP' },
    { category: '상담 완료', date: '2022년 1월 2일', time: '오전 12시 40분', name: '고디', company: '(주)다파다' },
  ]

  const categories = ['전체', '예약 성공', '예약 대기', '예약 실패', '상담 완료']
  const [category, setCategory] = useState('전체');
  return (
    <ScheduleListWrapper>
      <Card no_divider={'true'} title={'내 신청 내역'}>
        <Flex>
          {categories.map((element, index) => {
            if (element === category) {
              return <CategoryButton is_selected={'true'} key={`${index}`}>{element}</CategoryButton>;
            } else {
              return <CategoryButton is_selected={'false'} key={index} onClick={() => { setCategory(element) }}>{element}</CategoryButton>;
            }
          })}
        </Flex>
        <Grid container spacing={'30px'} marginTop={0}>
          {schedules.map((schedule, index) => {
            if (category === '전체' || schedule.category === category) {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
                  <ScheduleCard>
                    <ScheduleCardTop>
                      <img src={calendarIcon} alt="" />

                      <ContentWrapper>
                        <ScheduleDate>
                          {schedule.date}
                        </ScheduleDate>
                        <ScheduleTime>
                          {schedule.time}
                        </ScheduleTime>

                        <ManageScheduleButton background_color={'#f4f4f4'} custom_color={'#848484'} >
                          예약 관리
                        </ManageScheduleButton>

                      </ContentWrapper>
                    </ScheduleCardTop>

                    <ScheduleCardBottom>
                      <ProfileImg src={testProfileIamge}></ProfileImg>

                      <ContentWrapper>
                        <TextSubtitle2>
                          {schedule.name} 멘토
                        </TextSubtitle2>
                        <TextBody2>
                          {schedule.company}
                        </TextBody2>
                      </ContentWrapper>

                    </ScheduleCardBottom>
                  </ScheduleCard>
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
