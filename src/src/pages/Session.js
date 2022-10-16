import { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import API from "API"
import { usePrompt } from "util/usePromprt";


const ProfileImg = styled(CircleImg)`
  width: 120px;
  height: 120px;
  margin: 20px 0;
`;

function Session() {
  const params = useParams()
  // (window.RTCPeerConnection) ? alert('supported') : alert('not supported')

  const [calleeId, setCalleeId] = useState('')
  const [call, setCall] = useState('no call')
  const [consultData, setConsultData] = useState()


  useEffect(async () => {

    await API.getConsult(params.id).then((res) => {
      if (res.status === 200) {
        if (+res.data.MenteeID === +localStorage.getItem("UserID")) {
          setCalleeId(res.data.MentorID)
        } else {
          setCalleeId(res.data.MenteeID)
        }
        setConsultData(res.data)
      }
    })


    // params.id
    API.Sendbird.initSendbird()
    await API.Sendbird.checkAuth(+localStorage.getItem("UserID"), localStorage.getItem("SendbirdToken"))
    API.Sendbird.connectWebSocket()
    API.Sendbird.addEventHandler()
    API.Sendbird.receiveACall(setCall)
  }, [])

  usePrompt('dd', true, () => {
    if (call !== 'no call') API.Sendbird.stopCalling(call)
  })

  return (
    <GrayBackground>
      <CustomButton onClick={() => {
        API.Sendbird.makeACall(calleeId, setCall)
      }}>2</CustomButton>

      <CustomButton onClick={() => {
        console.log('call', call)
      }}>3</CustomButton>

      <Flex style={{ height: 0 }}>
        <video id="1" autoPlay muted />
      </Flex>

      <Flex style={{ height: 0 }}>
        <video id="2" autoPlay />
      </Flex>
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
            {consultData && <RequestView requestContent={consultData.RequestContent} style={{ width: '100%', padding: 24 }}>
            </RequestView>}
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
              <TextHeading4>20:00</TextHeading4>
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
