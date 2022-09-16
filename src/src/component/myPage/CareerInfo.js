import { Divider, styled, } from "@mui/material";

import {
  Flex,
  RowAlignCenterFlex,
  TextButton,
  TextSubtitle2,
  TextBody2,
  EmptyHeight,
  LinkNoDeco,
  colorBackgroundGrayLight,
  colorTextLight
} from "util/styledComponent";
import { Card } from "util/Card";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate } from "react-router-dom";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
`;

const SubtitleWarpper = styled(RowAlignCenterFlex)`
  margin-top: 20px;
`
const CustomTextSubtitle2 = styled(TextSubtitle2)`
  margin-right: 20px;
`

function CareerInfo() {
  const navigate = useNavigate()
  return (
    <UserProfileCardWrapper>
      <Card title={'경력 정보'} titleTail={
        <CustomButton
          id='edit'
          width={'82px'}
          height={'48px'}
          background_color={colorBackgroundGrayLight}
          custom_color={colorTextLight}
          onClick={() => { navigate('/mentor/mypage/career/change') }}
        >수정</CustomButton>
      }>
        <SubtitleWarpper>
          <CustomTextSubtitle2>직장명</CustomTextSubtitle2>
          <TextBody2>다파다</TextBody2>
        </SubtitleWarpper>

        <SubtitleWarpper>
          <CustomTextSubtitle2>직무</CustomTextSubtitle2>
          <TextBody2>UI/UX 디자인</TextBody2>
        </SubtitleWarpper>

        <SubtitleWarpper>
          <CustomTextSubtitle2>사내 직무명</CustomTextSubtitle2>
          <TextBody2>디자이너</TextBody2>
        </SubtitleWarpper>

        <SubtitleWarpper>
          <CustomTextSubtitle2>부서</CustomTextSubtitle2>
          <TextBody2>디자인팀</TextBody2>
        </SubtitleWarpper>

        <SubtitleWarpper>
          <CustomTextSubtitle2>재직여부</CustomTextSubtitle2>
          <TextBody2>현직자</TextBody2>
        </SubtitleWarpper>

      </Card>
    </UserProfileCardWrapper >

  );
}

export default CareerInfo;
