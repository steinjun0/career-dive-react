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
import { Card } from "util/Card";
import { CustomButton } from "util/CustomButton";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
`;

const CustomTextField = styled(TextField)`
  .MuiFilledInput-input{
    height: 32px;
    padding: 10px 20px;
  }
`;

function UserProfile() {
  return (
    <UserProfileCardWrapper>
      <Card title={'비밀번호 변경'} no_divider={'true'}>
        <TextFieldWrapper>
          <CustomTextField
            placeholder="변경 할 비밀번호"
            variant="filled"
            InputProps={{ disableUnderline: true }}
            rows={1}
            fullWidth={true}
          />
          <CustomButton />
        </TextFieldWrapper>

        <EmptyHeight height={'20px'}></EmptyHeight>
        <Divider></Divider>
        <EmptyHeight height={'20px'}></EmptyHeight>

        <TextHeading6>이메일 변경</TextHeading6>
        <TextFieldWrapper>
          <CustomTextField
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

      </Card>
    </UserProfileCardWrapper >

  );
}

export default UserProfile;
