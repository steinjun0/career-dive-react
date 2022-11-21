import { Divider, styled, TextField } from "@mui/material";
// import testMentorImage from "../../assets/img/testMentorImage.png";
import testMentorImage from '../../assets/img/logo/testProfileImage.png';

import {
  CircleImg,
  TextSubtitle1,
  TextBody1,
  Flex,
  RowAlignCenterFlex,
  colorTextLight,
  colorBackgroundGrayLight,
  colorCareerDiveBlue,
  VerticalFlex
} from "util/styledComponent";
import { Card } from "util/Card";
import { useEffect, useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";

import API from "API";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
  height: 336px;
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
  margin: 38px 0 20px 0;
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
      <Card
        title={`${JSON.parse(localStorage.getItem('IsMentorMode')) ? '멘토' : '멘티'} 프로필`}
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
        <VerticalFlex style={{ alignItems: 'center' }}>
          <ProfileImg src={testMentorImage} alt="profile-image" />
          <Flex>
            {isEditing ? <TextField
              variant="standard"
              value={nickName}
              onChange={(e) => {
                setNickName(e.target.value)
              }}
            ></TextField> : <TextSubtitle1>{nickName}</TextSubtitle1>}
          </Flex>
        </VerticalFlex>



      </Card>
    </UserProfileCardWrapper >

  );
}

export default UserProfile;
