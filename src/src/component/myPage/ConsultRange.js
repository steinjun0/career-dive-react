import { Divider, styled } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dropzone from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import {
  TextSubtitle2,
  colorCareerDiveBlue,
  Flex,
  colorBackgroundGrayLight,
  colorTextLight,
  EmptyWidth,
  VerticalFlex,
  TextBody2,
  colorCareerDivePink,
  EmptyHeight,
  colorBackgroundCareerDiveBlue,
  colorBackgroundCareerDivePink,
  TextSubtitle1,
} from "util/styledComponent";
import { Card } from "util/Card";
import { CustomButton } from "util/Custom/CustomButton";
import { useState } from "react";

import API from "API";
import { CustomTextField } from "util/Custom/CustomTextField";
import { TagLarge } from "util/Custom/CustomTag";


const MenteeIntroduceWrapper = styled(Flex)`
  // width: 100%;
`;

const Subtitle = styled(TextSubtitle2)`
  margin-top: 20px;
  color: ${colorCareerDiveBlue};
  margin-bottom: 20px;
`;


const DropzoneWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  background-color: ${colorBackgroundGrayLight};
  color: ${colorTextLight};
  width: 100%;
  height: 100px;
  border-radius: 8px;
`;

export const TextFieldWrapper = styled(Flex)`
  margin-top: 20px;
  width: 100%;
`;

const UrlWrapper = styled(TextFieldWrapper)`
  margin-top: 0;
  .css-10botns-MuiInputBase-input-MuiFilledInput-input{
    padding: 10px 20px;
  }
