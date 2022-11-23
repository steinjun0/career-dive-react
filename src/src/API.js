import axios from 'axios'
import SendBirdCall from "sendbird-calls";

let CAREER_DIVE_API_URL = 'https://api.staging.careerdive.co.kr'
// const CAREER_DIVE_API_URL = 'https://api.dev.careerdive.co.kr'

if (window.location.host === 'careerdive.co.kr') {
  CAREER_DIVE_API_URL = 'https://api.careerdive.co.kr'
} else if (window.location.host === 'staging.careerdive.co.kr') {
  CAREER_DIVE_API_URL = 'https://api.staging.careerdive.co.kr'
} else if (window.location.host === 'dev.careerdive.co.kr') {
  CAREER_DIVE_API_URL = 'https://api.staging.careerdive.co.kr'
} else {
  CAREER_DIVE_API_URL = 'https://api.staging.careerdive.co.kr'
}


const APP_ID = 'DCFAABFA-CE04-46DC-877A-C3C87B929C2D'
// let user = JSON.parse(localStorage.getItem('userData'))
// let tokenHeader = false

// if (user !== null) {
//   tokenHeader = { headers: { Authorization: `${user.token}` } }
// } else {
//   tokenHeader = false
// }
let accessToken = localStorage.getItem('AccessToken')
let tokenHeader = false


if (accessToken !== null) {
  tokenHeader = { headers: { Authorization: `${accessToken}` } }
} else {
  tokenHeader = false
}


