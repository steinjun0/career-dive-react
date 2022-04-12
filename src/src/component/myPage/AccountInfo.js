import { Divider, styled, TextField } from "@mui/material";
import testMentorImage from "../../assets/img/testMentorImage.png";

import {
  CircleImg,
  TextSubtitle1,
  TextBody1,
  Flex,
  VerticalCenterAlignFlex,
  colorTextLight,
  TextButton,
  TextSubtitle2,
  TextBody2,
  EmptyHeight
} from "util/styledComponent";
import Card from "util/Card";
import { useState } from "react";

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
      <Card title={'계정 정보'} titleTail={<TextButton>변경</TextButton>}>
        <SubtitleWarpper>
          <CustomTextSubtitle2>이름</CustomTextSubtitle2>
          <TextBody2>김인종</TextBody2>
        </SubtitleWarpper>

        <SubtitleWarpper>
          <CustomTextSubtitle2>비밀번호</CustomTextSubtitle2>
          <TextBody2>*********</TextBody2>
        </SubtitleWarpper>

        <EmptyHeight height={'20px'}></EmptyHeight>
        <Divider></Divider>

        <SubtitleWarpper>
          <CustomTextSubtitle2>이메일</CustomTextSubtitle2>
          <TextBody2>birdrck@gmail.com</TextBody2>
        </SubtitleWarpper>

        <SubtitleWarpper>
          <CustomTextSubtitle2>휴대전화</CustomTextSubtitle2>
          <TextBody2>010-2392-2429</TextBody2>
        </SubtitleWarpper>

      </Card>
    </UserProfileCardWrapper >

  );
}

export default UserProfile;
