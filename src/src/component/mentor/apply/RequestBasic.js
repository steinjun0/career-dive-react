import { styled, } from "@mui/material";

import {
  Flex,
  EmptyWidth,
  TextBody2,
  EmptyHeight,
  TextHeading6,
  colorCareerDiveBlue,
  TextSubtitle1,
  colorBackgroundGrayLight,
  colorTextLight,
  VerticalFlex,
  colorBackgroundCareerDiveBlue,
  colorCareerDivePink,
  colorBackgroundCareerDivePink
} from "util/styledComponent";
import { Card } from "util/Card";
import { TagLarge } from "util/Custom/CustomTag";
import { CustomTextArea } from "util/Custom/CustomTextArea";
import { CustomButton } from "util/Custom/CustomButton";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addMinute, getAMOrPM, getDayInKorean, updateReservation } from "util/util";

const RequestCardWrapper = styled(Flex)`
  margin-top: 30px;
`;


const ApplyButton = styled(CustomButton)`
  width: 378px;
  margin-top: 30px;
  margin-left: auto;
`;

const getCategoryColor = (category) => {
  if (category === '커리어 상담') {
    return colorCareerDiveBlue
  } else if (category === '전형 준비') {
    return colorCareerDivePink
  } else {
    return colorTextLight
  }
}

const getCategoryBackgroundColor = (category) => {
  if (category === '커리어 상담') {
    return colorBackgroundCareerDiveBlue
  } else if (category === '전형 준비') {
    return colorBackgroundCareerDivePink
  } else {
    return colorBackgroundGrayLight
  }
}

const CategoryTag = styled(TagLarge)`
  color:${props => getCategoryColor(props.category)};
  background-color:${props => getCategoryBackgroundColor(props.category)};
`

const getConsultingRangeInKorean = (consultingStartTime, consultingTime) =>
  `${getAMOrPM(consultingStartTime)} ${consultingStartTime}~${getAMOrPM(addMinute(consultingStartTime, consultingTime))} ${addMinute(consultingStartTime, consultingTime)}`

function Request() {
  const mentoringCategory = '커리어 상담'
  const [mentoringContents, setMentoringContents] = useState([])
  const [consultingDate, setConsultingDate] = useState({})
  const [consultingStartTime, setConsultingStartTime] = useState()
  const [consultingTime, setConsultingTime] = useState(20)
  const [applymentContent, setApplymentContent] = useState('')

  const params = useParams()

  useEffect(() => {
    try {
      const reservation = JSON.parse(localStorage.getItem('reservations'))[params.id]
      setMentoringContents(reservation['mentoringContent'])
      setConsultingDate(reservation['consultingDate'])
      setConsultingStartTime(reservation['consultingStartTime'])
      setConsultingTime(reservation['consultingTime'])
      setApplymentContent(reservation['applymentContent'])
    } catch (error) {
      console.log(error)
      alert('누락된 상담 내용 정보가 있습니다.')
    }
  }, [])

  // TODO: localStorage에서 받아오기
  return (
    // TODO: 디자인에 맞게 수정하기(덜어내기)
    <VerticalFlex>
      <RequestCardWrapper>
        <Card
          title={`${consultingDate['year']}년 ${consultingDate['month']}월 ${consultingDate['date']}일(${getDayInKorean(new Date(consultingDate['year'], consultingDate['month'] - 1, consultingDate['date']))})`}
          titleHead={
            <Flex>
              <EmptyWidth width='12px' />
              <TextSubtitle1 color={colorCareerDiveBlue}>{getConsultingRangeInKorean(consultingStartTime, consultingTime)}</TextSubtitle1>
            </Flex>}
          titleBottom={
            <VerticalFlex>
              <EmptyHeight height='16px' />
              <Flex>
                <CategoryTag category={mentoringCategory}><TextBody2>{mentoringCategory}</TextBody2></CategoryTag>
                <EmptyWidth width='8px' />
                {mentoringContents && mentoringContents.map((value, index) => {
                  return (
                    <Flex key={index}>
                      <TagLarge color={colorTextLight}
                        background_color={colorBackgroundGrayLight}>
                        <TextBody2>{value}</TextBody2>
                      </TagLarge>
                      <EmptyWidth width='8px'></EmptyWidth>
                    </Flex>
                  )
                })}
              </Flex>
            </VerticalFlex>
          }>

          <EmptyHeight height='16px' />
          <TextSubtitle1>요청서</TextSubtitle1>
          <EmptyHeight height='16px' />
          <TextBody2 color={colorTextLight}>
            • &nbsp;&nbsp;사내 규정상 공개가 어려운 정보를 요청할 수 없습니다.
            <br></br>
            • &nbsp;&nbsp;선택하신 희망 상담 내용 이외의 정보(섭외, 광고 등)를 요청할 수 없습니다.
          </TextBody2>
          <EmptyHeight height='16px' />
          <CustomTextArea
            defaultValue={applymentContent}
            onFocus={(event) => {
              event.target.placeholder = ''
            }}
            onBlur={(event) => {
              event.target.placeholder = '희망 상담 내용을 작성해 주세요. 프로필 소개 또한 함께 전달됩니다.'
            }}
            onChange={(event) => {
              const updatingData = [
                { name: 'applymentContent', data: event.target.value },
              ]
              updateReservation(params.id, updatingData)
            }}

            placeholder="희망 상담 내용을 작성해 주세요. 프로필 소개 또한 함께 전달됩니다."
            minRows={5}
          />
          <EmptyHeight height='16px' />
        </Card>
      </RequestCardWrapper >

      <ApplyButton>
        <TextHeading6>
          다음
        </TextHeading6>
      </ApplyButton>

    </VerticalFlex>



  );
}

export default Request;