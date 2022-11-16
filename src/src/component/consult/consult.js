export function onEnterSession({ navigater, date, consultStatus, startTime, endTime, consultId }) {

  if (consultStatus == 'created') {
    alert('상담 대기중입니다')
  } else if (consultStatus == 'done') {
    alert('종료된 상담입니다')
  } else if (consultStatus === 'approved') {
    const startDateTime = new Date(date.slice(0, date.indexOf('T')) + ' ' + startTime).getTime()
    const endDateTime = new Date(date.slice(0, date.indexOf('T')) + ' ' + endTime).getTime()
    const nowTime = new Date().getTime()
    if (nowTime - startDateTime <= 0) {
      alert('상담이 시작되지 않았습니다')
      navigater(`/session/${consultId}`)
    } else if (endDateTime - nowTime <= 0) { // 5분59초 이후 진입 불가. 
      alert('지난 상담입니다')
      navigater(`/session/${consultId}`)
    }
    else {
      navigater(`/session/${consultId}`)
    }
  } else {
    alert(`상담 상태에 문제가 있습니다. 관리자에게 문의해주세요 ${consultStatus}`,)
  }


}

