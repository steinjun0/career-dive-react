import { Divider, styled, TextField, } from "@mui/material";

import {
  Flex,
  VerticalCenterAlignFlex,
  TextSubtitle2,
  TextBody2,
  EmptyHeight,
  colorTextLight,
  TextHeading6,
  TextFieldWrapper
} from "util/styledComponent";
import Card from "util/Card";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
`;

const SubtitleWarpper = styled(VerticalCenterAlignFlex)`
  margin-top: 20px;
`
const CustomTextSubtitle2 = styled(TextSubtitle2)`
  margin-right: 20px;
`

function UserProfile() {
  return (
    <UserProfileCardWrapper>
      <Card title={'비밀번호 변경'} no_divider={true}>
        <SubtitleWarpper>
          <CustomTextSubtitle2>이름</CustomTextSubtitle2>
          <TextBody2>김인종</TextBody2>
        </SubtitleWarpper>

        <EmptyHeight height={'20px'}></EmptyHeight>
        <Divider></Divider>
        <EmptyHeight height={'20px'}></EmptyHeight>

        <TextHeading6>이메일 변경</TextHeading6>
        <TextFieldWrapper>
          <TextField
            id="outlined-textarea"
            placeholder=""
            variant="filled"
            InputProps={{ disableUnderline: true }}
            rows={1}
            fullWidth={true}
          />
        </TextFieldWrapper>


        <EmptyHeight height={'20px'}></EmptyHeight>
        <Divider></Divider>
        <EmptyHeight height={'20px'}></EmptyHeight>

        <TextHeading6>휴대전화 변경</TextHeading6>
        <EmptyHeight height={'8px'}></EmptyHeight>
        <TextBody2 style={{ color: colorTextLight }}>본인인증을 통해 자동 저장됩니다.</TextBody2>

        <SubtitleWarpper>
          <CustomTextSubtitle2>휴대전화</CustomTextSubtitle2>
          <TextBody2>010-2392-2429</TextBody2>
        </SubtitleWarpper>

      </Card>
    </UserProfileCardWrapper >

  );
}

export default UserProfile;
