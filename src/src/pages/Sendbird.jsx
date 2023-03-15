import { TextField } from "@mui/material";
import { useState } from "react";
import SendBirdCall from "sendbird-calls";
import { CustomButton } from "util/Custom/CustomButton";
import { Flex } from "util/styledComponent";
const APP_ID = '825BA0D4-461A-4AA3-9A79-D2DD587356A2'
const ACCESS_TOKENS = { test1: 'c06fcab96416a74e41416559426b251676a817ef', test2: '13f0bfb48a1df6372ea0fe8b72cde9a01e2d1373' }

function checkAuth(USER_ID, ACCESS_TOKEN) {
  // Authentication
  const authOption = { userId: USER_ID, accessToken: ACCESS_TOKEN };

  SendBirdCall.authenticate(authOption, (res, error) => {
    if (error) {
      // auth failed
      alert('auth fail')
    } else {
      // auth succeeded
      alert('auth success')

    }
  });
}

function connectWebSocket() {
  // Websocket Connection
  SendBirdCall.connectWebSocket()
    .then(/* connect succeeded */)
    .catch(/* connect failed */);
}

function addEventHandler() {
  SendBirdCall.addListener(1, {
    onRinging: (call) => {
      alert('onRinging')
    },
    onAudioInputDeviceChanged: (currentDevice, availableDevices) => {
      alert('onAudioInputDeviceChanged')
    },
    onAudioOutputDeviceChanged: (currentDevice, availableDevices) => {
      alert('onAudioOutputDeviceChanged')
    },
    onVideoInputDeviceChanged: (currentDevice, availableDevices) => {
      alert('onVideoInputDeviceChanged')
    }
  });
}

function makeACall(calleeId) {
  const dialParams = {
    userId: calleeId,
    isVideoCall: true,
    callOption: {
      localMediaView: document.getElementById('local_video_element_id'),
      remoteMediaView: document.getElementById('remote_video_element_id'),
      audioEnabled: true,
      videoEnabled: true
    }
  };

  const call = SendBirdCall.dial(dialParams, (call, error) => {
    if (error) {
      // dial failed
      alert('dial failed')
      console.log(error)
    }
    else {
      alert('dial succeeded')
    }

    // dial succeeded
  });

  call.onEstablished = (call) => {
    alert('established!')
  };

  call.onConnected = (call) => {
    alert('onConnected!')
  };

  call.onEnded = (call) => {
    alert('onEnded!')
  };

  call.onRemoteAudioSettingsChanged = (call) => {
    alert('onRemoteAudioSettingsChanged!')
  };

  call.onRemoteVideoSettingsChanged = (call) => {
    alert('onRemoteVideoSettingsChanged!')
  };
}

function receiveACall(setCall) {
  SendBirdCall.addListener(2, {
    onRinging: (call) => {
      call.onEstablished = (call) => {
        alert('established!')
      };

      call.onConnected = (call) => {
        alert('onConnected!')
      };

      call.onEnded = (call) => {
        alert('onEnded!')
      };

      call.onRemoteAudioSettingsChanged = (call) => {
        alert('onRemoteAudioSettingsChanged!')
      };

      call.onRemoteVideoSettingsChanged = (call) => {
        alert('onRemoteVideoSettingsChanged!')
      };

      const acceptParams = {
        callOption: {
          localMediaView: document.getElementById('local_video_element_id'),
          remoteMediaView: document.getElementById('remote_video_element_id'),
          audioEnabled: true,
          videoEnabled: true
        }
      };

      call.accept(acceptParams);
      console.log('call', call)
      setCall(call)
    }
  });
}

function Sendbird() {

  // (window.RTCPeerConnection) ? alert('supported') : alert('not supported')

  let USER_ID = ''
  SendBirdCall.init(APP_ID)

  const [calleeId, setCalleeId] = useState('')
  const [call, setCall] = useState('')

  return (
    <div >
      <Flex>
        <CustomButton onClick={() => { USER_ID = 'test1' }}>test1</CustomButton>
        <CustomButton onClick={() => { USER_ID = 'test2' }}>test2</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { checkAuth(USER_ID, ACCESS_TOKENS[USER_ID]) }}>auth</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { connectWebSocket() }}>connect WebSocket</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { addEventHandler() }}>addEventHandler</CustomButton>
      </Flex>

      <Flex>
        <TextField
          placeholder="setCalleeID"
          onChange={(e) => {
            setCalleeId(e.target.value)
          }}>
        </TextField>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { makeACall(calleeId) }}>make a call</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { receiveACall(setCall) }}>receiveACall</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => {
          console.log(call)
          call.startVideo()
        }}>startVideo</CustomButton>
        <CustomButton onClick={() => { call.stopVideo(); }}>stopVideo</CustomButton>
      </Flex>



      <Flex>
        local_video_element_id
        <video id="local_video_element_id" autoPlay />
      </Flex>

      <Flex>
        remote_video_element_id
        <video id="remote_video_element_id" autoPlay />
      </Flex>


    </div>
  );
}

export default Sendbird;
