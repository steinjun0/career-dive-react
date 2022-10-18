import { Flex, GrayBackground, TextHeading2, TextHeading5, VerticalFlex, colorCareerDiveBlue, TextHeading3, TextHeading6, EmptyHeight, colorBackgroundGrayMedium, TextBody2, EmptyWidth } from "util/styledComponent";
import MentorCard from "component/mentor/MentorCard";
import { useEffect, useState } from "react";
import API from "API";
import { Card } from "util/Card";
import CustomRating from "util/Rating";
import { Divider } from "@mui/material";
import { CustomCheckbox } from "util/Custom/CustomCheckbox";
import { CustomTextField } from "util/Custom/CustomTextField";
import CustomTextField1 from "util/Custom/CustomTextField1";
import { CustomTextArea } from "util/Custom/CustomTextArea";
import { CustomButton } from "util/Custom/CustomButton";

function Review() {
  const [mentorList, setMentorList] = useState()
  const [ratingValue, setRatingValue] = useState()
  const [checkListValue, setCheckListValue] = useState([
    false, false, false, false, false
  ])
  const [questionList, setQuestionList] = useState([
    '시간을 잘 지켜요',
    '설명이 자세해요',
    '궁금증이 해결됐어요',
    '사전 준비가 철저해요',
    '대화 매너가 좋아요'
  ])
  useEffect(() => {
    API.getAccountMentorList().then((res) => {
      if (res.status === 200) {
        setMentorList(res.data.Results)
      }
    })
  }, [])
  useEffect(() => {
    console.log('checkListValue', checkListValue)
  }, [...checkListValue.map(e => e[0])])


  return (
    <VerticalFlex >
      <GrayBackground style={{ minHeight: 'calc(100vh - 220px - 80px)' }}>
        <EmptyHeight height={'28px'} />
        <Card
          max_width={'582px'}
          title={
            <Flex>
              <TextHeading5 color={colorCareerDiveBlue}>카카오농사꾼</TextHeading5>
              <TextHeading5>님과의 상담 어떠셨나요?</TextHeading5>
            </Flex>
          }
        >
          <EmptyHeight height={'28px'} />
          <TextHeading6>만족도</TextHeading6>
          <EmptyHeight height={'28px'} />
          <CustomRating
            value={ratingValue}
            setValue={setRatingValue}
            size="51px"
            readOnly={false} />
          <EmptyHeight height={'28px'} />
          <Divider style={{ color: colorBackgroundGrayMedium }} />
          <EmptyHeight height={'28px'} />

          <TextHeading6>어떤 점이 만족스러웠나요?</TextHeading6>
          <EmptyHeight height={'28px'} />
          {checkListValue.map((e, i) => {
            return <VerticalFlex key={i}>
              <CustomCheckbox

                isChecked={e}
                onClick={() => {
                  let temp = [...checkListValue]
                  temp[i] = !temp[i]
                  setCheckListValue([...temp])
                }}>
                <EmptyWidth width='6px' />
                <TextBody2>
                  {questionList[i]}
                </TextBody2>
              </CustomCheckbox>
              <EmptyHeight height={'8px'} />
            </VerticalFlex>
          })}
          <EmptyHeight height={'28px'} />

          <CustomTextField1
            placeholder={'상담 경험을 작성해 주세요!(선택)'}
            minRows={10}
            style={{ minHeight: 140 }}
          />
          <EmptyHeight height={'28px'} />

          <CustomButton height={'48px'}>
            완료
          </CustomButton>
        </Card>
        <EmptyHeight height={'28px'} />

      </GrayBackground>
    </VerticalFlex>
  );
}

export default Review;
