import axios from 'axios'
// const CAREER_DIVE_API_URL = 'https://api.staging.careerdive.co.kr'
const CAREER_DIVE_API_URL = 'https://api.dev.careerdive.co.kr'
// const CAREER_DIVE_API_URL = 'https://api.careerdive.co.kr'

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
      const res = tokenHeader ? await axios.get(url, { headers: { Authorization: `${accessToken}`, accept: 'application/x-zip-compressed' } }) : await axios.get(url, { headers: { accept: 'application/x-zip-compressed' } })
      return res
    } catch (e) {
      return { error: getValidError(e) }
    }
  },
  async getAxiosWithParams(url, param) {
    this.refreshUserData()
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `${accessToken}` },
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
      const res = tokenHeader ? await axios.post(url, data, { headers: { Authorization: `${accessToken}`, 'Content-Type': 'multipart/form-data' } }) : await axios.post(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
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
      const res = tokenHeader ? await axios.patch(url, data, { headers: { Authorization: `${accessToken}`, 'Content-Type': 'multipart/form-data' } }) : await axios.patch(url, data, { headers: { 'Content-Type': 'multipart/form-data' } })
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

  async getConsultSchedule(year, month, mentorId) {
    const scheduleRes = await this.getAxiosWithParams(`${CAREER_DIVE_API_URL}/consult/schedule`, { 'Year': year, 'Month': month, 'MentorID': +mentorId })
    return scheduleRes
  },

  async getAccount(id) {
    const accountRes = await this.getAxios(`${CAREER_DIVE_API_URL}/account/${id}`)
    return accountRes
  },

  async getAccountMentor(id) {
    const accountMentornRes = await this.getAxios(`${CAREER_DIVE_API_URL}/account/mentor/${id}`)
    return accountMentornRes
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

  async postConsultScheduleRule(startTime, endTime, weekDay, type, mentorId) {
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/consult/schedule/rule`, { StartTime: startTime, EndTime: endTime, WeekDay: weekDay, Type: type, MentorID: +mentorId })
    return scheduleRes
  },

  async postAccountMentor(inService, job, jobInComp, divisInComp, divisIsPub, tags) {
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/account/mentor`, { Mentor: { Inservice: inService, Job: job, JobInComp: jobInComp, DivisInComp: divisInComp, DivisIsPub: divisIsPub }, Tags: tags })
    return scheduleRes
  },

  async postAccountMentorFile(id, file) {
    const scheduleRes = await this.postAxiosFormData(`${CAREER_DIVE_API_URL}/account/mentor/${id}/file`, file)
    return scheduleRes
  },

  async postAccountConsultContent(consultContents, mentorId) {
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/account/consultContent`, { ConsulltContents: consultContents, MentorID: +mentorId })
    return scheduleRes
  },

  async postAccountTag(tags, mentorId) {
    const scheduleRes = await this.postAxios(`${CAREER_DIVE_API_URL}/account/tag`, { Tags: tags, MentorID: +mentorId })
    return scheduleRes
  },

  async patchAccount(userData) {
    const userRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/account/update`, userData)
    return userRes
  },

  async patchUser(userData) {
    const userRes = await this.patchAxios(`${CAREER_DIVE_API_URL}auth/user/`, userData)
    return userRes
  },

  async patchConsultScheduleRule(ruleId, startTime, endTime, weekDay, type, mentorId) {
    const patchRes = await this.patchAxios(`${CAREER_DIVE_API_URL}/consult/schedule/rule/${ruleId}`, { StartTime: startTime, EndTime: endTime, WeekDay: weekDay, Type: type, MentorID: +mentorId })
    return patchRes
  },

  async deleteConsultSchedule(shceduleId) {
    const deleteRes = await this.deleteAxios(`${CAREER_DIVE_API_URL}/consult/schedule/${shceduleId}`)
    return deleteRes
  },

  async deleteConsultScheduleRule(ruleId, startDate) {
    const deleteRes = await this.deleteAxios(`${CAREER_DIVE_API_URL}/consult/schedule/rule/${ruleId}?${startDate ? `startDate=${startDate}` : ''}`)
    return deleteRes
  },

}
