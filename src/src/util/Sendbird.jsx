import SendBirdCall from "sendbird-calls";


export function checkAuth(USER_ID, ACCESS_TOKEN) {
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

export function connectWebSocket() {
  // Websocket Connection
  SendBirdCall.connectWebSocket()
    .then(/* connect succeeded */)
    .catch(/* connect failed */);
}

export function addEventHandler() {
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

export function init(APP_ID, USER_ID, ACCESS_TOKEN) {
  SendBirdCall.init(APP_ID)
  checkAuth(USER_ID, ACCESS_TOKEN)
  connectWebSocket()
  addEventHandler()
}

export function makeACall(calleeId) {
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

export function receiveACall(setCall) {
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

export default { checkAuth, connectWebSocket, addEventHandler, makeACall, receiveACall }