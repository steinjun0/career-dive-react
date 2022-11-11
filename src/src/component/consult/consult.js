export function onEnterSession({ navigater, date, startTime, endTime, consultId }) {
  const startDateTime = new Date(date.slice(0, date.indexOf('T')) + ' ' + startTime).getTime()
  const endDateTime = new Date(date.slice(0, date.indexOf('T')) + ' ' + endTime).getTime()
  const nowTime = new Date().getTime()
  if (nowTime - startDateTime <= 0) {
    alert('상담이 시작되지 않았습니다')
    navigater(`/session/${consultId}`)
  } else if (endDateTime - nowTime <= 0) { // 5분59초 이후 진입 불가. 
    alert('상담 시간이 지났습니다')
    navigater(`/session/${consultId}`)
  }
  else {
    navigater(`/session/${consultId}`)
  }
}

