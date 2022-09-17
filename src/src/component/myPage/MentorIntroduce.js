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




function MentorIntroduce() {
  const [isEditing, setIsEditing] = useState(false)
  const [introduceText, setIntroduceText] = useState('')
  const [basicConsultContent, setBasicConsultContent] = useState(['직무 소개', '취업 상담', '진로 상담', '면접 팁', '업계 이야기'])
  const [selectedBasicConsultContent, setSelectedBasicConsultContent] = useState([])
  const [premiumConsultContent, setPremiumConsultContent] = useState(['자소서 첨삭', '자소서 구성', 'CV 첨삭', '포트폴리오 첨삭', '코드 리뷰', '면접 대비'])
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
            멘토 소개
            <Subtitle style={{ margin: '20px 0 0 0' }}>작성하신 정보는 멘토 프로필에 노출됩니다.</Subtitle>
          </VerticalFlex>} titleTail={
            <Flex>
              {!isEditing ?
                <Flex>
                  <Flex>
                    <CustomButton
                      id='edit'
                      width={'82px'}
                      height={'48px'}
                      background_color={colorBackgroundGrayLight}
                      custom_color={colorTextLight}
                      onClick={() => { setIsEditing(true) }}
                    >수정</CustomButton>
                  </Flex>
                </Flex>
                :
                <Flex>
                  <CustomButton
                    id='cancel'
                    height={'48px'}
                    width={'82px'}
                    background_color={colorBackgroundGrayLight}
                    custom_color={colorTextLight}
                    onClick={cancelEditing}
                  >취소</CustomButton>
                  <EmptyWidth width='16px' />
                  <CustomButton
                    width={'82px'}
                    onClick={() => { saveEditing(true) }}
                  >저장</CustomButton>
                </Flex>
              }
            </Flex>
          }>
        <TextFieldWrapper>
          {!isEditing ?
            <TextBody2 style={{ whiteSpace: 'pre' }} color={colorTextLight}>
              {introduceText}
            </TextBody2> :
            <TextField
              id="outlined-textarea"
              value={introduceText}
              placeholder="1. 직장&#13;&#10;2. 경력·활동&#13;&#10;3. 어학·자격증"
              multiline
              variant="filled"
              InputProps={{ disableUnderline: true, readOnly: !isEditing, style: { backgroundColor: colorBackgroundGrayLight, padding: 20, borderRadius: 8, } }}
              minRows={4}
              maxRows={8}
              fullWidth={true}
              onChange={(e) => {
                setIntroduceText(e.target.value)
              }}
            />}
        </TextFieldWrapper>
        <EmptyHeight height={'20px'} />
        <TextSubtitle2 style={{ fontSize: '16px' }}>태그</TextSubtitle2>
        <EmptyHeight height={'20px'} />
        <CustomTextField
          onChange={(event) => {
            // mentorInfoState.setTagsString(event.target.value)
          }}
          variant="filled"
          InputProps={{ disableUnderline: true, }}
          fullWidth={true}
          margin="dense"
          size="small"
          hiddenLabel
          placeholder="ex. 커리어다이브, 플랫폼, 에듀테크, 금융서비스 등"
        />
        <EmptyHeight height={'20px'} />
        <Divider />
        <EmptyHeight height={'20px'} />
        <Flex style={{ justifyContent: 'space-between', alignItems: 'center' }} color={colorTextLight}>
          <TextSubtitle2 style={{ fontSize: '16px' }}>멘티에게 줄 수 있는 도움</TextSubtitle2>
          <HelpOutlineIcon fontSize="small" />
        </Flex>
        <EmptyHeight height={'20px'} />
        <TextSubtitle2 color={colorCareerDiveBlue}>일반</TextSubtitle2>
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
        <TextSubtitle2 color={colorCareerDivePink}>프리미엄</TextSubtitle2>
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
          <Flex>
            <VerticalFlex>
              <TextSubtitle2 style={{ fontSize: '16px' }}>
                일반
              </TextSubtitle2>
              <EmptyHeight height={'16px'} />
              <TextBody2>
                상담 비용은 00,000원(수수료 포함)이며, 사전 준비를 요구하지 않습니다.
              </TextBody2>
            </VerticalFlex>
            <EmptyWidth width={'24px'} />
            <VerticalFlex>
              <TextSubtitle2 style={{ fontSize: '16px' }}>
                프리미엄
              </TextSubtitle2>
              <EmptyHeight height={'16px'} />
              <TextBody2>
                상담 비용은 00,000원(수수료 포함)이며, 상담 이전 준비가 필수입니다.
              </TextBody2>
            </VerticalFlex>
          </Flex>
          <EmptyHeight height={'36px'} />
          <Flex>
            {premiumConsultContent.map((element, index) => {
              if (element === selectedPremiumTab) {
                return <TextBody2 style={{ cursor: 'pointer', paddingBottom: '12px', marginRight: '24px', borderBottom: `3px solid ${colorCareerDiveBlue}` }} color={colorCareerDiveBlue} key={`${index}`}>{element}</TextBody2>;
              } else {
                return <TextBody2 style={{ cursor: 'pointer', marginRight: '24px' }} is_selected={'false'} key={index} onClick={() => { setSelectedPremiumTab(element) }}>{element}</TextBody2>;
              }
            })}
          </Flex>
          <Divider />
          <EmptyHeight height={'36px'} />
          <TextBody2>
            멘티의 경력과 스펙을 토대로 자기소개서 구성을 도와줍니다.
          </TextBody2>
        </VerticalFlex>

      </Card>
    </MenteeIntroduceWrapper>

  );
}

export default MentorIntroduce;



