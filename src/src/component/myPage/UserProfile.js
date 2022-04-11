import { Divider, styled, TextField } from "@mui/material";
import testMentorImage from "../../assets/img/testMentorImage.png";

import {
  CircleImg,
  TextSubtitle1,
  TextBody1,
  Flex,
  VerticalCenterAlignFlex,
  colorTextLight
} from "../../util/styledComponent";
import Card from "../../util/Card";
import { useState } from "react";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
`;

const SubtitleWarpper = styled(VerticalCenterAlignFlex)`
  margin-top: 20px;
`

const Subtitle = styled(TextSubtitle1)`
  // margin-top: 20px;
`;

const ProfileImg = styled(CircleImg)`
  width: 120px;
  height: 120px;
  margin: 20px 0;
`;

const TextContentWrapper = styled(Flex)`
  margin-top: 20px;
`

const EditTextButton = styled(TextBody1)`
  cursor: pointer;
  margin-left: auto;
  color: ${colorTextLight};
`

function UserProfile() {
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const onClickEditNickname = () => {
    setIsEditingNickname(!isEditingNickname)
  }
  return (
    <UserProfileCardWrapper>
      <Card title={'유저 프로필'}>
        <SubtitleWarpper>
          <Subtitle>프로필 이미지</Subtitle>
        </SubtitleWarpper>

        <ProfileImg src={testMentorImage} alt="profile-image" />

        <Divider></Divider>

        <SubtitleWarpper>
          <Subtitle>닉네임</Subtitle>
          <EditTextButton onClick={onClickEditNickname}>수정하기</EditTextButton>
        </SubtitleWarpper>


        <TextContentWrapper>
          {isEditingNickname ? <TextField variant="standard" defaultValue={'일하는 베짱이'}></TextField> : <TextBody1>일하는 베짱이</TextBody1>}

        </TextContentWrapper>

      </Card>
    </UserProfileCardWrapper >

  );
}

export default UserProfile;
