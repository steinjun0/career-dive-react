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
  colorBackgroundCareerDivePink,
  TextCaption,
  TextSubtitle2
} from "util/styledComponent";
import { Card } from "util/Card";
import { TagLarge } from "util/Custom/CustomTag";
import { CustomTextArea } from "util/Custom/CustomTextArea";
import { CustomButton } from "util/Custom/CustomButton";
import Dropzone from 'react-dropzone'
import UploadIcon from 'assets/icon/UploadIcon'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMinute, getAMOrPM, getDayInKorean, getKoreanTimeString, removeReservation, updateReservation } from "util/util";
import { CustomTextField } from "util/Custom/CustomTextField";
import API from "API"

const RequestCardWrapper = styled(Flex)`
  margin-top: 30px;
`;


const ApplyButton = styled(CustomButton)`
  width: 170px;
  margin-top: 24px;
  margin-left: auto;
  height: 52px;
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

const FileDropzoneContent = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 60px;
`;

const UnderlineText = styled(TextBody2)`
  text-decoration: underline;
`

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
const getConsultingRangeInKorean = (consultingStartTime, consultingTime) => {
  const consultingStartTimeDate = new Date(`2023-01-02 ${consultingStartTime}`);
  if (!isNaN(consultingStartTimeDate.getTime())) {
    const consultingEndTimeDate = addMinute(consultingStartTimeDate, consultingTime)
    return `${getKoreanTimeString(consultingStartTimeDate)} ~ ${getKoreanTimeString(consultingEndTimeDate)}`
  }
  else {
    return ''
  }
}

const upperGuideObject = {
  '자소서 구성': `${localStorage.getItem('UserID')}님의 경력과 스펙을 작성해 주세요.`,
  '면접 대비': `${localStorage.getItem('UserID')}님의 자소서, 경력, 스펙 등을 작성해 주세요. 멘토는 이를 토대로 한 예상 면접 질문을 제공합니다.`
}
const belowGuideObject = {
  '자소서 첨삭': `자소서 초안을 업로드해 주세요.`,
  'CV/CL 첨삭': `CV 혹은 커버레터 초안을 업로드해 주세요.`,
  '코드 리뷰': `멘토가 리뷰할 코드를 업로드해 주세요.`,
  '포트폴리오 첨삭': `포트폴리오 초안을 업로드해 주세요.`,
}

const maxLength = 2000;

