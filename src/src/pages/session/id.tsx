import { useEffect, useRef, useState } from "react";
import RequestView from "../../component/mentor/apply/RequestView";
import { Card } from "../../util/Card";
import { colorTextLight, CircleImg, ColumnAlignCenterFlex, EmptyHeight, Flex, GrayBackground, TextBody1, TextCaption, TextHeading4, TextSubtitle1, VerticalFlex, colorBackgroundGrayLight, EmptyWidth, colorCareerDivePink, colorBackgroundCareerDivePink, colorTextDisabled, colorBackgroundGrayDark, colorBackgroundGrayMedium, TextSubtitle2, colorBackgroundCareerDiveBlue, TextHeading6, TextHeading5 } from "../../util/styledComponent";
import testMentorImage from "assets/img/testMentorImage.png";
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import ScreenShareOutlinedIcon from '@mui/icons-material/ScreenShareOutlined';
import StopScreenShareOutlinedIcon from '@mui/icons-material/StopScreenShareOutlined';

import ScreenCheckIcon from "assets/icon/screenCheck.svg";
import OppositeScreenIcon from "assets/icon/oppositeScreen.svg";
import MyScreenIcon from "assets/icon/myScreen.svg";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex'

import 'react-reflex/styles.css'
import styled from "styled-components";
import { Button } from "@mui/material";
import { CustomButton } from 'util/Custom/CustomButton'
import { useNavigate, useParams } from "react-router-dom";
import API from "API"
import { addMinuteTs, createDateFromHourMinTs } from "util/util";
import React from "react";



const ProfileImg = styled(CircleImg)`
  width: 120px;
  height: 120px;
  margin: 20px 0;
`;

