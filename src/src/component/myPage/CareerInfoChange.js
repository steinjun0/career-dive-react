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
  TextSubtitle2,
  VerticalFlex
} from "util/styledComponent";
import { Card } from "util/Card";
import { CustomButton } from "util/Custom/CustomButton";
import { CustomTextField } from 'util/Custom/CustomTextField';
import { useState } from "react";
import SimpleMenu from "util/SimpleMenu";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { CustomToggleButton, onChangeToggle } from "util/Custom/CutomToggleButton";
import { Navigate, useNavigate } from "react-router-dom";

const UserProfileCardWrapper = styled(Flex)`
  margin-bottom: 38px;
  justify-content:start;
`;

export const TextFieldWrapper = styled(Flex)`
  margin-top: 20px;
  width: 100%;
`;

function CareerInfoChange() {
  const navigate = useNavigate()

  const [inService, setInService] = useState(true)
  const [job, setJob] = useState('')
  const [jobInComp, setJobInComp] = useState('')
  const [divisInComp, setDivisInComp] = useState('')
  const [divisIsPub, setDivisIsPub] = useState(true)
  const [tagsString, setTagsString] = useState('')
  const [tags, setTags] = useState([])

  const mentorInfoState = {
    inService, setInService, job, setJob, jobInComp, setJobInComp, divisInComp, setDivisInComp,
    divisIsPub, setDivisIsPub, tagsString, setTagsString, tags, setTags
  }

  const isEditing = (value) => {
    return value !== ''
  }
  return (
    <UserProfileCardWrapper>
      <Card title={'경력 정보 수정'} no_divider={'false'} max_width={'583px'}>
        <EmptyHeight height={'28px'} />
        <VerticalFlex>
          <Flex>
            <TextSubtitle2>
              직장명
            </TextSubtitle2>
            <EmptyWidth width={'20px'} />
            <TextBody2>
              (주)다파다
            </TextBody2>
          </Flex>
          <EmptyHeight height={'8px'} />
          <Flex>
            <TextSubtitle2>
              재직여부
            </TextSubtitle2>
            <EmptyWidth width={'20px'} />
            <TextBody2>
              현직자
            </TextBody2>
          </Flex>
          <EmptyHeight height={'28px'} />
          <CustomButton height={'48px'} onClick={() => { navigate('/mentor/register') }}>재직 재인증</CustomButton>
        </VerticalFlex>
        <EmptyHeight height={'28px'} />
        <Divider></Divider>
        <EmptyHeight height={'28px'} />
        <VerticalFlex>
          <TextSubtitle2>직무</TextSubtitle2>
          <EmptyHeight height={'28px'} />
          <Flex style={{ width: '100%' }}>
            <SimpleMenu
              width={'100%'}
              title={<TextBody2>{mentorInfoState.job === '' ? '선택' : mentorInfoState.job}</TextBody2>}
              font
              style={{ width: '100%', height: '48px', backgroundColor: colorBackgroundGrayLight, justifyContent: 'space-between', padding: '10px 20px ' }}
              menuItems={['딸기우유']}
              setState={mentorInfoState.setJob}
              endIcon={<KeyboardArrowDownIcon color={colorTextLight} />}
              onClickProps={() => { }}></SimpleMenu>
            <EmptyWidth width={'16px'} />
            <CustomButton width={'82px'}>저장</CustomButton>
          </Flex>
        </VerticalFlex>
        <EmptyHeight height={'28px'} />
        <VerticalFlex>
          <TextSubtitle2>사내 직무명</TextSubtitle2>
          <EmptyHeight height={'16px'} />
          <Flex>
            <CustomTextField
              onChange={(event) => { mentorInfoState.setJobInComp(event.target.value) }}
              variant="filled"
              InputProps={{ disableUnderline: true, }}
              fullWidth={true}
              margin="dense"
              size="small"
              hiddenLabel
              placeholder="최대 10자"
            />
            <EmptyWidth width={'16px'} />
            <CustomButton width={'82px'}>저장</CustomButton>
          </Flex>
        </VerticalFlex>
        <EmptyHeight height={'28px'} />
        <VerticalFlex>
          <TextSubtitle2>부서</TextSubtitle2>
          <EmptyHeight height={'16px'} />
          <Flex>
            <CustomTextField
              onChange={(event) => { mentorInfoState.setJobInComp(event.target.value) }}
              variant="filled"
              InputProps={{ disableUnderline: true, }}
              fullWidth={true}
              margin="dense"
              size="small"
              hiddenLabel
              placeholder="최대 10자"
            />
            <EmptyWidth width={'16px'} />
            <CustomButton width={'82px'}>저장</CustomButton>
          </Flex>
        </VerticalFlex>

        <EmptyHeight height={'28px'} />

        <VerticalFlex>
          <Flex style={{ alignItems: 'center' }}>
            <TextSubtitle2>부서 공개 여부</TextSubtitle2>
            <EmptyWidth width={'20px'} />
            <CustomToggleButton
              checked={mentorInfoState.divisIsPub}
              onChange={(e) => { onChangeToggle(e, mentorInfoState.divisIsPub, mentorInfoState.setDivisIsPub) }}
            />
            <EmptyWidth width={'8px'} />
            <TextBody2 color={colorCareerDiveBlue}>공개</TextBody2>
          </Flex>
        </VerticalFlex>

      </Card>
    </UserProfileCardWrapper >

  );
}

export default CareerInfoChange;
