import { Divider, Grid, styled } from "@mui/material";
import ConsultMenteeCard from 'component/consult/ConsultMenteeCard.js'
import {
  Flex,
  TextBody2,
  colorCareerDiveBlue,
  EmptyHeight,
  LinkNoDeco,
  TextBody1,
  colorBackgroundGrayMedium,
  VerticalFlex,
} from "util/styledComponent";
import { Card } from "util/Card";

import testMentorImage from "../../assets/img/testMentorImage.png";
import ChevronRight from '@mui/icons-material/ChevronRight';

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "API";
import ConsultMentorCard from "./ConsultMentorCard";
import { onEnterSession } from "component/consult/consult"

const ScheduleListWrapper = styled(Flex)`
  width: 100%;
`;

// const ScheduleCard = styled(VerticalFlex)`
//   border: 1px solid ${colorBlueGray};
//   border-radius: 8px;
// `;


function ConsultList({ consultList }) {

  // const [consultList, setConsultList] = useState([])
  // useEffect(async () => {
  //   const res = await API.getConsultMenteeList(localStorage.getItem('UserID'), 'created')
  //   if (res.status === 200) {
  //     setConsultList(res.data)
  //     console.log('consultList', res.data)
  //   }
  // }, [])

  const navigater = useNavigate();
  const location = useLocation();

  // 생성된(created), 대기(pending), 승인(approved), 완료(done)
  const categoryToStatusConverter = {
    '전체': 'created',
    '예약 성공': 'approved',
    '예약 대기': 'pending',
    '예약 실패': 'done',
    '상담 완료': 'done'
  }
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
        {consultList && <VerticalFlex>
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
          <Divider style={{ color: colorBackgroundGrayMedium }} />
          <Grid container spacing={'30px'} marginTop={0}>
            {consultList && consultList.map((consult, index) => {
              if (category === '전체' || consult.Status === categoryToStatusConverter[category]) {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                    {location.pathname.includes('mentor') ?
                      <ConsultMentorCard
                        consult={consult}
                        requestFormOnClick={() => {
                          navigater(`/mentee/sessionList/form/${consult.ID}`)
                        }}
                        enterOnClick={() => {
                          onEnterSession({
                            navigater,
                            date: consult.Date,
                            startTime: consult.StartTime,
                            endTime: consult.EndTime,
                            consultId: consult.ID
                          })
                        }}
                      /> :
                      <ConsultMenteeCard
                        consult={consult}
                        requestFormOnClick={() => { navigater(`/mentee/sessionList/form/${consult.ID}`) }}
                        enterOnClick={() => {
                          onEnterSession({
                            navigater,
                            date: consult.Date,
                            startTime: consult.StartTime,
                            endTime: consult.EndTime,
                            consultId: consult.ID
                          })
                        }}
                      />
                    }
                  </Grid>

                );
              }

            })}
          </Grid>
        </VerticalFlex>}

      </Card>
    </ScheduleListWrapper>

  );
}

export default ConsultList;