function Session() {
  const params = useParams()
  const navigater = useNavigate()
  // (window.RTCPeerConnection) ? alert('supported') : alert('not supported')



  const [isMentorIn, setIsMentorIn] = useState<boolean>(false);
  const [isMenteeIn, setIsMenteeIn] = useState<boolean>(false);
  const isMentorInRef = useRef(false);
  const isMenteeInRef = useRef(false);

  const [call, setCall] = useState<any>('no call')
  const callRef = useRef<any>('no call')
  const [consultData, setConsultData] = useState()
  const [isMicOn, setIsMicOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isLocalScreenShowing, setIsLocalScreenShowing] = useState(false)
  const [isRemoteScreenShowing, setIsRemoteScreenShowing] = useState(false)
  const [isScreenShowing, setIsScreenShowing] = useState(false)
  const [isSelectingMonitor, setIsSelectingMonitor] = useState(false)


  const [menteeData, setMenteeData] = useState<any>()
  const [mentorData, setMentorData] = useState<any>()

  const [endDate, setEndDate] = useState<Date>()
  const [leftTime, setLeftTime] = useState<number>()
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setTimeout>>()


  const isMentorMode: boolean = JSON.parse(localStorage.getItem('IsMentorMode')!)
  const userId: number = +localStorage.getItem("UserID")!

  let calleeId: number = -1;
  let mentorId: number = -1;
  let menteeId: number = -1;

  async function getConsultData() {
    if (isMentorMode === true) {
      setIsMentorIn(true)
      isMentorInRef.current = true;
    } else {
      setIsMenteeIn(true)
      isMenteeInRef.current = true;
    }


    let consultRes = await API.getConsult(params.id).then((res) => {
      if (res.status === 200) {
        if (+res.data.MenteeID === userId) {
          calleeId = res.data.MentorID
        } else {
          calleeId = res.data.MenteeID
        }
        menteeId = res.data.MenteeID
        mentorId = res.data.MentorID

        setConsultData(res.data)

        let [tempStartDate, tempEndDate]: Date[] = createDateFromHourMinTs(res.data.Date, res.data.StartTime, res.data.EndTime)
        tempEndDate = addMinuteTs(tempEndDate, 5)
        setEndDate(tempEndDate)

        const tempIntervalId = setInterval(() => {
          let tempLeftTime = tempEndDate.getTime() - new Date().getTime()
          const tempPassTime = new Date().getTime() - tempStartDate.getTime()
          setLeftTime(tempLeftTime)

          if (tempPassTime > 0) {
            // 1분후
            if (~~(tempPassTime / 1000 / 60) === 1 && (!isMentorInRef.current || !isMenteeInRef.current)) {
              let tempLatenessParams = { consultId: res.data.ID, menteeLateness: true, mentorLateness: true }
              if (isMentorMode) {
                tempLatenessParams.mentorLateness = false
              } else {
                tempLatenessParams.menteeLateness = false
              }
              API.postConsultLateness(tempLatenessParams)
            } else if (~~(tempPassTime / 1000 / 60) >= 6 && (!isMentorInRef.current || !isMenteeInRef.current)) {
              // 5분59초 후
              let tempNoshowParams = { consultId: res.data.ID, menteeNoshow: true, mentorNoshow: true }
              if (isMentorMode) {
                tempNoshowParams.mentorNoshow = false
              } else {
                tempNoshowParams.menteeNoshow = false
              }
              API.postConsultNoshow(tempNoshowParams).then(() => {
                if (isMentorMode) {
                  clearInterval(tempIntervalId)
                  if (callRef.current !== 'no call') API.Sendbird.stopCalling(callRef.current)
                  alert('상대방이 입장하지 않아 상담이 종료되었습니다. 멘티')
                  console.log('상대방이 입장하지 않아 상담이 종료되었습니다. 멘티')
                  // navigater('/mentor')
                } else {
                  clearInterval(tempIntervalId)
                  if (callRef.current !== 'no call') API.Sendbird.stopCalling(callRef.current)
                  alert('상대방이 입장하지 않아 상담이 종료되었습니다. 멘토')
                  console.log('상대방이 입장하지 않아 상담이 종료되었습니다. 멘티')
                  // navigater(`/mentee/schedule`)
                }
              })
            } else if (tempEndDate <= new Date()) {
              // API.patchConsultDone(res.data.ID)
              API.postCallDone(callRef.current._callId).then(() => {
                clearInterval(tempIntervalId)
                if (callRef.current !== 'no call') API.Sendbird.stopCalling(callRef.current)
                alert('통화가 종료되었습니다')

                if (isMentorMode) {
                  // navigater(`/mentor`)
                } else {
                  // navigater(`/review/${params.id}`)
                }
              })
            }
          }
        }, 1000);
        setIntervalId(tempIntervalId)
      }
      return res
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
    await API.Sendbird.checkAuth(userId, localStorage.getItem("SendbirdToken"))

    API.Sendbird.connectWebSocket().then((res) => {
      API.Sendbird.addEventHandler()
      API.Sendbird.receiveACall(
        {
          onReceiveACall: ({ call: callProps }: { call: any }) => {
            setCall(() => callProps)
            callRef.current = callProps
            if (isMentorMode) {
              setIsMenteeIn(true)
              isMenteeInRef.current = true;
            }
            else {
              setIsMentorIn(true)
              isMentorInRef.current = true
            }
            API.postCallStart(callProps._callId)
          },
          onEstablished: () => { },
          onEnded: () => {
            console.log('onEnded from receiveACall')
            if (isMentorMode) {
              setIsMenteeIn(false)
              isMenteeInRef.current = false;
            }
            else {
              setIsMentorIn(false)
              isMentorInRef.current = false
            }
          }
        }
      )
      setTimeout(() => {
        callRef.current === 'no call' && API.Sendbird.makeACall(
          {
            calleeId: calleeId,
            onMakeACall: ({ call: callProps }: { call: any }) => {
              setCall(() => callProps)
              callRef.current = callProps
              callProps.stopVideo()
              API.postCallNew(
                {
                  calleeId: calleeId,
                  callerId: userId,
                  consultId: consultRes.data.ID,
                  callId: callProps._callId
                }
              )
            },
            onConnected: () => {
              setIsMenteeIn(true)
              setIsMentorIn(true)
              isMentorInRef.current = true
              isMenteeInRef.current = true;
            },
            onEnded: () => {
              console.log('onEnd from onMakeACall')
              if (isMentorMode) {
                setIsMenteeIn(false)
                isMenteeInRef.current = false;
              }
              else {
                setIsMentorIn(false)
                isMentorInRef.current = false
              }
            }
          }
        )
      }, 1000);
    })
  }
  useEffect(() => {

    getConsultData();

    window.addEventListener('beforeunload',
      function listener(e) {
        e.returnValue = '';
      })


    window.onunload = () => {
      console.log('unload!!!!!!')
      console.log('call', callRef.current)
      if (callRef.current !== 'no call' && callRef.current !== undefined) {
        API.Sendbird.stopCalling(callRef.current)
      }
      if (intervalId !== undefined) {
        clearInterval(intervalId)
      }
    }

    return () => {
      console.log('clearInterval', intervalId)
      clearInterval(intervalId)
    }
  }, [])


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
      <Flex style={{ margin: '16px auto 0 48px', color: colorTextDisabled }}>
        <TextHeading5 style={{ fontFamily: 'Noto Sans KR' }}>커리어다이브</TextHeading5>
      </Flex>

      <ReflexContainer orientation="vertical" style={{ height: 'calc(100vh - 190px)' }}>
        <ReflexElement className="left-pane">
          <div style={{ padding: 24, paddingTop: 12 }}>
            {consultData !== undefined &&
              <RequestView
                consultData={consultData}
                menteeIntroduce={menteeData && menteeData.Introduction}
                urlLink={menteeData && menteeData.Link}
              />}
          </div>
        </ReflexElement>
        <ReflexSplitter style={{ margin: 'auto 0' }} />
        <ReflexElement className="right-pane" maxSize={isScreenShowing ? undefined : 350}>
          <VerticalFlex style={{ width: 'calc(100% - 96px)', paddingLeft: 24, height: isScreenShowing ? '100%' : 0, justifyContent: 'center' }}>
            <Flex style={{ height: (isScreenShowing && isLocalScreenShowing) ? undefined : 0 }}>
              <video id="local_video_element_id" autoPlay muted width={'100%'} />
            </Flex>

            <Flex style={{ height: (isScreenShowing && isRemoteScreenShowing) ? undefined : 0 }}>
              <video id="remote_video_element_id" autoPlay width={'100%'} />
            </Flex>
          </VerticalFlex>

          {!isScreenShowing && !isLocalScreenShowing && !isRemoteScreenShowing &&
            <VerticalFlex style={{ width: 'calc(100% - 96px)', paddingLeft: 24, paddingTop: 12, height: '90%', justifyContent: 'space-between' }}>
              {isMenteeIn && <Card no_divider={'true'} style={{ height: '50%', justifyContent: 'center', marginBottom: '15px' }}>
                <ColumnAlignCenterFlex >
                  <ProfileImg src={testMentorImage} alt="profile-image" />
                  <TextSubtitle1>{menteeData && menteeData.User && menteeData.User.Nickname}</TextSubtitle1>
                </ColumnAlignCenterFlex>
              </Card>}
              {isMentorIn && <Card no_divider={'true'} style={{ height: '50%', justifyContent: 'center', marginTop: '15px' }}>
                <ColumnAlignCenterFlex>
                  <ProfileImg src={testMentorImage} alt="profile-image" />
                  <TextSubtitle1>{mentorData && mentorData.Nickname}</TextSubtitle1>
                  <TextBody1>{mentorData && mentorData.CompName} · {mentorData && mentorData.DivisIsPub && `${mentorData.DivisInComp} · `}{mentorData && mentorData.JobInComp}</TextBody1>
                </ColumnAlignCenterFlex>
              </Card>}
            </VerticalFlex>}
        </ReflexElement>
      </ReflexContainer>

      <EmptyHeight height={'30px'} />

      <Flex style={{ width: '100%', padding: '0 24px 0 24px', boxSizing: 'border-box' }}>
        <Card no_divider={'true'} style={{ padding: '16px 24px' }}>
          <Flex style={{ justifyContent: 'space-between', width: '100%' }}>
            <VerticalFlex style={{ alignItems: 'center' }}>
              <TextCaption style={{ fontWeight: '400' }}>
                남은 시간
              </TextCaption>
              <TextHeading4>{leftTime && `${Math.floor(leftTime / 1000 / 60).toString().padStart(2, '0')}:${Math.floor(leftTime / 1000 % 60).toString().padStart(2, '0')}`}</TextHeading4>
            </VerticalFlex>
            <Flex style={{ alignItems: 'center' }}>
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '40px', height: '40px', padding: 0 }}
                onClick={() => {
                  if (call !== 'no call' && call !== undefined) {
                    if (isMicOn) {
                      call.muteMicrophone();
                    } else {
                      call.unmuteMicrophone();
                    }
                    setIsMicOn(!isMicOn)
                  } else {
                    alert('통화가 연결 되지 않았습니다! 상대방을 기다리거나 새로고침 해주세요.')
                  }

                }}>
                {isMicOn ? <MicNoneOutlinedIcon fontSize="small" /> : <MicOffOutlinedIcon fontSize="small" />}
              </Button>
              <EmptyWidth width={'16px'} />
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '40px', height: '40px', padding: 0 }}
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
                  } catch (error: any) {
                    console.log('error', error.code, error)
                    if (error.code === 1800628) {
                      alert('화면 공유를 취소했거나, 권한을 주지 않았습니다.')
                    } else if (error.code === 1800621) {
                      alert('통화가 아직 연결되지 않았습니다. 몇 초 뒤에 다시 시도하거나, 새로고침 해주세요')
                    } else if (error.toString() === "The browser doesn't support screen share.") {
                      alert('브라우저가 화면 공유를 지원하지 않습니다.')
                    }
                    else {
                      alert('통화가 연결되지 않았습니다! 상대방이 들어오지 않았다면 기다려주세요.')
                    }

                  }
                }}>
                {isScreenSharing ? <ScreenShareOutlinedIcon fontSize="small" /> : <StopScreenShareOutlinedIcon fontSize="small" />}
              </Button>
              <EmptyWidth width={'16px'} />
              <Flex style={{ maxWidth: isSelectingMonitor ? 446 : 115, overflow: 'hidden', borderRadius: 24, transition: 'all ease-in 0.25s' }}>
                <Flex style={{ alignItems: 'center', minWidth: 446, backgroundColor: colorBackgroundGrayLight, borderRadius: '24px' }}>
                  <Button style={{
                    backgroundColor: isSelectingMonitor ? colorBackgroundGrayMedium : colorBackgroundGrayLight,
                    borderRadius: '24px', minWidth: '48px', height: '40px', padding: '0 12px'
                  }}
                    onClick={async () => {
                      setIsSelectingMonitor(!isSelectingMonitor)
                    }}>
                    <img src={ScreenCheckIcon} alt={'screenCheck'} width='20px' />
                    <EmptyWidth width={'8px'} />
                    <TextSubtitle1 color={colorBackgroundGrayDark}>
                      화면 선택
                    </TextSubtitle1>
                  </Button>
                  <EmptyWidth width={'8px'} />
                  <Button style={{ backgroundColor: isRemoteScreenShowing ? colorBackgroundCareerDiveBlue : colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '40px', padding: '0 12px' }}
                    onClick={async () => {
                      setIsScreenShowing(true)
                      setIsLocalScreenShowing(false)
                      setIsRemoteScreenShowing(true)
                    }}>
                    <img src={OppositeScreenIcon} alt={'oppositeScreen'} width='20px' />
                    <EmptyWidth width={'8px'} />
                    <TextSubtitle2 color={colorTextLight}>
                      상대 화면
                    </TextSubtitle2>
                  </Button>

                  <EmptyWidth width={'8px'} />
                  <Button style={{ backgroundColor: isLocalScreenShowing ? colorBackgroundCareerDiveBlue : colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '40px', padding: '0 12px' }}
                    onClick={async () => {
                      setIsScreenShowing(true)
                      setIsLocalScreenShowing(true)
                      setIsRemoteScreenShowing(false)
                    }}>
                    <img src={MyScreenIcon} alt={'oppositeScreen'} width='20px' />
                    <EmptyWidth width={'8px'} />
                    <TextSubtitle2 color={colorTextLight}>
                      내 화면
                    </TextSubtitle2>
                  </Button>
                  <EmptyWidth width={'8px'} />
                  <Button style={{ backgroundColor: !isScreenShowing ? colorBackgroundCareerDiveBlue : colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '40px', padding: '0 12px' }}
                    onClick={async () => {
                      setIsScreenShowing(false)
                      setIsLocalScreenShowing(false)
                      setIsRemoteScreenShowing(false)
                    }}>
                    <RestartAltIcon fontSize="small" />
                    <EmptyWidth width={'8px'} />
                    <TextSubtitle2 color={colorTextLight}>
                      기본 화면
                    </TextSubtitle2>
                  </Button>
                </Flex>
              </Flex>


              {/* <EmptyWidth width={'16px'} />
              <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '48px', height: '40px', padding: '0 12px' }}>
                <MoreVertIcon />
              </Button> */}


            </Flex>
            <CustomButton custom_color={colorCareerDivePink} background_color={colorBackgroundCareerDivePink}
              onClick={() => {
                API.postCallDone(call._callId).then(() => {
                  if (isMentorMode) {
                    navigater(`/mentor`)
                  } else {
                    navigater(`/review/${params.id}`)
                  }
                })
              }}
            > 상담 종료 </CustomButton>
          </Flex>
        </Card>
      </Flex >
      <EmptyHeight height={'30px'} />


    </GrayBackground >

  );
}

export default Session;
