export function onEnterSession({ navigater, date, consultStatus, startTime, endTime, consultId }) {

  const startDateTime = new Date(date.slice(0, date.indexOf('T')) + ' ' + startTime).getTime()
  const endDateTime = new Date(date.slice(0, date.indexOf('T')) + ' ' + endTime).getTime()
  const nowTime = new Date().getTime()

  if (consultStatus === 'created') {
    if (endDateTime - nowTime <= 1000 * 60 * 6 - 1) { // 5분59초 이후 진입 불가. 
      alert('지난 상담입니다')
    } else {
      alert('상담 승인 대기중입니다')
    }
  } else if (['done', 'mentor_noshow', 'mentee_noshow', 'noShow'].includes(consultStatus)) {
    alert('종료된 상담입니다')
  } else if (consultStatus === 'approved') {
    if (nowTime - startDateTime <= -1000 * 60 * 11 - 1) {
      alert('상담 시작 시간 10분전 입장이 가능합니다')
    } else if (endDateTime - nowTime <= 1000 * 60 * 6 - 1) { // 5분59초 이후 진입 불가. 
      alert('지난 상담입니다')
    }
    else {
      window.open(`/session/${consultId}`, '_blank');
      // navigater(`/session/${consultId}`)
    }
  } else {
    alert(`상담 상태에 문제가 있습니다. 관리자에게 문의해주세요 ${consultStatus}`,)
  }


}

