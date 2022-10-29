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
  colorTextLight,
  VerticalFlex
} from "util/styledComponent";
import { Card } from "util/Card";
import { CustomButton } from "util/Custom/CustomButton";
import { useNavigate } from "react-router-dom";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
  height: 336px;
`;

const SubtitleWarpper = styled(RowAlignCenterFlex)`
  margin-top: 20px;
`
const CustomTextSubtitle2 = styled(TextSubtitle2)`
  margin-right: 20px;
`

function CareerInfo({ mentorData }) {
  const navigate = useNavigate()
  return (
    <UserProfileCardWrapper>
      <Card
        title={'경력 정보'}
      // titleTail={
      //   <CustomButton
      //     id='edit'
      //     width={'82px'}
      //     height={'48px'}
      //     background_color={colorBackgroundGrayLight}
      //     custom_color={colorTextLight}
      //     onClick={() => { navigate('/mentor/mypage/career/change') }}
      //   >수정</CustomButton>
      // }
      >
        {mentorData && <VerticalFlex style={{ height: '100%' }}>
          <SubtitleWarpper>
            <CustomTextSubtitle2>직장명</CustomTextSubtitle2>
            <TextBody2>{mentorData.CompName}</TextBody2>
          </SubtitleWarpper>

          <SubtitleWarpper>
            <CustomTextSubtitle2>직무</CustomTextSubtitle2>
            <TextBody2>{mentorData.Job}</TextBody2>
          </SubtitleWarpper>

          <SubtitleWarpper>
            <CustomTextSubtitle2>사내 직무명</CustomTextSubtitle2>
            <TextBody2>{mentorData.JobInComp}</TextBody2>
          </SubtitleWarpper>

          {mentorData.DivisIsPub && <SubtitleWarpper>
            <CustomTextSubtitle2>부서</CustomTextSubtitle2>
            <TextBody2>{mentorData.DivisInComp}</TextBody2>
          </SubtitleWarpper>}

          <SubtitleWarpper>
            <CustomTextSubtitle2>재직여부</CustomTextSubtitle2>
            <TextBody2>{mentorData.InService ? '현직자' : '경력자'}</TextBody2>
          </SubtitleWarpper>
        </VerticalFlex>}


      </Card>
    </UserProfileCardWrapper >

  );
}

export default CareerInfo;
