import { Divider, styled, TextField, } from "@mui/material";

import {
  Flex,
  TextBody2,
  EmptyHeight,
  colorTextLight,
  TextHeading6,
  TextFieldWrapper,
  colorBackgroundGrayLight,
  EmptyWidth,
  colorCareerDiveBlue
} from "util/styledComponent";
import { Card } from "util/Card";
import { CustomButton } from "util/CustomButton";
import { CustomTextField } from 'util/CustomTextField';

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
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
          <EmptyWidth width={'16px'} />
          <CustomButton width={'83px'} custom_color={colorTextLight} background_color={colorBackgroundGrayLight}>저장</CustomButton>
        </TextFieldWrapper>

        <EmptyHeight height={'20px'}></EmptyHeight>
        <Divider></Divider>
        <EmptyHeight height={'20px'}></EmptyHeight>

        <TextHeading6>이메일 변경</TextHeading6>
        <TextFieldWrapper>
          <CustomTextField
            placeholder="birdrick@gamil.com"
            variant="filled"
            InputProps={{ disableUnderline: true }}
            rows={1}
            fullWidth={true}
          />
          <EmptyWidth width={'16px'} />
          <CustomButton width={'83px'} custom_color={colorTextLight} background_color={colorBackgroundGrayLight}>저장</CustomButton>
        </TextFieldWrapper>


        <EmptyHeight height={'20px'}></EmptyHeight>
        <Divider></Divider>
        <EmptyHeight height={'20px'}></EmptyHeight>

        <TextHeading6>휴대전화 변경</TextHeading6>
        <EmptyHeight height={'8px'}></EmptyHeight>
        <TextBody2 style={{ color: colorTextLight }}>본인인증을 통해 자동 저장됩니다.</TextBody2>
        <EmptyHeight height={'16px'}></EmptyHeight>
        <CustomButton height={'44px'} custom_color={colorCareerDiveBlue} background_color={colorBackgroundGrayLight}>본인인증</CustomButton>

      </Card>
    </UserProfileCardWrapper >

  );
}

export default UserProfile;
