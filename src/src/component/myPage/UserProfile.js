import { Divider, styled, TextField } from "@mui/material";
import testMentorImage from "../../assets/img/testMentorImage.png";

import {
  CircleImg,
  TextSubtitle1,
  TextBody1,
  Flex,
  RowAlignCenterFlex,
  colorTextLight,
  colorBackgroundGrayLight,
  colorCareerDiveBlue
} from "util/styledComponent";
import { Card } from "util/Card";
import { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";

import API from "API";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
`;

const SubtitleWarpper = styled(RowAlignCenterFlex)`
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
  font-size: 14px;
`

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [nickName, setNickName] = useState('');
  const onClickEdit = () => {
    setIsEditing(true)
  }
  const onClickSave = async () => {
    await saveEditing()
    // setIsEditing(false)
  }

  const saveEditing = async () => {
    const validResponse = await API.patchAccount({
      Nickname: nickName
    });
    if (validResponse.status === 200) {
      setIsEditing(false)
      return
    }
  }

  useEffect(async () => {
    const res = await API.getAccount(localStorage.getItem('UserID'))
    if (res.status === 200) {
      setNickName(res.data.Nickname)
    }
  }, [])

  return (
    <UserProfileCardWrapper>
      <Card title={'유저 프로필'}
        titleTail={
          !isEditing ?
            <Flex>
              <CustomButton
                id='edit'
                width={'82px'}
                height={'48px'}
                background_color={colorBackgroundGrayLight}
                custom_color={colorTextLight}
                onClick={onClickEdit}
              >수정</CustomButton>
            </Flex> :
            <Flex>
              <CustomButton
                id='edit'
                width={'82px'}
                height={'48px'}
                background_color={colorCareerDiveBlue}
                custom_color={'white'}
                onClick={onClickSave}
              >저장</CustomButton>
            </Flex>}>
        <SubtitleWarpper>
          <Subtitle>프로필 이미지</Subtitle>
        </SubtitleWarpper>

        <ProfileImg src={testMentorImage} alt="profile-image" />

        <Divider></Divider>

        <SubtitleWarpper>
          <Subtitle>닉네임</Subtitle>
        </SubtitleWarpper>


        <TextContentWrapper>
          {isEditing ? <TextField
            variant="standard"
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value)
            }}
          ></TextField> : <TextBody1>{nickName}</TextBody1>}
        </TextContentWrapper>

      </Card>
    </UserProfileCardWrapper >

  );
}

export default UserProfile;
