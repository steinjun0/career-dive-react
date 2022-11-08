import { useEffect, useState } from "react";
import RequestView from "../../component/mentor/apply/RequestView";
import { Card } from "../../util/Card";
import { CircleImg, ColumnAlignCenterFlex, EmptyHeight, Flex, GrayBackground, TextBody1, TextCaption, TextHeading4, TextSubtitle1, VerticalFlex, colorBackgroundGrayLight, EmptyWidth, colorCareerDivePink, colorBackgroundCareerDivePink, colorTextDisabled } from "../../util/styledComponent";
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
import { createDateFromHourMin } from "util/util";



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
  let mentorId;
  let menteeId;
  const [call, setCall] = useState('no call')
  const [consultData, setConsultData] = useState()
  const [isMicOn, setIsMicOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isLocalScreenShowing, setIsLocalScreenShowing] = useState(false)
  const [isRemoteScreenShowing, setIsRemoteScreenShowing] = useState(false)
  const [isScreenShowing, setIsScreenShowing] = useState(false)

  const [menteeData, setMenteeData] = useState()
  const [mentorData, setMentorData] = useState()

  const [endDate, setEndDate] = useState()
  const [leftTime, setLeftTime] = useState()
  const [intervalId, setIntervalId] = useState()


  useEffect(async () => {
    await API.getConsult(params.id).then((res) => {
      if (res.status === 200) {
        if (+res.data.MenteeID === +localStorage.getItem("UserID")) {
          calleeId = res.data.MentorID
        } else {
          calleeId = res.data.MenteeID
        }
        menteeId = res.data.MenteeID
        mentorId = res.data.MentorID
        setConsultData(res.data)

        const [_, tempEndDate] = createDateFromHourMin(res.data.Date, res.data.StartTime, res.data.EndTime)
        setEndDate(tempEndDate)

        // const tempIntervalId = setInterval(() => {
        //   setLeftTime(new Date(tempEndDate.getTime() - new Date().getTime()))
        //   console.log('tempEndDate.getTime() - new Date().getTime()', tempEndDate.getTime() - new Date().getTime() - 149132473)
        //   if (tempEndDate.getTime() - new Date().getTime() - 149132473 <= 0) {
        //     clearInterval(tempIntervalId)
        //     if (call !== 'no call') API.Sendbird.stopCalling(call)
        //     alert('통화가 종료되었습니다')
        //     navigater(`/review/${params.id}`)
        //   }
        // }, 1000);
        // setIntervalId(tempIntervalId)
      }
    })


    API.getAccountMentee(menteeId).then((res) => {
      if (res.status === 200) {
        setMenteeData(res.data)
      }
    })


    API.getAccountMentor(mentorId).then((res) => {
      if (res.status === 200) {
        setMentorData(res.data)
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
    if (call !== 'no call') {
      API.Sendbird.stopCalling(call)
    }
    if (intervalId !== undefined) {
      clearInterval(intervalId)
    }
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
      </Flex>

      <ReflexContainer orientation="vertical" style={{ height: 'calc(100vh - 300px)' }}>
        <ReflexElement className="left-pane" >
          <div style={{ padding: 24 }}>
            {consultData !== undefined &&
              <RequestView
                consultData={consultData}
                menteeIntroduce={menteeData && menteeData.Introduction}
                urlLink={menteeData && menteeData.Link}
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
                  <TextSubtitle1>{menteeData && menteeData.User && menteeData.User.Nickname}</TextSubtitle1>
                </ColumnAlignCenterFlex>
              </Card>
              <EmptyHeight height={'30px'} />
              <Card no_divider={'true'} style={{ height: '50%', justifyContent: 'center' }}>
                <ColumnAlignCenterFlex>
                  <ProfileImg src={testMentorImage} alt="profile-image" />
                  <TextSubtitle1>{mentorData && mentorData.Nickname}</TextSubtitle1>
                  <TextBody1>{mentorData && mentorData.CompName} · {mentorData && mentorData.DivisInComp} · {mentorData && mentorData.Job}</TextBody1>
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
              <TextHeading4>{leftTime && `${leftTime.getMinutes()}:${leftTime.getSeconds()}`}</TextHeading4>
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
                navigater(`/review/${params.id}`)
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
