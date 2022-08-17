import { useState } from "react";
import RequestView from "../component/mentor/apply/RequestView";
import { Card } from "../util/Card";
import { CircleImg, ColumnAlignCenterFlex, EmptyHeight, Flex, GrayBackground, TextBody1, TextCaption, TextHeading4, TextSubtitle1, VerticalFlex } from "../util/styledComponent";
import testMentorImage from "assets/img/testMentorImage.png";

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

import 'react-reflex/styles.css'
import styled from "styled-components";
import { Button } from "@mui/material";
import { CustomButton } from 'util/Custom/CustomButton'


const APP_ID = '825BA0D4-461A-4AA3-9A79-D2DD587356A2'
const ACCESS_TOKENS = { test1: 'c06fcab96416a74e41416559426b251676a817ef', test2: '13f0bfb48a1df6372ea0fe8b72cde9a01e2d1373' }

const ProfileImg = styled(CircleImg)`
  width: 120px;
  height: 120px;
  margin: 20px 0;
`;

function Session() {

  // (window.RTCPeerConnection) ? alert('supported') : alert('not supported')

  let USER_ID = ''
  // Sendbird.init(APP_ID, USER_ID, ACCESS_TOKEN)

  const [calleeId, setCalleeId] = useState('')
  const [call, setCall] = useState('')



  return (
    <GrayBackground>
      <ReflexContainer orientation="vertical" style={{ height: 'calc(100vh - 300px)' }}>

        <ReflexElement className="left-pane" maxSize="350">
          <VerticalFlex style={{ width: 'calc(100% - 96px)', paddingLeft: 24, paddingTop: 24, height: '90%', justifyContent: 'space-between' }}>
            <Card no_divider={'true'} style={{ height: '50%', justifyContent: 'center' }}>
              <ColumnAlignCenterFlex >
                <ProfileImg src={testMentorImage} alt="profile-image" />
                <TextSubtitle1>꿈꾸는디자이너 멘티</TextSubtitle1>
              </ColumnAlignCenterFlex>
            </Card>
            <EmptyHeight height={'30px'} />
            <Card no_divider={'true'} style={{ height: '50%', justifyContent: 'center' }}>
              <ColumnAlignCenterFlex>
                <ProfileImg src={testMentorImage} alt="profile-image" />
                <TextSubtitle1>꿈꾸는디자이너 멘토</TextSubtitle1>
                <TextBody1>다파다 · 디자인팀 · UI/UX 디자인</TextBody1>
              </ColumnAlignCenterFlex>
            </Card>
          </VerticalFlex>


        </ReflexElement>

        <ReflexSplitter />

        <ReflexElement className="right-pane" >
          <div style={{ padding: 24 }}>
            <RequestView style={{ width: '100%', padding: 24 }}>
            </RequestView>
          </div>
        </ReflexElement>

      </ReflexContainer>

      <EmptyHeight height={'30px'} />

      <Flex style={{ width: '100%', padding: '0 24px 0 24px', boxSizing: 'border-box' }}>
        <Card no_divider={'true'} >
          <Flex style={{ justifyContent: 'space-between', width: '100%' }}>
            <VerticalFlex>
              <TextCaption style={{ fontWeight: '400' }}>
                남은 시간
              </TextCaption>
              <TextHeading4> 20:00</TextHeading4>
            </VerticalFlex>
            <Flex>
              <Button>mic</Button>
              <Button>menu</Button>
            </Flex>
            <CustomButton> 상담종료 </CustomButton>
          </Flex>
        </Card>
      </Flex>
      <EmptyHeight height={'30px'} />


    </GrayBackground >

  );
}

export default Session;
