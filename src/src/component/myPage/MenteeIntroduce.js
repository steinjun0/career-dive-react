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
} from "util/styledComponent";
import { Card } from "util/Card";

const MenteeIntroduceWrapper = styled(Flex)`
  width: 100%;
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
  width: 840px;
  height: 100px;
  border-radius: 8px;
`;

export const TextFieldWrapper = styled(Flex)`
  margin-top: 20px;
  width: 100%;
`;

const UrlWrapper = styled(TextFieldWrapper)`
  margin-top: 0;
`;


function MenteeIntroduce() {
  return (
    <MenteeIntroduceWrapper>
      <Card title={'내 소개'} no_divider={'true'}>
        <Subtitle>상담을 요청한 멘토에게만 공개됩니다.</Subtitle>
        <Divider></Divider>
        <TextFieldWrapper>
          <TextField
            id="outlined-textarea"
            placeholder="자기소개는 여기에 들어갑니다."
            multiline
            variant="filled"
            InputProps={{ disableUnderline: true, }}
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
            InputProps={{ disableUnderline: true }}
            rows={1}
            fullWidth={true}
          />
        </UrlWrapper>

      </Card>
    </MenteeIntroduceWrapper>

  );
}

export default MenteeIntroduce;



