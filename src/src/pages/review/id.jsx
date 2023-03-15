import { Flex, GrayBackground, TextHeading2, TextHeading5, VerticalFlex, colorCareerDiveBlue, TextHeading3, TextHeading6, EmptyHeight, colorBackgroundGrayMedium, TextBody2, EmptyWidth } from "util/styledComponent";
import React, { useEffect, useState } from "react";
import API from "API";
import { Card } from "util/Card";
import CustomRating from "util/Rating";
import { Divider } from "@mui/material";
import { CustomCheckbox } from "util/Custom/CustomCheckbox";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import CustomTextField1 from "util/Custom/CustomTextField1";

function Review() {
  const navigater = useNavigate();
  const [constultData, setConsultData] = useState()
  const [mentorData, setMentorData] = useState()

  const [ratingValue, setRatingValue] = useState()
  const [checkListValue, setCheckListValue] = useState([
    false, false, false, false, false
  ])
  const [reviewText, setReviewText] = useState('')

  const [questionList, setQuestionList] = useState([
    '시간을 잘 지켜요',
    '설명이 자세해요',
    '궁금증이 해결됐어요',
    '사전 준비가 철저해요',
    '대화 매너가 좋아요'
  ])
  const params = useParams()
  useEffect(async () => {
    let mentorId
    await API.getConsult(params.id).then((res) => {
      if (res.status === 200) {
        setConsultData(res.data)
        console.log('res.data', res.data)
        mentorId = res.data.MentorID
      }
    })

    API.getAccountMentor(mentorId).then((res) => {
      if (res.status === 200) {
        setMentorData(res.data)
        console.log('res.data', res.data)
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
              <TextHeading5 color={colorCareerDiveBlue}>{mentorData && mentorData.Nickname}</TextHeading5>
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
            precision={1}
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
            onChange={(e) => {
              setReviewText(e.target.value)
            }}
            minRows={10}
            style={{ minHeight: 140 }}
          />
          <EmptyHeight height={'28px'} />

          <CustomButton height={'48px'}
            onClick={() => {
              const data = {
                consultId: params.id,
                reviewContent: reviewText,
                reviewScore: ratingValue,
                checkList: checkListValue
                  .map(
                    (e, i) => e && questionList[i])
                  .filter((e) => e !== false && e)
              }
              API.patchConsultReview(data).then(() => {
                navigater('/mentee/schedule')
              })
            }}
          >
            완료
          </CustomButton>
        </Card>
        <EmptyHeight height={'28px'} />

      </GrayBackground>
    </VerticalFlex>
  );
}

export default Review;