`;




function ConsultRange() {
  const [isEditing, setIsEditing] = useState(false)
  const [introduceText, setIntroduceText] = useState('')
  const [basicConsultContent, setBasicConsultContent] = useState(['직무 이야기', '업계 이야기', '진로 상담', '필요 역량', '기술 스택', '내 역량 진단', '이직 준비', '사내 문화', '면접 팁'])
  const [selectedBasicConsultContent, setSelectedBasicConsultContent] = useState([])
  const [premiumConsultContent, setPremiumConsultContent] = useState(['면접 대비', '자소서 구성', '자소서 첨삭', '포트폴리오 첨삭', '이력서 첨삭', 'CV/CL 첨삭', '코드 리뷰'])
  const consultRangeInfos = {
    '면접 대비': '멘티의 경력, 스펙 그리고 자소서를 토대로 한 예상 면접 질문을 제공합니다.',
    '자소서 구성': '멘티의 경력과 스펙을 토대로 자기소개서 구성을 도와줍니다.',
    '자소서 첨삭': '작성한 초안을 토대로 흐름, 내용 그리고 문장력 등에 관한 피드백을 제공합니다.',
    '포트폴리오 첨삭': '멘티의 작성한 초안을 토대로 흐름 및 내용 등에 관한 피드백을 제공합니다.',
    '이력서 첨삭': '멘티의 작성한 초안을 토대로 흐름, 내용 그리고 문장력 등에 관한 피드백을 제공합니다.',
    'CV/CL 첨삭': '멘티의 작성한 초안을 토대로 흐름, 내용 그리고 문장력 등에 관한 피드백을 제공합니다.',
    '코드 리뷰': '멘티가 작성한 코드를 토대로 피드백을 제공합니다.'
  }
  const [selectedPremiumConsultContent, setSelectedPremiumConsultContent] = useState([])
  const [selectedPremiumTab, setSelectedPremiumTab] = useState(premiumConsultContent[0])

  const cancelEditing = () => {
    setIsEditing(false)
  }

  const saveEditing = async () => {
    const validResponse = await API.patchAccount({
      AgreeAdb: true,
      AgreeNoti: true,
      "BirthDate": "string",
      "Email": "email@careerdive.com",
      "Name": "string",
      "Nickname": "string",
      "Password": "p@ssw0rd",
      "Phone": "string",
      "Sex": true
    });
    if (validResponse.status === 200) {
      setIsEditing(false)
      return
    }
  }

  return (
    <MenteeIntroduceWrapper>
      <Card
        title={
          <VerticalFlex>
            상담 가능 영역
          </VerticalFlex>
        }>
        <EmptyHeight height={'20px'} />
        <TextSubtitle2>멘티에게 제공할 수 있는 상담 영역을 선택해주세요!</TextSubtitle2>
        <EmptyHeight height={'20px'} />
        <TextSubtitle2 color={colorCareerDiveBlue}>커리어 상담</TextSubtitle2>
        <EmptyHeight height={'14px'} />
        <Flex>
          {basicConsultContent.map((e, index) => {
            return <Flex key={index}>
              <TagLarge
                style={{ cursor: 'pointer' }}
                color={selectedBasicConsultContent.includes(e) ? colorCareerDiveBlue : null}
                background_color={selectedBasicConsultContent.includes(e) ? colorBackgroundCareerDiveBlue : null}
                onClick={() => {
                  if (selectedBasicConsultContent.includes(e)) {
                    let temp = selectedBasicConsultContent
                    temp.splice(temp.indexOf(e), 1)
                    setSelectedBasicConsultContent([...temp]) // 그냥 temp를 하면 갱신되지 않음, 주소값이 같아서 그런듯
                  } else {
                    setSelectedBasicConsultContent([...selectedBasicConsultContent, e])
                  }
                }}>
                <TextBody2>
                  {e}
                </TextBody2>
              </TagLarge>
              <EmptyWidth width={"8px"} />
            </Flex>
          })}
        </Flex>

        <EmptyHeight height={'20px'} />
        <TextSubtitle2 color={colorCareerDivePink}>전형 준비</TextSubtitle2>
        <EmptyHeight height={'14px'} />
        <Flex>
          {premiumConsultContent.map((e, index) => {
            return <Flex key={index}>
              <TagLarge
                style={{ cursor: 'pointer' }}
                color={selectedPremiumConsultContent.includes(e) ? colorCareerDivePink : null}
                background_color={selectedPremiumConsultContent.includes(e) ? colorBackgroundCareerDivePink : null}
                onClick={() => {
                  if (selectedPremiumConsultContent.includes(e)) {
                    let temp = selectedPremiumConsultContent
                    temp.splice(temp.indexOf(e), 1)
                    setSelectedPremiumConsultContent([...temp]) // 그냥 temp를 하면 갱신되지 않음, 주소값이 같아서 그런듯
                  } else {
                    setSelectedPremiumConsultContent([...selectedPremiumConsultContent, e])
                  }
                }}>
                <TextBody2>
                  {e}
                </TextBody2>
              </TagLarge>
              <EmptyWidth width={"8px"} />
            </Flex>
          })}
        </Flex>
        <EmptyHeight height={'20px'} />
        <VerticalFlex style={{ backgroundColor: colorBackgroundGrayLight, padding: '24px', borderRadius: '8px', color: colorTextLight }}>
          <Flex style={{ justifyContent: 'center' }}>
            <VerticalFlex style={{ flex: 1 }}>
              <TextSubtitle1>
                커리어 상담
              </TextSubtitle1>
              <EmptyHeight height={'16px'} />
              <TextBody2>
                상담 비용은 다음과 같습니다. <br />멘티의 자료를 사전에 검토하지 않는 경우, 20분 13,900원, 40분 24,900원이며, 멘티의 자료를 사전에 검토하는 경우, 20분 25,400원, 40분 39,900원입니다.
              </TextBody2>
            </VerticalFlex>
            <EmptyWidth width={'24px'} />
            <VerticalFlex style={{ flex: 1 }}>
              <TextSubtitle1>
                전형 준비
              </TextSubtitle1>
              <EmptyHeight height={'16px'} />
              <TextBody2>
                상담 비용은 20분 40,900원, 40분 53,900원입니다.
              </TextBody2>
            </VerticalFlex>
          </Flex>
          <EmptyHeight height={'36px'} />
          <Flex>
            {premiumConsultContent.map((element, index) => {
              if (element === selectedPremiumTab) {
                return <TextBody2 style={{ cursor: 'pointer', paddingBottom: '12px', marginRight: '24px', borderBottom: `3px solid ${colorCareerDivePink}` }} color={colorCareerDivePink} key={`${index}`}>{element}</TextBody2>;
              } else {
                return <TextBody2 style={{ cursor: 'pointer', marginRight: '24px' }} is_selected={'false'} key={index} onClick={() => { setSelectedPremiumTab(element) }}>{element}</TextBody2>;
              }
            })}
          </Flex>
          <Divider />
          <EmptyHeight height={'36px'} />
          <TextBody2>
            {consultRangeInfos[selectedPremiumTab]}
          </TextBody2>
        </VerticalFlex>

      </Card>
    </MenteeIntroduceWrapper>

  );
}

export default ConsultRange;



