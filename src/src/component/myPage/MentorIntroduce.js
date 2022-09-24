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
import { useEffect, useState } from "react";

import API from "API";
import { CustomTextField } from "util/Custom/CustomTextField";
import { TagLarge } from "util/Custom/CustomTag";
import TagShowAndInput from "component/TagShowAndInput";


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

const TextFieldWrapper = styled(Flex)`
  margin-top: 20px;
  width: 100%;
`;

const UrlWrapper = styled(TextFieldWrapper)`
  margin-top: 0;
  .css-10botns-MuiInputBase-input-MuiFilledInput-input{
    padding: 10px 20px;
  }
`;

const mentorIntroducePlaceholder = '작성된 소개가 없습니다. 멘티에게 노출 될 소개를 작성해주세요!';



function MentorIntroduce() {
  const [isEditing, setIsEditing] = useState(false)
  const [introduceText, setIntroduceText] = useState('')
  const [tagList, setTagList] = useState([]);
  const [tagListBackup, setTagListBackup] = useState([]);

  const cancelEditing = () => {
    console.log('tagListBackup', tagListBackup)
    setTagList(tagListBackup)
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
      await postMentorTag() // TODO: try catch
      setIsEditing(false)
      return
    }
  }

  const getMentorTag = async () => {
    const mentorRes = await API.getAccountMentor(localStorage.getItem('UserID'))
    if (mentorRes.status === 200) {
      let newTagList = mentorRes.data.Tags.map((e) => {
        return e.Name
      })
      return newTagList
    }
  }

  const postMentorTag = async () => {
    const convertedTagList = tagList.map((e) => {
      return { Name: e }
    })
    API.postAccountTag(convertedTagList, localStorage.getItem('UserID'))
  }

  useEffect(() => {
    if (introduceText === '') {
      setIsEditing(true)
    }
  }, [])

  useEffect(async () => {
    if (isEditing) {
      let tags = await getMentorTag()
      setTagListBackup(tags)
      setTagList(tags)
    }
  }, [isEditing])




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
                {introduceText !== '' && <CustomButton
                  id='cancel'
                  height={'48px'}
                  width={'82px'}
                  background_color={colorBackgroundGrayLight}
                  custom_color={colorTextLight}
                  onClick={cancelEditing}
                >취소</CustomButton>}
                <EmptyWidth width='16px' />
                <CustomButton
                  disabled={introduceText === ''}
                  height={'48px'}
                  width={'82px'}
                  onClick={() => { saveEditing(true) }}
                >저장</CustomButton>
              </Flex>
            }
          </Flex>
        }>
        <Subtitle style={{ margin: '20px 0 0 0' }}>작성하신 정보는 멘토 프로필에 노출됩니다.</Subtitle>
        <TextFieldWrapper>
          {!isEditing ?
            <TextBody2 style={{ whiteSpace: 'pre' }} color={colorTextLight}>
              {introduceText}
            </TextBody2> :
            <TextField
              id="outlined-textarea"
              value={introduceText}
              placeholder={mentorIntroducePlaceholder}
              multiline
              variant="filled"
              InputProps={{ disableUnderline: true, readOnly: !isEditing, style: { backgroundColor: colorBackgroundGrayLight, padding: 20, borderRadius: 8, } }}
              minRows={6}
              maxRows={8}
              fullWidth={true}
              onChange={(e) => {
                setIntroduceText(e.target.value)
              }}
            />}
        </TextFieldWrapper>
        <EmptyHeight height={'20px'} />
        <TagShowAndInput tagList={tagList} setTagList={setTagList} isEditing={isEditing} />

      </Card>
    </MenteeIntroduceWrapper>

  );
}

export default MentorIntroduce;



