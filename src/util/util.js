export const getDifferenceMinutes = (startTime, finishTime) => {
  // format of input time => 'hh:mm' (String)
  const tempStartDate = new Date(2022, 0, 1, startTime.slice(0, 2), startTime.slice(3, 5))
  const tempFinishDate = new Date(2022, 0, 1, finishTime.slice(0, 2), finishTime.slice(3, 5))
  const diff = tempFinishDate - tempStartDate

  const mm = Math.floor(diff / 1000 / 60);
  return mm
}