import { Divider, Grid, styled } from "@mui/material";
import ConsultMenteeCard from 'component/consult/ConsultMenteeCard';
import {
  Flex,
  TextBody2,
  colorCareerDiveBlue,
  EmptyHeight,
  TextBody1,
  colorBackgroundGrayMedium,
  VerticalFlex,
} from "util/styledComponent";
import { Card } from "util/Card";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConsultMentorCard from "../../component/consult/ConsultMentorCard";
import { onEnterSession } from "services/consult";
import React from "react";
import { IConsult } from "interfaces/consult";


function ConsultList({ consultList, onCategoryChange = (value) => { }, type }: { consultList: IConsult[], onCategoryChange: (value: any) => void, type: 'mentee' | 'mentor'; }) {

  const navigater = useNavigate();
  const location = useLocation();

  const categoryStatusConverter: { [key: string]: string | string[]; } = {
    '전체': ['approved', 'created', 'rejected', 'done', 'mentor_noshow', 'mentee_noshow', 'noshow'],
    '예약 성공': ['approved'],
    '예약 대기': ['created'],
    '예약 실패': ['rejected'],
    '상담 완료': ['done', 'mentor_noshow', 'mentee_noshow', 'noshow'],
    '': '전체',
    'approved': '예약 성공',
    'created': '예약 대기',
    'rejected': '예약 실패',
    'done': '상담 완료',
    'mentor_noshow': '상담 완료',
    'mentee_noshow': '상담 완료',
    'noshow': '상담 완료'
  };
  const categories = ['전체', '예약 성공', '예약 대기', '예약 실패', '상담 완료'];
  const [category, setCategory] = useState('전체');

  useEffect(() => {
    onCategoryChange(categoryStatusConverter[category]);
  }, [category]);

  return (
    <Card no_divider={'true'} title={'내 상담 내역'}>
      <VerticalFlex>
        <EmptyHeight height={'12px'} />
        <Flex>
          {categories.map((element, index) => {
            return <TextBody1
              sx={{
                cursor: 'pointer',
                paddingBottom: '12px',
                marginRight: '24px',
                borderBottom: element === category ? `3px solid ${colorCareerDiveBlue}` : undefined,
                color: element === category ? colorCareerDiveBlue : undefined
              }}
              key={`${index}`}
              onClick={() => { setCategory(element); }}
            >
              {element}
            </TextBody1>;
          })}
        </Flex>
        <Divider style={{ color: colorBackgroundGrayMedium }} />
        <Grid container spacing={'30px'} marginTop={0}>
          {(consultList?.filter(consult => {
            return categoryStatusConverter[category].includes(consult.status);
          }).length > 0) ?
            consultList.map((consult, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index}>
                  {type === 'mentor' ?
                    <ConsultMentorCard
                      consult={consult}
                      requestFormOnClick={(event) => {
                        navigater(`/mentee/schedule/${consult.id}`);
                      }}
                      changeOnClick={() => {
                        alert('기능 준비중입니다!');
                      }}
                      enterOnClick={() => {
                        onEnterSession(consult);
                      }
                      }
                    /> :
                    <ConsultMenteeCard
                      consult={consult}
                      requestFormOnClick={() => {
                        navigater(`/mentee/schedule/${consult.id}`);
                      }}
                      changeOnClick={() => {
                        alert('기능 준비중입니다!');
                      }}
                      enterOnClick={() => {
                        onEnterSession(consult);
                      }}
                    />
                  }
                </Grid>

              );
            })
            :
            <Grid item xs={12}>
              <Flex style={{ height: '52px', justifyContent: 'center', alignItems: 'center' }}>
                <TextBody2>
                  상담 내역이 없습니다
                </TextBody2>
              </Flex>
            </Grid>}

        </Grid>
      </VerticalFlex>

    </Card>

  );
}

export default ConsultList;
