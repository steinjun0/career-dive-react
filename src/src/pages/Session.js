import { TextField } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "util/Custom/CustomButton";
import { Flex } from "util/styledComponent";
import Sendbird from "../util/Sendbird";
const APP_ID = '825BA0D4-461A-4AA3-9A79-D2DD587356A2'
const ACCESS_TOKENS = { test1: 'c06fcab96416a74e41416559426b251676a817ef', test2: '13f0bfb48a1df6372ea0fe8b72cde9a01e2d1373' }

function Session() {

  // (window.RTCPeerConnection) ? alert('supported') : alert('not supported')

  let USER_ID = ''
  // Sendbird.init(APP_ID, USER_ID, ACCESS_TOKEN)

  const [calleeId, setCalleeId] = useState('')
  const [call, setCall] = useState('')

  return (
    <div >
      <Flex>
        <CustomButton onClick={() => { USER_ID = 'test1' }}>test1</CustomButton>
        <CustomButton onClick={() => { USER_ID = 'test2' }}>test2</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { Sendbird.checkAuth(USER_ID, ACCESS_TOKENS[USER_ID]) }}>auth</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { Sendbird.connectWebSocket() }}>connect WebSocket</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { Sendbird.addEventHandler() }}>addEventHandler</CustomButton>
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
        <CustomButton onClick={() => { Sendbird.makeACall(calleeId) }}>make a call</CustomButton>
      </Flex>

      <Flex>
        <CustomButton onClick={() => { Sendbird.receiveACall(setCall) }}>receiveACall</CustomButton>
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

export default Session;
