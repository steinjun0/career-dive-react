import { Divider, styled } from "@mui/material";
import testMentorImage from "../../assets/img/testMentorImage.png";
import TextField from '@mui/material/TextField';

import {
  TextSubtitle1,
  colorCareerDiveBlue,
  Flex,
  colorBackgroundGrayLight,
} from "../../util/styledComponent";
import Card from "../../util/Card";

const MenteeIntroduceWrapper = styled(Flex)`
  width: 100%;
`;

const Subtitle = styled(TextSubtitle1)`
  margin-top: 20px;
  color: ${colorCareerDiveBlue};
`;

const TextFieldWrapper = styled(Flex)`
  margin-top: 20px;
  width: 100%;
`;


function MenteeIntroduce() {
  return (
    <MenteeIntroduceWrapper>
      <Card title={'멘티 소개'}>
        <Subtitle>상담을 요청한 멘토에게만 공개됩니다. (최대 00자)</Subtitle>
        <TextFieldWrapper>
          <TextField
            id="outlined-textarea"
            placeholder="자기소개는 여기에 들어갑니다."
            multiline
            variant="filled"
            InputProps={{ disableUnderline: true, }}
            rows={4}
            fullWidth={true}
          />
        </TextFieldWrapper>

      </Card>
    </MenteeIntroduceWrapper>

  );
}

export default MenteeIntroduce;



