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
import OppositeScreenOpacityIcon from "assets/icon/oppositeScreenOpacity.svg";
import MyScreenIcon from "assets/icon/myScreen.svg";
import MyScreenOpacityIcon from "assets/icon/myScreenOpacity.svg";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
import { addMinute, createDateFromHourMin } from "util/util";



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
  const [amIMentor, setAmIMentor] = useState(false);
  const [isMentorIn, setIsMentorIn] = useState(false);
  const [isMenteeIn, setIsMenteeIn] = useState(false);
  const isMentorInRef = useRef(false);
  const isMenteeInRef = useRef(false);

  const [call, setCall] = useState('no call')
  const callRef = useRef('no call')
  const [consultData, setConsultData] = useState()
  const [isMicOn, setIsMicOn] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isLocalScreenShowing, setIsLocalScreenShowing] = useState(false)
  const [isRemoteScreenShowing, setIsRemoteScreenShowing] = useState(false)
  const [isScreenShowing, setIsScreenShowing] = useState(false)
  const [isSelectingMonitor, setIsSelectingMonitor] = useState(false)


  const [menteeData, setMenteeData] = useState()
  const [mentorData, setMentorData] = useState()

  const [endDate, setEndDate] = useState()
  const [leftTime, setLeftTime] = useState()
  const [intervalId, setIntervalId] = useState()



  useEffect(() => {
    async function getConsultData() {
      const amIMentor = (JSON.parse(localStorage.getItem('IsMentorMode')) === true)
      if (JSON.parse(localStorage.getItem('IsMentorMode')) === true) {
        setAmIMentor(true)
        setIsMentorIn(true)
        isMentorInRef.current = true;
      } else {
        setIsMenteeIn(true)
        isMenteeInRef.current = true;
      }


      let consultRes = await API.getConsult(params.id).then((res) => {
        if (res.status === 200) {
          if (+res.data.MenteeID === +localStorage.getItem("UserID")) {
            calleeId = res.data.MentorID
          } else {
            calleeId = res.data.MenteeID
          }
          menteeId = res.data.MenteeID
          mentorId = res.data.MentorID
          setConsultData(res.data)

          let [tempStartDate, tempEndDate] = createDateFromHourMin(res.data.Date, res.data.StartTime, res.data.EndTime)
          tempEndDate = addMinute(tempEndDate, 5)
          setEndDate(tempEndDate)

          const tempIntervalId = setInterval(() => {
            let tempLeftTime = new Date(tempEndDate.getTime() - new Date().getTime())
            const tempPassTime = new Date(new Date().getTime() - tempStartDate.getTime())

            const tempLeftHour = Math.floor((tempLeftTime) / 1000 / 60 / 60)
            const tempLeftMin = Math.floor((tempLeftTime) / 1000 / 60)
            const tempLeftSecond = Math.floor((tempLeftTime) / 1000 % 60)
            tempLeftTime.setHours(tempLeftHour);
            tempLeftTime.setMinutes(tempLeftMin);
            tempLeftTime.setSeconds(tempLeftSecond);
            setLeftTime(tempLeftTime)

            const tempPassHour = Math.floor((tempPassTime) / 1000 / 60 / 60)
            const tempPassMin = Math.floor((tempPassTime) / 1000 / 60)
            const tempPassSecond = Math.floor((tempPassTime) / 1000 % 60)
            // console.log(tempPassHour, tempPassMin, tempPassSecond)
            // console.log('isMentorInRef', isMentorInRef.current, 'isMenteeInRef', isMenteeInRef.current)

            if (tempPassTime.getTime() > 0) {
              // 1분후
              if (tempPassHour === 0 && tempPassMin === 1 && tempPassSecond === 0 && (!isMentorInRef.current || !isMenteeInRef.current)) {
                let tempLatenessParams = { consultId: res.data.ID, menteeLateness: true, mentorLateness: true }
                if (amIMentor) {
                  tempLatenessParams.mentorLateness = false
                } else {
                  tempLatenessParams.menteeLateness = false
                }
                API.postConsultLateness(tempLatenessParams)
              } else if (tempPassHour === 0 && tempPassMin >= 6 && (!isMentorInRef.current || !isMenteeInRef.current)) {
                // 5분59초 후
                let tempNoshowParams = { consultId: res.data.ID, menteeNoshow: true, mentorNoshow: true }
                if (amIMentor) {
                  tempNoshowParams.mentorNoshow = false
                } else {
                  tempNoshowParams.menteeNoshow = false
                }
                API.postConsultNoshow(tempNoshowParams).then(() => {
                  if (amIMentor) {
                    clearInterval(tempIntervalId)
                    if (callRef.current !== 'no call') API.Sendbird.stopCalling(callRef.current)
                    alert('상대방이 입장하지 않아 상담이 종료되었습니다. 멘티')
                    console.log('상대방이 입장하지 않아 상담이 종료되었습니다. 멘티')
                    navigater('/mentor')
                  } else {
                    clearInterval(tempIntervalId)
                    if (callRef.current !== 'no call') API.Sendbird.stopCalling(callRef.current)
                    alert('상대방이 입장하지 않아 상담이 종료되었습니다. 멘토')
                    console.log('상대방이 입장하지 않아 상담이 종료되었습니다. 멘티')
                    navigater(`/mentee/schedule`)
                  }
                })


              } else if (tempEndDate <= new Date()) {
                // API.patchConsultDone(res.data.ID)
                API.postCallDone(callRef.current._callId).then(() => {
                  clearInterval(tempIntervalId)
                  if (call !== 'no call') API.Sendbird.stopCalling(call)
                  alert('통화가 종료되었습니다')

                  if (amIMentor) {
                    navigater(`/mentor`)
                  } else {
                    navigater(`/review/${params.id}`)
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
      await API.Sendbird.checkAuth(+localStorage.getItem("UserID"), localStorage.getItem("SendbirdToken"))
      API.Sendbird.connectWebSocket().then((res) => {
        API.Sendbird.addEventHandler()
        API.Sendbird.receiveACall(
          {
            onReceiveACall: ({ call: callProps }) => {
              setCall(_ => callProps)
              callRef.current = callProps
              if (JSON.parse(localStorage.getItem('IsMentorMode'))) {
                setIsMenteeIn(true)
                isMenteeInRef.current = true;
              }
              else {
                setIsMentorIn(true)
                isMentorInRef.current = true
              }
              API.postCallStart(callProps._callId)
            },
            onEnded: () => {
              console.log('onEnded from receiveACall')
              if (JSON.parse(localStorage.getItem('IsMentorMode'))) {
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
              onMakeACall: ({ call: callProps }) => {
                setCall(_ => callProps)
                callRef.current = callProps
                callProps.stopVideo()
                API.postCallNew(
                  {
                    calleeId: calleeId,
                    callerId: +localStorage.getItem("UserID"),
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
                if (JSON.parse(localStorage.getItem('IsMentorMode'))) {
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


  }, [])




  // usePrompt('dd', true, () => {
  //   console.log('prompt!!!!!', call)
  //   if (call !== 'no call' && call !== undefined) {
  //     API.Sendbird.stopCalling(call)
  //   }
  //   if (intervalId !== undefined) {
  //     clearInterval(intervalId)
  //   }
  // })


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
              <TextHeading4>{leftTime && `${leftTime.getMinutes().toString().padStart(2, '0')}:${leftTime.getSeconds().toString().padStart(2, '0')}`}</TextHeading4>
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
              {/* <Button style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '24px', minWidth: '40px', height: '40px', padding: 0 }}
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
                  } catch (error) {
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
                  if (amIMentor) {
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
