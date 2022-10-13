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
  TextCaption
} from "util/styledComponent";
import { Card } from "util/Card";
import { TagLarge } from "util/Custom/CustomTag";
import { CustomTextArea } from "util/Custom/CustomTextArea";
import { CustomButton } from "util/Custom/CustomButton";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addMinute, getAMOrPM, getDayInKorean, updateReservation } from "util/util";
import UploadIcon from 'assets/icon/UploadIcon'
import Dropzone from "react-dropzone";
import API from "API";

const RequestCardWrapper = styled(Flex)`
  margin-top: 30px;
`;


const ApplyButton = styled(CustomButton)`
  width: 378px;
  margin-top: 30px;
  margin-left: auto;
`;

const FileDropzoneContent = styled(Flex)`
  background-color: ${colorBackgroundGrayLight};
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: 60px;
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

const getConsultingRangeInKorean = (consultingStartTime, consultingTime) => {
  const consultingStartTimeDate = new Date(`2022-01-02 ${consultingStartTime}`);
  if (!isNaN(consultingStartTimeDate.getTime())) {
    const consultingEndTimeDate = addMinute(consultingStartTimeDate, consultingTime)
    const consultingEndTime = `${consultingEndTimeDate.getHours().toString().padStart(2, '0')}:${consultingEndTimeDate.getMinutes().toString().padStart(2, '0')}`
    return `${getAMOrPM(consultingStartTime)} ${consultingStartTime}~${getAMOrPM(consultingEndTime)} ${consultingEndTime}`
  }
  else {
    return ''
  }
}

const maxLength = 600;

function Request() {
  const navigate = useNavigate()

  const consultCategory = '커리어 상담'
  const [consultContents, setConsultContents] = useState([])
  const [consultingDate, setConsultingDate] = useState({})
  const [consultingStartTime, setConsultingStartTime] = useState()
  const [consultingTime, setConsultingTime] = useState(20)
  const [applymentContent, setApplymentContent] = useState('')

  const [isFilePreOpen, setIsFilePreOpen] = useState('')
  const [uploadingFiles, setUploadingFiles] = useState([])


  const [requestText, setRequestText] = useState('');

  const params = useParams()

  useEffect(() => {
    try {
      const reservation = JSON.parse(localStorage.getItem('reservations'))[params.id]
      setConsultContents(reservation['consultContent'])
      setConsultingDate(reservation['consultingDate'])
      setConsultingStartTime(reservation['consultingStartTime'])
      setConsultingTime(reservation['consultingTime'])
      setApplymentContent(reservation['applymentContent'])
      setIsFilePreOpen(reservation['isFilePreOpen'])

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
                <CategoryTag category={consultCategory}><TextBody2>{consultCategory}</TextBody2></CategoryTag>
                <EmptyWidth width='8px' />
                {consultContents && consultContents.map((value, index) => {
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
              setRequestText(event.target.value)
              updateReservation(params.id, updatingData)
            }}
            maxLength={maxLength}
            placeholder="희망 상담 내용을 작성해 주세요. 프로필 소개 또한 함께 전달됩니다."
            minRows={5}
          />
          <Flex style={{ justifyContent: 'end', marginTop: '4px' }}>
            <TextCaption>{requestText.length}/{maxLength}</TextCaption>
          </Flex>
          <EmptyHeight height='16px' />


          {isFilePreOpen === '희망' && <VerticalFlex>
            <TextSubtitle1>첨부 파일 업로드 (최대 2개)</TextSubtitle1>
            <TextBody2 color={colorCareerDiveBlue}>
              안내문구
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
                temp.push(file.path)
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
                <TextBody2 color={colorTextLight} style={{ textDecoration: 'underline', marginRight: 10 }}>{items}</TextBody2>
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
          </VerticalFlex>}

        </Card>
      </RequestCardWrapper >

      <ApplyButton
        onClick={async () => {
          const reservations = JSON.parse(localStorage.getItem(`reservations`))
          let initialDate = undefined
          if (reservations !== null) {
            const reservation = reservations[params.id]
            await API.postConsult(
              {
                consultContentList: [...reservation['consultContent'].map((e) => {
                  return {
                    Name: e,
                    Type: reservation['consultCategory'] === "커리어 상담" ? 'general' : 'premium'
                  }
                })]
              }
            )
            navigate('/mentee/request/finish')

          }


        }}>
        <TextHeading6>
          다음
        </TextHeading6>
      </ApplyButton>

    </VerticalFlex >



  );
}

export default Request;