function Request() {
  const params = useParams()
  const navigate = useNavigate()
  const consultCategory = '전형 준비'

  const [consultContents, setConsultContents] = useState([])
  const [uploadingFiles, setUploadingFiles] = useState([])
  const [consultingDate, setConsultingDate] = useState({})
  const [consultingStartTime, setConsultingStartTime] = useState()
  const [consultingTime, setConsultingTime] = useState(20)
  const [scheduleId, setScheduleId] = useState(0)
  const [requestText, setRequestText] = useState('');

  const [upperGuide, setUpperGuide] = useState('')
  const [belowGuide, setBelowGuide] = useState('')



  useEffect(() => {
    try {
      const reservation = JSON.parse(localStorage.getItem('reservations'))[params.id]
      setConsultContents(reservation['consultContent'])
      setConsultingDate(reservation['consultingDate'])
      setConsultingStartTime(reservation['consultingStartTime'])
      setConsultingTime(reservation['consultingTime'])
      setScheduleId(reservation['scheduleId'])
      setRequestText(reservation['requestText'])

      setRequestText(reservation['requestText'])

      if (reservation['consultCategory'] === '전형 준비') {
        if (reservation['consultContent'][0] in upperGuideObject) {
          setUpperGuide(upperGuideObject[reservation['consultContent'][0]])
        }
        if (reservation['consultContent'][0] in belowGuideObject) {
          setBelowGuide(belowGuideObject[reservation['consultContent'][0]])
        }
      }
    } catch (error) {
      console.log(error)
      alert('누락된 상담 내용 정보가 있습니다.')
    }

  }, [])

  async function onClickApplyButton() {
    if (uploadingFiles.length <= 0) {
      const isContinue = window.confirm('첨부파일 없이 계속 하시겠습니까?')
      if (!isContinue) {
        return
      }
    }

    const reservations = JSON.parse(localStorage.getItem(`reservations`))
    let initialDate = undefined
    if (reservations !== null) {
      const reservation = reservations[params.id]

      const consultingStartTimeDate = new Date(`2023-01-02 ${reservation['consultingStartTime']}`);
      const consultingEndTimeDate = addMinute(consultingStartTimeDate, consultingTime)
      const consultingEndTime = `${consultingEndTimeDate.getHours().toString().padStart(2, '0')}:${consultingEndTimeDate.getMinutes().toString().padStart(2, '0')}`


      const consultRes = await API.postConsult(
        {
          consultContentList: [...reservation['consultContent'].map((e) => {
            return {
              Name: e,
              Type: reservation['consultCategory']
            }
          })],
          menteeId: +localStorage.getItem("UserID"),
          mentorId: +params.id,
          preReview: reservation['isFilePreOpen'] === '희망' ? true : false,
          requestContent: requestText,
          scheduleId: reservation['scheduleId'],
          startTime: reservation['consultingStartTime'],
          endTime: consultingEndTime,
          type: reservation['consultCategory']
        }
      )
      if (consultRes.status === 200) {

        if (uploadingFiles.length > 0) {
          const consultId = consultRes.data.ID

          uploadingFiles.forEach(async (e) => {
            let formData = new FormData()
            formData.append('file', e)
            const consultFileRes = await API.postConsultFile(consultId, formData)

            if (consultFileRes.status !== 200) {
              alert('네트워크 오류로 파일 업로드에 실패했습니다. 다시 시도해주세요')
              return
            }
          })
        }
        removeReservation(+params.id)
        navigate('/mentee/request/finish')
      } else {
        alert('네트워크 오류로 상담신청에 실패했습니다. 다시 시도해주세요')
      }
    } else {
      alert('누락된 정보가 있습니다. 다시 시도해주세요')
      navigate(`/mentee/mentor/${params.id}/request`)
    }

  }

  return (
    // TODO: 디자인에 맞게 수정하기(덜어내기)
    <VerticalFlex>
      <RequestCardWrapper>
        <Card
          title={`${consultingDate['year']}년 ${consultingDate['month']}월 ${consultingDate['date']}일(${getDayInKorean(new Date(consultingDate['year'], consultingDate['month'] - 1, consultingDate['date']))})`}
          titleHead={
            <Flex>
              <EmptyWidth width='12px' />
              <TextSubtitle1 color={colorCareerDivePink}>{getConsultingRangeInKorean(consultingStartTime, consultingTime)}</TextSubtitle1>
            </Flex>}
          titleBottom={
            <VerticalFlex>
              <EmptyHeight height='16px' />
              <Flex>
                <CategoryTag category={consultCategory}><TextBody2>{consultCategory}</TextBody2></CategoryTag>
                <EmptyWidth width='8px' />
                {consultContents.map((value, index) => {
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
          {upperGuide !== '' && <TextBody2 color={colorCareerDivePink}>
            • &nbsp;&nbsp;{upperGuide}
          </TextBody2>}
          <EmptyHeight height='16px' />
          <CustomTextArea
            defaultValue={requestText}
            onFocus={(event) => {
              event.target.placeholder = ''
            }}
            onBlur={(event) => {
              event.target.placeholder = '희망 상담 내용을 작성해 주세요. 프로필 소개 또한 함께 전달됩니다.'
            }}
            onChange={(event) => {
              const updatingData = [
                { name: 'requestText', data: event.target.value },
              ]
              setRequestText(event.target.value)
              updateReservation(params.id, updatingData)
            }}
            maxLength={maxLength}

            placeholder="희망 상담 내용을 작성해 주세요. 프로필 소개 또한 함께 전달됩니다."
            minRows={5}
          />
          <Flex style={{ justifyContent: 'end', marginTop: '4px' }}>
            <TextCaption>{requestText ? requestText.length : 0}/{maxLength}</TextCaption>
          </Flex>

          <EmptyHeight height='16px' />


          <TextSubtitle1>첨부 파일 업로드 (최대 2개)</TextSubtitle1>
          <TextBody2 color={colorCareerDivePink}>
            {belowGuide}
          </TextBody2>
          <EmptyHeight height='8px' />
          {/* TODO: upload 파일 취소 버튼 필요 */}
          <Dropzone onDrop={acceptedFiles => {
            if (uploadingFiles.length + acceptedFiles.length > 2) {
              alert('업로드 파일은 최대 2개입니다.')
              return
            }
            const temp = []
            acceptedFiles.forEach(file => {
              temp.push(file)
            })
            setUploadingFiles([...uploadingFiles, ...temp])
          }}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <FileDropzoneContent {...getRootProps()}>
                  <input {...getInputProps()} />
                  <UploadIcon color={colorTextLight} />
                </FileDropzoneContent>
              </section>
            )}
          </Dropzone>
          <EmptyHeight height='16px' />
          {uploadingFiles.map((items, index) => {
            return <Flex key={index}>
              <TextBody2 color={colorTextLight} style={{ textDecoration: 'underline', marginRight: 10 }}>{items.path}</TextBody2>
              <TextBody2
                style={{ cursor: 'pointer' }}
                color={colorCareerDivePink}
                onClick={() => {
                  const temp = JSON.parse(JSON.stringify(uploadingFiles))
                  temp.splice(temp.indexOf(items), 1)
                  setUploadingFiles(temp)
                }}>삭제</TextBody2>
            </Flex>
          })}

          <ApplyButton
            onClick={() => {
              onClickApplyButton()
            }}>
            <TextSubtitle1>
              완료
            </TextSubtitle1>
          </ApplyButton>

        </Card>
      </RequestCardWrapper >



    </VerticalFlex>



  );
}

export default Request;