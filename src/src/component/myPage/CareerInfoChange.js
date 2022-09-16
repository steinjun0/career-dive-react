import { Divider, styled, TextField, } from "@mui/material";

import {
  Flex,
  TextBody2,
  EmptyHeight,
  colorTextLight,
  TextHeading6,
  colorBackgroundGrayLight,
  EmptyWidth,
  colorCareerDiveBlue,
  TextSubtitle2
} from "util/styledComponent";
import { Card } from "util/Card";
import { CustomButton } from "util/Custom/CustomButton";
import { CustomTextField } from 'util/Custom/CustomTextField';
import { useState } from "react";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
  justify-content:start;
`;

export const TextFieldWrapper = styled(Flex)`
  margin-top: 20px;
  width: 100%;
`;

function CareerInfoChange() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const isEditing = (value) => {
    return value !== ''
  }
  return (
    <UserProfileCardWrapper>
      <Card title={'비밀번호 변경'} no_divider={'true'} max_width={'583px'}>
        <TextFieldWrapper>
          <CustomTextField
            placeholder="변경 할 비밀번호"
            onChange={(event) => { setPassword(event.target.value) }}
            variant="filled"
            InputProps={{ disableUnderline: true }}
            rows={1}
            fullWidth={true}
          />
          <EmptyWidth width={'16px'} />
          <CustomButton
            width={'83px'}
            custom_color={isEditing(password) ? 'white' : colorTextLight}
            background_color={isEditing(password) ? colorCareerDiveBlue : colorBackgroundGrayLight}>
            <TextSubtitle2>
              저장
            </TextSubtitle2>
          </CustomButton>
        </TextFieldWrapper>

        <EmptyHeight height={'20px'}></EmptyHeight>
        <Divider></Divider>
        <EmptyHeight height={'20px'}></EmptyHeight>

        <TextHeading6>이메일 변경</TextHeading6>
        <TextFieldWrapper>
          <CustomTextField
            onChange={(event) => { setEmail(event.target.value) }}
            placeholder="birdrick@gamil.com"
            variant="filled"
            InputProps={{ disableUnderline: true }}
            rows={1}
            fullWidth={true}
          />
          <EmptyWidth width={'16px'} />
          <CustomButton
            width={'83px'}
            custom_color={isEditing(email) ? 'white' : colorTextLight}
            background_color={isEditing(email) ? colorCareerDiveBlue : colorBackgroundGrayLight}>
            <TextSubtitle2>
              저장
            </TextSubtitle2>
          </CustomButton>
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

export default CareerInfoChange;
