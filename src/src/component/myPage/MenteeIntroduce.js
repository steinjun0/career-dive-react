import { Divider, styled } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dropzone from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload';

import {
  TextSubtitle2,
  colorCareerDiveBlue,
  Flex,
  colorBackgroundGrayLight,
  colorTextLight,
  EmptyWidth,
  VerticalFlex,
} from "util/styledComponent";
import { Card } from "util/Card";
import { CustomButton } from "util/Custom/CustomButton";
import { useState } from "react";

import API from "API";


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




function MenteeIntroduce() {
  const [isEditing, setIsEditing] = useState(false)

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
      <Card title={
        <VerticalFlex>
          내 소개
          <Subtitle style={{ margin: '20px 0 0 0' }}>상담을 요청한 멘토에게만 공개됩니다.</Subtitle>
        </VerticalFlex>} titleTail={
          <Flex>
            {!isEditing ?
              <Flex>
                <Flex>
                  <CustomButton
                    id='edit'
                    width={'82px'}
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
          <TextField
            id="outlined-textarea"
            placeholder="1. 학교·직장&#13;&#10;2. 경력·활동&#13;&#10;3. 어학·자격증&#13;&#10;4. 취업·이직 준비에 관한 고민 등"
            multiline
            variant="filled"
            InputProps={{ disableUnderline: true, readOnly: !isEditing, style: { backgroundColor: colorBackgroundGrayLight, padding: 20, borderRadius: 8, } }}
            minRows={4}
            maxRows={8}
            fullWidth={true}
          />
        </TextFieldWrapper>

        <Subtitle>파일 업로드(최대 2개)</Subtitle>
        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <DropzoneWrapper {...getRootProps()}>
                <input {...getInputProps()} />
                <FileUploadIcon fontSize={'large'}></FileUploadIcon>
              </DropzoneWrapper>
            </section>
          )}
        </Dropzone>
        <Subtitle>URL 링크</Subtitle>
        <UrlWrapper>
          <TextField
            id="outlined-textarea"
            placeholder="자신을 소개하는 url을 작성해보세요"
            variant="filled"
            InputProps={{ disableUnderline: true, readOnly: !isEditing, style: { backgroundColor: colorBackgroundGrayLight, borderRadius: 8, } }}
            rows={1}
            fullWidth={true}
          />
        </UrlWrapper>

      </Card>
    </MenteeIntroduceWrapper>

  );
}

export default MenteeIntroduce;



