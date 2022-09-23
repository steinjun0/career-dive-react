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
  margin-bottom: 38px;
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
          </VerticalFlex>
        }
        titleTail={
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
          <Subtitle style={{ margin: '0 0 0 0' }}>작성하신 정보는 멘토 프로필에 노출됩니다.</Subtitle>
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
        <TextSubtitle1>태그</TextSubtitle1>
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
      </Card>
    </MenteeIntroduceWrapper>

  );
}

export default MentorIntroduce;



