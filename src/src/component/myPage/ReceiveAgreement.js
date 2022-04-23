import { styled } from "@mui/material";

import {
  Flex,
  RowAlignCenterFlex,
  TextSubtitle2,
  TextCaption,
  EmptyWidth,
  WidthFixerWrapper,
  colorCareerDiveBlue,
  colorTextLight
} from "util/styledComponent";
import { CustomToggleButton, onChangeToggle } from 'util/Custom/CutomToggleButton';
import { Card } from "util/Card";
import { useState } from "react";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
`;

const SubtitleWarpper = styled(RowAlignCenterFlex)`
  margin-top: 20px;
`
const CustomTextSubtitle2 = styled(TextSubtitle2)`
  margin-right: 20px;
`

function UserProfile() {
  const [isActivityNotificationPushAgree, setIsActivityNotificationPushAgree] = useState(true);
  const [isMarketingPushAgree, setIsMarketingPushAgree] = useState(false);

  return (
    <UserProfileCardWrapper>
      <Card title={'수신 동의'}>
        <SubtitleWarpper>
          <WidthFixerWrapper width={'193px'}>
            <CustomTextSubtitle2>멘토/멘티 활동 관련 알림 수신</CustomTextSubtitle2>
          </WidthFixerWrapper>
          <CustomToggleButton
            checked={isActivityNotificationPushAgree}
            onChange={(e) => { onChangeToggle(e, isActivityNotificationPushAgree, setIsActivityNotificationPushAgree) }} />
          <EmptyWidth width={'8px'}></EmptyWidth>
          <TextCaption style={{ color: isActivityNotificationPushAgree ? colorCareerDiveBlue : colorTextLight }}>필수</TextCaption>
        </SubtitleWarpper>

        <SubtitleWarpper>
          <WidthFixerWrapper width={'193px'}>
            <CustomTextSubtitle2>혜택 및 마케팅 정보 수신 동의</CustomTextSubtitle2>
          </WidthFixerWrapper>
          <CustomToggleButton checked={isMarketingPushAgree}
            onChange={(e) => { onChangeToggle(e, isMarketingPushAgree, setIsMarketingPushAgree) }} />
          <EmptyWidth width={'8px'}></EmptyWidth>
          <TextCaption style={{ color: isMarketingPushAgree ? colorCareerDiveBlue : colorTextLight }}>선택</TextCaption>
        </SubtitleWarpper>
      </Card>
    </UserProfileCardWrapper >
  );
}

export default UserProfile;
