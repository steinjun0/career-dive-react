import { useEffect, useState } from "react";
import RequestView from "../component/mentor/apply/RequestView";
import { Card } from "../util/Card";
import { CircleImg, ColumnAlignCenterFlex, EmptyHeight, Flex, GrayBackground, TextBody1, TextCaption, TextHeading4, TextSubtitle1, VerticalFlex, colorBackgroundGrayLight, EmptyWidth, colorCareerDivePink, colorBackgroundCareerDivePink, colorTextDisabled } from "../util/styledComponent";
import testMentorImage from "assets/img/testMentorImage.png";
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';
import StopScreenShareOutlinedIcon from '@mui/icons-material/StopScreenShareOutlined';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

import 'react-reflex/styles.css'
import styled from "styled-components";
import { Button, IconButton } from "@mui/material";
import { CustomButton } from 'util/Custom/CustomButton'
import { useNavigate, useParams } from "react-router-dom";
import API from "API"
import { usePrompt } from "util/usePromprt";



const ProfileImg = styled(CircleImg)`
  width: 120px;
  height: 120px;
  margin: 20px 0;
`;

function Session() {
  const params = useParams()
  const navigater = useNavigate()
  // (window.RTCPeerConnection) ? alert('supported') : alert('not supported')

  let calleeId = -1;
  const [call, setCall] = useState('no call')
  const [consultData, setConsultData] = useState()
  const [isMentor, setIsMentor] = useState()
  const [isMicOn, setIsMicOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isLocalScreenShowing, setIsLocalScreenShowing] = useState(false)
  const [isRemoteScreenShowing, setIsRemoteScreenShowing] = useState(false)
  const [isScreenShowing, setIsScreenShowing] = useState(false)


  useEffect(async () => {
    await API.getConsult(params.id).then((res) => {
      if (res.status === 200) {
        if (+res.data.MenteeID === +localStorage.getItem("UserID")) {
          calleeId = res.data.MentorID
          setIsMentor(false)
        } else {
          calleeId = res.data.MenteeID
          setIsMentor(true)
        }
        setConsultData(res.data)
      }
    })

    // params.id
    API.Sendbird.initSendbird()
    await API.Sendbird.checkAuth(+localStorage.getItem("UserID"), localStorage.getItem("SendbirdToken"))
    API.Sendbird.connectWebSocket().then(() => {
      setTimeout(() => {
        API.Sendbird.makeACall(calleeId, setCall)
      }, 1000)

    })
    API.Sendbird.addEventHandler()
    API.Sendbird.receiveACall(setCall)

  }, [])

  usePrompt('dd', true, () => {
    if (call !== 'no call') API.Sendbird.stopCalling(call)
  })

  return (
    <GrayBackground>
      {/* <CustomButton onClick={() => {
        console.log('calleeId', calleeId)
        API.Sendbird.makeACall(calleeId, setCall)
      }}>입장하기</CustomButton>

      <CustomButton onClick={() => {
        console.log('call', call)
      }}>console.log(call)출력</CustomButton>

      <CustomButton onClick={() => {
        call.startScreenShare();
      }}>화면공유 시작</CustomButton>

      <CustomButton onClick={() => {
        call.stopVideo();
      }}>stop video</CustomButton> */}
      <Flex style={{ margin: '16px auto 0 24px', color: colorTextDisabled }}>
        <TextHeading4 style={{ fontFamily: 'Noto Sans KR' }}>커리어다이브</TextHeading4>
        <Flex>
          isScreenShowing: {`${isScreenShowing}`}<br></br>
          isLocalScreenShowing: {`${isLocalScreenShowing}`}<br></br>
          isRemoteScreenShowing: {`${isRemoteScreenShowing}`}<br></br>
        </Flex>
      </Flex>

      <ReflexContainer orientation="vertical" style={{ height: 'calc(100vh - 300px)' }}>
        <ReflexElement className="left-pane" >
          <div style={{ padding: 24 }}>
            {consultData &&
              <RequestView
                requestContent={consultData.RequestContent}
                style={{ width: '100%', padding: 24 }} />}
          </div>
        </ReflexElement>
        <ReflexSplitter style={{ margin: 'auto 0' }} />
        <ReflexElement className="right-pane" maxSize={isScreenShowing ? undefined : '350'}>
          <VerticalFlex style={{ width: 'calc(100% - 96px)', paddingLeft: 24, height: isScreenShowing ? '100%' : 0, justifyContent: 'center' }}>
            <Flex style={{ height: (isScreenShowing && isLocalScreenShowing) ? undefined : 0 }}>
              <video id="local_video_element_id" autoPlay muted width={'100%'} />
            </Flex>

            <Flex style={{ height: (isScreenShowing && isRemoteScreenShowing) ? undefined : 0 }}>
              <video id="remote_video_element_id" autoPlay width={'100%'} />
            </Flex>
          </VerticalFlex>

          {!isScreenShowing && !isLocalScreenShowing && !isRemoteScreenShowing &&
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
            </VerticalFlex>}
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
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '48px', padding: 0 }}
                onClick={() => {
                  if (isMicOn) {
                    call.muteMicrophone();
                  } else {
                    call.unmuteMicrophone();
                  }
                  setIsMicOn(!isMicOn)
                }}>
                {isMicOn ? <MicNoneOutlinedIcon /> : <MicOffOutlinedIcon />}
              </Button>
              <EmptyWidth width={'16px'} />
              {/* <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '48px', padding: 0 }}
                onClick={async () => {
                  if (isMentor) {
                    try {
                      if (isScreenSharing) {
                        call.stopVideo();
                        call.stopScreenShare();
                      } else {
                        const res = await call.startScreenShare();
                        call.startVideo();
                      }
                    } catch (error) {
                      alert('통화가 연결되지 않았습니다! 상대방이 들어오지 않았다면 기다려주세요.')
                    }

                  }
                  setIsScreenSharing(!isScreenSharing)
                }}>
                {isScreenSharing ? <ScreenShareOutlinedIcon /> : <StopScreenShareOutlinedIcon />}
              </Button> */}
              <EmptyWidth width={'16px'} />
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '48px', padding: 0 }}
                onClick={async () => {
                  try {
                    if (isScreenSharing) {
                      call.stopVideo();
                      call.stopScreenShare();
                      setIsScreenSharing(false)

                      setIsScreenShowing(false)
                      setIsLocalScreenShowing(false)
                      setIsRemoteScreenShowing(false)
                    } else {
                      const res = await call.startScreenShare();
                      call.startVideo();
                      setIsScreenSharing(true)

                      setIsScreenShowing(true)
                      setIsLocalScreenShowing(true)
                      setIsRemoteScreenShowing(false)
                    }
                  } catch (error) {
                    alert('통화가 연결되지 않았습니다! 상대방이 들어오지 않았다면 기다려주세요.')
                  }
                }}>
                내 화면 공유하기(토글)
              </Button>
              <EmptyWidth width={'16px'} />
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '48px', padding: 0 }}
                onClick={async () => {
                  setIsScreenShowing(true)
                  setIsLocalScreenShowing(true)
                  setIsRemoteScreenShowing(false)
                }}>
                내 화면 보기
              </Button>
              <EmptyWidth width={'16px'} />
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '48px', padding: 0 }}
                onClick={async () => {
                  setIsScreenShowing(true)
                  setIsLocalScreenShowing(false)
                  setIsRemoteScreenShowing(true)
                }}>
                상대방 화면 보기
              </Button>
              <EmptyWidth width={'16px'} />
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '48px', padding: 0 }}
                onClick={async () => {
                  setIsScreenShowing(false)
                  setIsLocalScreenShowing(false)
                  setIsRemoteScreenShowing(false)
                }}>
                기본 화면 보기
              </Button>
              <EmptyWidth width={'16px'} />
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '48px', padding: 0 }}>
                <MoreVertIcon />
              </Button>


            </Flex>
            <CustomButton custom_color={colorCareerDivePink} background_color={colorBackgroundCareerDivePink}
              onClick={() => {
                navigater(-1)
              }}
            > 상담 종료 </CustomButton>
          </Flex>
        </Card>
      </Flex>
      <EmptyHeight height={'30px'} />


    </GrayBackground >

  );
}

export default Session;
