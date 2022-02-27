import { Divider, styled } from "@mui/material";
import testMentorImage from "../../assets/img/testMentorImage.png";

import {
  CircleImg,
  TextSubtitle1,
  TextBody1,
  Flex,
} from "../../util/styledComponent";
import Card from "../../util/Card";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
`;

const Subtitle = styled(TextSubtitle1)`
  margin-top: 20px;
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
  margin-left: 20px;
`

function UserProfile() {
  return (
    <UserProfileCardWrapper>
      <Card title={'유저 프로필'}>
        <Subtitle>프로필 이미지</Subtitle>
        <ProfileImg src={testMentorImage} alt="profile-image" />

        <Divider></Divider>

        <Subtitle>닉네임</Subtitle>

        <TextContentWrapper>
          <TextBody1>일하는 베짱이</TextBody1>
          <EditTextButton>수정</EditTextButton>
        </TextContentWrapper>

      </Card>
    </UserProfileCardWrapper>

  );
}

export default UserProfile;
