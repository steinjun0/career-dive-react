import { useEffect, useRef } from "react";
import { Location } from "react-router-dom";

export const getDifferenceMinutes = (startTime: string, finishTime: string) => {
  // format of input time => 'hh:mm' (String)
  const tempStartDate = new Date(2023, 0, 1, +startTime.slice(0, 2), +startTime.slice(3, 5));
  const tempFinishDate = new Date(2023, 0, 1, +finishTime.slice(0, 2), +finishTime.slice(3, 5));
  const diff: number = tempFinishDate.getTime() - tempStartDate.getTime();

  const mm = Math.floor(diff / 1000 / 60);
  return mm;
};

export const addMinute = (beforeDate: Date, addingMin: number) => {
  const afterDate = new Date(beforeDate.getTime() + addingMin * 60000);
  return afterDate;
};

export const addMinuteTs = (beforeDate: Date, addingMin: number) => {
  const afterDate = new Date(beforeDate.getTime() + addingMin * 60000);
  if (afterDate.toString() === 'Invalid Date')
    throw new Error('올바르지 않은 날짜를 입력했습니다');
  return afterDate;
};

export const createDateFromHourMinTs = (date: Date, startTime: string, endTime: string) => {
  let startDate = new Date(date);
  let endDate = new Date(date);

  startDate.setHours(0);
  endDate.setHours(0);
  let startHour = +startTime.slice(0, startTime.indexOf(':'));
  let startMin = +startTime.slice(startTime.indexOf(':') + 1);

  let endHour = +endTime.slice(0, endTime.indexOf(':'));
  let endMin = +endTime.slice(endTime.indexOf(':') + 1);
  return [addMinuteTs(startDate, (startHour * 60 + startMin)), addMinuteTs(endDate, (endHour * 60 + endMin))];
};


export const createDateFromHourMin = (date: Date, startTime: string, endTime: string) => {
  let startDate = new Date(date);
  let endDate = new Date(date);

  startDate.setHours(0);
  endDate.setHours(0);
  let startHour = +startTime.slice(0, startTime.indexOf(':'));
  let startMin = +startTime.slice(startTime.indexOf(':') + 1);

  let endHour = +endTime.slice(0, endTime.indexOf(':'));
  let endMin = +endTime.slice(endTime.indexOf(':') + 1);
  return [addMinute(startDate, (startHour * 60 + startMin)), addMinute(endDate, (endHour * 60 + endMin))];
};

export const getDateString = (date: Date, type: 'short' | 'long') => {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let dateStr = date.getDate().toString();

  if (type === 'short')
    return `${year.slice(2)}.${month.padStart(2, '0')}.${dateStr.padStart(2, '0')} (${getDayInKorean(date)})`;
  else if (type === 'long')
    return `${year}년 ${month}월 ${dateStr}일(${getDayInKorean(date)})`;
};

export const getKoreanTimeString = (date: Date) => {
  let amOrPmString = '';
  let hour = date.getHours();
  let min = date.getMinutes();
  if (hour < 12) {
    amOrPmString = '오전';
  } else if (hour == 12) {
    amOrPmString = '낮';
  } else {
    amOrPmString = '오후';
    hour = hour - 12;
  }

  return `${amOrPmString} ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
};

export const getHoursAndMinuteString = (date: Date) => {
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const getAMOrPM = (hourAndMin: string) => {
  try {
    if (Number(hourAndMin.slice(0, 2)) < 12) {
      return '오전';
    } else if (Number(hourAndMin.slice(0, 2)) == 12) {
      return '낮';
    } else {
      return '오후';
    }
  } catch (error) {
    return '';
  }
};



export const getLastPathOfRoute = (location: Location) => {
  const navigationSplits = location.pathname.split('/');
  return navigationSplits[navigationSplits.length - 1];
};

export const getDayInKorean = (date: Date) => {
  let dayNumber = date.getDay();
  let koreanDay = ['일', '월', '화', '수', '목', '금', '토'];
  return koreanDay[dayNumber];
};

export const formatMoney = (amount: any, decimalCount: any = 2, decimal: any = ".", thousands: any = ",") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i: any = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j: number = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    console.log(e);
  }
};

export const getParsedLocalStorage = (name: string) => {
  return localStorage.getItem(name) !== null ? JSON.parse(localStorage.getItem(name)!) : null;
};

export type ReservationAttr =
  'consultCategory' | 'consultContent' | 'consultingTime' |
  'isFilePreOpen' | 'requestText' | 'startTime' | 'scheduleId';
// export type ReservationObj = {
//   name:'consultCategory': data:'커리어 상담' | '전형 준비',
//   'consultContent'?: string[],
//   'consultingTime'?: 20 | 40,
//   'isFilePreOpen'?: '희망' | '비희망',
//   'requestText'?: string,
//   'startTime'?: Date
// }

export const updateReservation = (id: number, updateDataArray: { name: ReservationAttr, data: any; }[]) => {
  let reservations = localStorage.getItem(`reservations`) === null ? null : JSON.parse(localStorage.getItem(`reservations`)!);
  let reservation: any = {};
  if (reservations !== null) {
    if (id in reservations) {
      reservation = reservations[id];
    }
  }
  else {
    reservations = {};
    reservations[id] = {};
  }

  updateDataArray.forEach((obj) => {
    reservation[obj.name] = obj.data;
  });

  // reservation['consultingDate'] = { year, month: Number(month.slice(0, -1)), date: selectedDate }
  // reservation['consultingTime'] = consultingTime
  // reservation['consultingStartTime'] = consultingStartTime

  reservations[id] = reservation;
  localStorage.setItem(`reservations`, JSON.stringify(reservations));
};

export const removeReservation = (id: number) => {
  try {
    let removedReservations = localStorage.getItem(`reservations`) === null ? null : JSON.parse(localStorage.getItem(`reservations`)!);
    removedReservations[id] = undefined;
    localStorage.setItem('reservations', JSON.stringify(removedReservations));
  } catch (e) {
    return console.log(`remove reservation fail. id: ${id}`, e);
  }
};

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export function convertStringToTags(tagsString: string) {
  const pureTags = tagsString.split(',').map(element => element.trim()).filter((e) => e.length === 0 ? false : true);
  let arrayTags: object[] = [];
  pureTags.map((e) => {
    arrayTags.push({ Name: e });
  });
  return arrayTags;
}

export function checkUrlInclude(string: string) {
  let temp = window.location.href;
  const firstSlice = temp.indexOf('//');
  temp = temp.slice(firstSlice + 2);
  const secondSlice = temp.indexOf('/');
  temp = temp.slice(secondSlice + 1);
  return temp.slice(0, 9).includes(string);
}

// export function isMentorUrl() {
//   let temp = window.location.href
//   const firstSlice = temp.indexOf('//')
//   temp = temp.slice(firstSlice + 2)
//   const secondSlice = temp.indexOf('/')
//   temp = temp.slice(secondSlice + 1)

//   const ignoreList = ['mentor']
//   let isIgnored = false
//   ignoreList.map((e) => {
//     isIgnored = temp.indexOf(e) === 0
//   })

//   if (isIgnored || temp.indexOf('mentor') !== 0) {
//     return false
//   } else {
//     return true
//   }
// }

export function validateEmail(email: string) {
  let regExpEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
  if (regExpEmail.test(email) == false) {
    //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우            
    return false;
  };
  return true;
};

export function validatePassword(password: string) {
  let regExpPassword = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{8,50}$/;
  if (regExpPassword.test(password) == false) {
    // password 형식이 숫자, 영어, 특수문자가 아닌경우
    return false;
  };
  return true;
}