const getValidError = exception => {
  if (exception.response !== undefined && exception.response.data !== undefined && exception.response.data.errors !== undefined) {
    return exception.response.data.errors
  }
  return exception
}
export default {
  refreshUserData() {
    let accessToken = localStorage.getItem('AccessToken')
    if (accessToken !== null) {
      tokenHeader = { headers: { Authorization: `${accessToken}` } }
    } else {
      tokenHeader = false
    }
  },
  async getAxios(url) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.get(url, tokenHeader) : await axios.get(url)
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },
  async getAxiosBinary(url) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.get(url, tokenHeader) : await axios.get(url)
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },
  async getAxiosZip(url) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.get(url, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, accept: 'application/x-zip-compressed' } }) : await axios.get(url, { headers: { accept: 'application/x-zip-compressed' } })
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },
  async getAxiosWithParams(url, param) {
    this.refreshUserData()
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `${tokenHeader.headers.Authorization}` },
        params: param,
      }, tokenHeader)
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },
  async postAxios(url, data) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.post(url, data, tokenHeader) : await axios.post(url, data)
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },
  async postAxiosFormData(url, data) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.post(url, data, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, 'Content-Type': 'multipart/form-data' } }) : await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },
  async patchAxios(url, data) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.patch(url, data, tokenHeader) : await axios.patch(url, data)
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },
  async patchAxiosFormData(url, data) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.patch(url, data, { headers: { Authorization: `${tokenHeader.headers.Authorization}`, 'Content-Type': 'multipart/form-data' } }) : await axios.patch(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },

  async putAxios(url) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.put(url, tokenHeader) : await axios.put(url)
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },

  async deleteAxios(url) {
    this.refreshUserData()
    try {
      const res = tokenHeader ? await axios.delete(url, tokenHeader) : await axios.delete(url)
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },

  async getAdminList() {
    const loginRes = await this.getAxios(`${CAREER_DIVE_API_URL}hrd/admins/`)
    return loginRes
  },

  async getAccount(id) {
    const accountRes = await this.getAxios(`${CAREER_DIVE_API_URL}/account/${id}`)
    return accountRes
  },

  async getAccountMentor(id) {
    const accountMentornRes = await this.getAxios(`${CAREER_DIVE_API_URL}/account/mentor/${id}`)
    return accountMentornRes
  },

  async getAccountMentee(id) {
    const accountMenteeRes = await this.getAxios(`${CAREER_DIVE_API_URL}/account/mentee/${id}`)
    return accountMenteeRes
  },

  async getAccountConsultContent(type) {
    const contentRes = await this.getAxios(`${CAREER_DIVE_API_URL}/account/consultContent/list?type=${type}`)
    return contentRes
  },

  async getConsult(id) {
    const consultRes = await this.getAxios(`${CAREER_DIVE_API_URL}/consult/${id}`)
    return consultRes
  },

  async getConsultSchedule(year, month, mentorId) {
    const scheduleRes = await this.getAxiosWithParams(`${CAREER_DIVE_API_URL}/consult/schedule`, { 'Year': year, 'Month': month, 'MentorID': +mentorId })
    return scheduleRes
  },


  async getConsultMenteeList(id, status) {
    // 생성된(created), 대기(pending), 승인(approved), 완료(done)
    const accountRes = await this.getAxios(`${CAREER_DIVE_API_URL}/consult/mentee/${id}/list?status=${status}`)
    return accountRes
  },

  async getConsultMentorList(id, status) {
    // 생성된(created), 대기(pending), 승인(approved), 완료(done)
    const accountRes = await this.getAxios(`${CAREER_DIVE_API_URL}/consult/mentor/${id}/list?status=${status}`)
    return accountRes
  },

  async getConsult(id) {
    const accountRes = await this.getAxios(`${CAREER_DIVE_API_URL}/consult/${id}`)
    return accountRes
  },


  async getAccountMentorList() {
    const mentorListRes = await this.getAxios(`${CAREER_DIVE_API_URL}/account/mentor/list`)
    return mentorListRes
  },


  async postAccount(email, password, nickname) {
    const res = await this.postAxios(`${CAREER_DIVE_API_URL}/account`, { email, password, nickname })
    return res
  },

  async postAccountLogin(email, password) {
    const res = await this.postAxios(`${CAREER_DIVE_API_URL}/account/login`, { email, password })
    return res
  },

  async postAccountValid(accessToken) {
    const res = await this.postAxios(`${CAREER_DIVE_API_URL}/account/valid`, { 'AccessToken': accessToken })
    return res
  },

  async postAccountRenew(refreshToken) {
    const res = await this.postAxios(`${CAREER_DIVE_API_URL}/account/renew`, { 'RefreshToken': refreshToken })
    return res
  },

  async postConsultSchedule(dayTimes, year, month, mentorId) {
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/consult/schedule`, { DayTimes: dayTimes, MentorID: +mentorId, Month: month, Year: year })
    return scheduleRes
  },

  async postConsultScheduleRule(startTime, endTime, weekDay, type, mentorId, startDate) {
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/consult/schedule/rule`, { StartTime: startTime, EndTime: endTime, WeekDay: weekDay, Type: type, MentorID: +mentorId, StartDate: startDate })
    return scheduleRes
  },



  async postAccountMentor(inService, sector, job, jobInComp, divisInComp, divisIsPub, compName, tags) {
    const convertedTags = tags.map((e) => {
      return { Name: e }
    })
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/account/mentor`,
      {
        Mentor: {
          Inservice: inService,
          Sector: sector,
          Job: job,
          JobInComp: jobInComp,
          DivisInComp: divisInComp,
          DivisIsPub: divisIsPub,
          CompName: compName
        },
        Tags: convertedTags
      })
    return scheduleRes
  },

  async postAccountMentorFile(id, file) {
    const scheduleRes = await this.postAxiosFormData(`${CAREER_DIVE_API_URL}/account/mentor/${id}/file`, file)
    return scheduleRes
  },

  async postAccountConsultContent(consultContents, mentorId) {
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/account/consultContent`, { ConsultContents: consultContents, MentorID: +mentorId })
    return scheduleRes
  },

  async postConsult(
    { consultContentList,
      menteeId, mentorId,
      preReview,
      requestContent,
      scheduleId,
      startTime, endTime,
      type }) {
    const consultRes = await this.postAxios(
      `${CAREER_DIVE_API_URL}/consult`,
      {
        ConsultContentList: consultContentList,
        MenteeId: +menteeId,
        MentorId: +mentorId,
        PreReview: preReview,
        RequestContent: requestContent,
        ScheduleId: +scheduleId,
        StartTime: startTime,
        EndTime: endTime,
        Type: type,
        Status: "created",
      })

    return consultRes
  },

  async postConsultFile(id, file) {
    const consultFileRes = await this.postAxiosFormData(`${CAREER_DIVE_API_URL}/consult/${id}/file`, file)
    return consultFileRes
  },

  async postAccountTag(tags, mentorId) {
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/account/tag`, { Tags: tags, MentorID: +mentorId })
    return scheduleRes
  },


  async postCallNew({ calleeId, callerId, consultId, callId }) {
    const callNewRes = await this.postAxios(`${CAREER_DIVE_API_URL}/call/new`, { CalleeID: calleeId, CallerID: callerId, ConsultID: consultId, call_id: callId })
    return callNewRes
  },

  async postCallStart(callId) {
    const callStartRes = await this.postAxios(`${CAREER_DIVE_API_URL}/call/${callId}/start`)
    return callStartRes
  },

  async postCallDone(callId) {
    const callDoneRes = await this.postAxios(`${CAREER_DIVE_API_URL}/call/${callId}/done`)
    return callDoneRes
  },

  async postConsultLateness({ consultId, menteeLateness, mentorLateness }) {
    const consultLateRes = await this.postAxios(`${CAREER_DIVE_API_URL}/consult/lateness`, { ConsultID: consultId, MenteeLateness: menteeLateness, MentorLateness: mentorLateness })
    return consultLateRes
  },

  async postConsultNoshow({ consultId, menteeNoshow, mentorNoshow }) {
    const consultNoshowRes = await this.postAxios(`${CAREER_DIVE_API_URL}/consult/noshow`, { ConsultID: consultId, MenteeNoshow: menteeNoshow, MentorNoshow: mentorNoshow })
    return consultNoshowRes
  },


  async patchAccount(userData) {
    const userRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/account/update`, userData)
    return userRes
  },

  async patchAccountMentor(mentorData) {
    const mentorRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/account/mentor`, mentorData)
    return mentorRes
  },

  async patchAccountMentee({ introduction, link, userId }) {
    const menteeRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/account/mentee/${userId}`, { Introduction: introduction, Link: link, UserID: +userId })
    return menteeRes
  },

  async patchUser(userData) {
    const userRes = await this.patchAxios(`${CAREER_DIVE_API_URL}auth/user/`, userData)
    return userRes
  },

  async patchConsultSchedule(scheduleId, startTime, endTime, mentorId, date) {
    const patchRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/consult/schedule/${scheduleId}`,
      { Date: date, StartTime: startTime, EndTime: endTime, MentorID: +mentorId })
    return patchRes
  },

  async patchConsultScheduleRule(ruleId, startTime, endTime, weekDay, type, mentorId, startDate) {
    const patchRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/consult/schedule/rule/${ruleId}`,
      { StartTime: startTime, EndTime: endTime, WeekDay: weekDay, Type: type, MentorID: +mentorId, StartDate: startDate })
    return patchRes
  },

  async patchConsultReview({ consultId, reviewContent, reviewScore, checkList }) {
    const reviewRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/consult/${consultId}/review`, {
      ReviewContent: reviewContent,
      ReviewScore: reviewScore,
      ReviewStatisfyBase: checkList,
    })
    return reviewRes
  },

  async patchConsultApprove(consultId) {
    const consultRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/consult/${consultId}/approve`)
    return consultRes
  },
  async patchConsultReject(consultId) {
    const consultRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/consult/${consultId}/reject`)
    return consultRes
  },
  async patchConsultCancel(consultId) {
    const consultRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/consult/${consultId}/cancel`, { Reason: '' })
    return consultRes
  },
  async patchConsultDone(consultId) {
    const consultRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/consult/${consultId}/done`)
    return consultRes
  },

  async deleteConsultSchedule(shceduleId) {
    const deleteRes = await this.deleteAxios(`${CAREER_DIVE_API_URL}/consult/schedule/${shceduleId}`)
    return deleteRes
  },

  async deleteConsultScheduleRule(ruleId, startDate) {
    const deleteRes = await this.deleteAxios(`${CAREER_DIVE_API_URL}/consult/schedule/rule/${ruleId}?${startDate ? `startDate=${startDate}` : ''}`)
    return deleteRes
  },






  Sendbird: {
    initSendbird() {
      SendBirdCall.init(APP_ID)
    },

    async checkAuth(USER_ID, ACCESS_TOKEN) {
      // Authentication
      const authOption = { userId: USER_ID, accessToken: ACCESS_TOKEN };

      await SendBirdCall.authenticate(authOption, (res, error) => {
        if (error) {
          // auth failed
          console.log('auth fail')
          alert('통화 연결에 실패하였습니다. 새로고침해 주세요. (계속 안된다면 로그아웃 후 다시 로그인해 주세요)')
        } else {
          // auth succeeded
          console.log('auth success')

        }
      });
    },

    connectWebSocket() {
      // Websocket Connection
      return SendBirdCall.connectWebSocket()
      // .then(/* connect succeeded */)
      // .catch(/* connect failed */);
    },

    addEventHandler() {
      SendBirdCall.addListener(1, {
        onRinging: (call) => {
          console.log('onRinging')
        },
        onAudioInputDeviceChanged: (currentDevice, availableDevices) => {
          console.log('onAudioInputDeviceChanged')
        },
        onAudioOutputDeviceChanged: (currentDevice, availableDevices) => {
          console.log('onAudioOutputDeviceChanged')
        },
        onVideoInputDeviceChanged: (currentDevice, availableDevices) => {
          console.log('onVideoInputDeviceChanged')
        }
      });
    },

    makeACall({ calleeId, onMakeACall, onConnected, onEnded }) {
      // console.log('makeacall local_video_element_id', document.getElementById('local_video_element_id'))
      // console.log('makeacall remote_video_element_id', document.getElementById('remote_video_element_id'))
      const dialParams = {
        userId: `${calleeId}`,
        isVideoCall: true,
        callOption: {
          localMediaView: document.getElementById('local_video_element_id'),
          remoteMediaView: document.getElementById('remote_video_element_id'),
          audioEnabled: true,
          videoEnabled: true
        }
      };

      // console.log('recieve dialParams', dialParams)

      const call = SendBirdCall.dial(dialParams, (call, error) => {
        if (error) {
          // dial failed
          console.log('dial failed')
          console.log(error)
        }
        else {
          console.log('dial succeeded')
          onMakeACall({ call })
          // call.stopVideo();
          // call.muteMicrophone();
        }
        // dial succeeded
      });

      call.onEstablished = (call) => {
        console.log('established!')
      };

      call.onConnected = (call) => {
        console.log('onConnected!')
        onConnected();
        call.stopVideo();
        call.muteMicrophone();
      };

      call.onEnded = (call) => {
        console.log('onEnded!')
        onEnded()
      };

      call.onRemoteAudioSettingsChanged = (call) => {
        console.log('onRemoteAudioSettingsChanged!', call)
      };

      call.onRemoteVideoSettingsChanged = (call) => {
        console.log('onRemoteVideoSettingsChanged!')
      };


      return call
    },

    receiveACall({ onReceiveACall, onEstablished, onEnded }) {
      SendBirdCall.addListener(2, {
        onRinging: (call) => {
          call.onEstablished = (call) => {
            console.log('established!')
            call.stopVideo();
            call.muteMicrophone();
            console.log('onreceive call', call)
            onReceiveACall({ call })
            console.log('mutemute!')
          };

          call.onConnected = (call) => {
            console.log('onConnected!')
          };

          call.onEnded = (call) => {
            console.log('onEnded!')
            onEnded()
          };

          call.onRemoteAudioSettingsChanged = (call) => {
            console.log('onRemoteAudioSettingsChanged!')
          };

          call.onRemoteVideoSettingsChanged = (call) => {
            console.log('onRemoteVideoSettingsChanged!')
          };
          // console.log('receive local_video_element_id', document.getElementById('local_video_element_id'))
          // console.log('receive remote_video_element_id', document.getElementById('remote_video_element_id'))
          const acceptParams = {
            isVideoCall: true,
            callOption: {
              localMediaView: document.getElementById('local_video_element_id'),
              remoteMediaView: document.getElementById('remote_video_element_id'),
              audioEnabled: true,
              videoEnabled: true
            }
          };
          // console.log('recieve acceptParams', acceptParams)


          call.accept(acceptParams);
        }
      });
    },
    stopCalling(call) {
      console.log(call)
      call.end()
      SendBirdCall.removeAllListeners()
    }
  }

}
