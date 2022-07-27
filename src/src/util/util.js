import { useEffect, useRef } from "react";

export const getDifferenceMinutes = (startTime, finishTime) => {
  // format of input time => 'hh:mm' (String)
  const tempStartDate = new Date(2022, 0, 1, startTime.slice(0, 2), startTime.slice(3, 5))
  const tempFinishDate = new Date(2022, 0, 1, finishTime.slice(0, 2), finishTime.slice(3, 5))
  const diff = tempFinishDate - tempStartDate

  const mm = Math.floor(diff / 1000 / 60);
  return mm
}

export const addMinute = (hourAndMin, addingMin) => {

  const beforeDate = new Date(`2021/01/01 ${hourAndMin}`)
  const afterDate = new Date(beforeDate.getTime() + addingMin * 60000)

  const hour = `${'00' + afterDate.getHours()}`.slice(-2)
  const min = `${'00' + afterDate.getMinutes()}`.slice(-2)

  if (isNaN(hour) || isNaN(hour)) {
    return ''
  }
  return `${hour}:${min}`
}

export const getAMOrPM = (hourAndMin) => {
  try {
    return Number(hourAndMin.slice(0, 2)) < 12 ? '오전' : '오후'
  } catch (error) {
    return ''
  }
};



export const getLastPathOfRoute = (location) => {
  const navigationSplits = location.pathname.split('/');
  return navigationSplits[navigationSplits.length - 1]
}

export const getDayInKorean = (date) => {
  let dayNumber = date.getDay()
  let koreanDay = ['일', '월', '화', '수', '목', '금', '토'];
  return koreanDay[dayNumber]
}

export const updateReservation = (id, updateDataArray) => {
  let reservations = JSON.parse(localStorage.getItem('reservations'))
  let reservation = {}

  if (reservations !== null) {
    if (id in reservations) {
      reservation = reservations[id]
    }
  }
  else {
    reservations = {}
    reservations[id] = {}
  }

  updateDataArray.forEach((obj) => {
    reservation[obj.name] = obj.data
  })

  // reservation['consultingDate'] = { year, month: Number(month.slice(0, -1)), date: selectedDate }
  // reservation['consultingTime'] = consultingTime
  // reservation['consultingStartTime'] = consultingStartTime

  reservations[id] = reservation
  localStorage.setItem('reservations', JSON.stringify(reservations))
}

export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}