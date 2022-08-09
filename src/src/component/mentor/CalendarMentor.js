import { useEffect, useRef, useState } from "react";
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { Card } from "util/Card"

import {
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex,
  colorBackgroundGrayLight,
  EmptyHeight,
  TextSubtitle1,
  RowAlignCenterFlex
} from "util/styledComponent";

import { CustomButton } from "util/Custom/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { addMinute, updateReservation, usePrevious } from "util/util";
import CalendarMentorUpper from "component/CalendarMentorUpper";
import { AddOutlined } from "@material-ui/icons";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SimpleMenu from "util/SimpleMenu";


const CalendarWrapper = styled(Flex)`
  width: 100%;
  // margin-top: 30px;
  transition: all 0.3s ease-out;
`

const CalendarContentWrapper = styled(VerticalFlex)`
  justify-content: start;
`;

function AddNewAvailableTime({ onSetTime }) {
  let housrList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  let minsList = ['00', '10', '20', '30', '40', '50']
  const [startAMPM, setStartAMPM] = useState('오전')
  const [startHour, setStartHour] = useState('01')
  const [startMin, setStartMin] = useState('00')
  const [endAMPM, setEndAMPM] = useState('오전')
  const [endHour, setEndHour] = useState('01')
  const [endMin, setEndMin] = useState('00')
  const [isRepeat, setIsRepeat] = useState(true)


  return (
    <RowAlignCenterFlex>
      <SimpleMenu
        style={{ fontWeight: 400, fontSize: 14, color: colorTextLight }}
        title={startAMPM}
        menuItems={['오전', '오후']}
        onClickProps={() => { }}
        setState={setStartAMPM}
      />
      <SimpleMenu
        style={{ fontWeight: 400, fontSize: 14, color: colorTextLight }}
        title={startHour}
        menuItems={housrList}
        onClickProps={() => { }}
        setState={setStartHour}
      />
      :
      <SimpleMenu
        style={{ fontWeight: 400, fontSize: 14, color: colorTextLight }}
        title={startMin}
        menuItems={minsList}
        onClickProps={() => { }}
        setState={setStartMin}
      />
      ~
      <SimpleMenu
        style={{ fontWeight: 400, fontSize: 14, color: colorTextLight }}
        title={endAMPM}
        menuItems={['오전', '오후']}
        onClickProps={() => { }}
        setState={setEndAMPM}
      />
      <SimpleMenu
        style={{ fontWeight: 400, fontSize: 14, color: colorTextLight }}
        title={endHour}
        menuItems={housrList}
        onClickProps={() => { }}
        setState={setEndHour}
      />
      :
      <SimpleMenu
        style={{ fontWeight: 400, fontSize: 14, color: colorTextLight }}
        title={endMin}
        menuItems={minsList}
        onClickProps={() => { }}
        setState={setEndMin}
      />
      <SimpleMenu
        style={{ fontWeight: 400, fontSize: 14, color: colorTextLight }}
        title={`${isRepeat}`}
        menuItems={['반복설정']}
        onClickProps={() => { }}
        setState={setIsRepeat}
        endIcon={<KeyboardArrowDownIcon />}
      />
      <CustomButton
        onClick={() => {
          onSetTime({ startAMPM, startHour, startMin, endAMPM, endHour, endMin, isRepeat })
        }}
      >확인</CustomButton>
    </RowAlignCenterFlex>
  )

}

const originData = [{ date: 9, availableTime: [['09:00', '10:30']] },
{ date: 10, availableTime: [['09:00', '09:30'], ['12:00', '13:00'], ['13:30', '14:30']] },
{ date: 11, availableTime: [['09:00', '09:30'], ['17:00', '19:00']] },
{ date: 16, availableTime: [['09:00', '09:30'], ['12:00', '13:00'], ['17:00', '19:00'], ['21:00', '22:00']] },
{ date: 17, availableTime: [['09:00', '09:30']] },
{ date: 18, availableTime: [['09:00', '09:30']] },
]

const availableDates = [9, 10, 11, 16, 17, 18];


function CalendarMentor({ setIsFinishSet }) {
  const params = useParams();
  const location = useLocation();

  const year = 2022;
  const [month, setMonth] = useState('0월');

  const [selectedDate, setSelectedDate] = useState(0);

  const [consultingTime, setConsultingTime] = useState(-1);
  const [consultingStartTime, setConsultingStartTime] = useState(0);

  const [selectedDateObj, setSelectedDateObj] = useState(new Date());

  const [availableTimes, setAvailableTimes] = useState({})


  const addNewAvailableTime = (selectedDate, { startAMPM, startHour, startMin, endAMPM, endHour, endMin, isRepeat }) => {
    let temp = JSON.parse(JSON.stringify(availableTimes))
    if (typeof temp[selectedDate] == 'object') {
      temp[selectedDate].push({ startAMPM, startHour, startMin, endAMPM, endHour, endMin, isRepeat })
    } else {
      temp[selectedDate] = [{ startAMPM, startHour, startMin, endAMPM, endHour, endMin, isRepeat }]
    }
    setAvailableTimes(temp)
  }

  // 날짜 선택시, 기존값 초기화
  const onClickAvailableDate = (date) => {
    setSelectedDate(date);
    setConsultingTime(0);
    setConsultingStartTime(0);
  }

  // 상담시간 변경시 시작시간 초기화
  const prevConsultingTime = usePrevious(consultingTime);
  useEffect(() => {
    if (prevConsultingTime !== -1) {
      setConsultingStartTime(0)
    }
  }, [consultingTime])

  useEffect(() => {
  }, [])


  useEffect(() => {
    if (consultingStartTime == null) {
      setConsultingStartTime(0);
    }
    if (consultingStartTime !== 0) {
      const updatingData = [
        { name: 'consultingDate', data: { year, month: Number(month.slice(0, -1)), date: selectedDate } },
        { name: 'consultingTime', data: consultingTime },
        { name: 'consultingStartTime', data: consultingStartTime },
      ]
      setIsFinishSet && setIsFinishSet(true)
      updateReservation(params.id, updatingData)

    } else {
      setIsFinishSet && setIsFinishSet(false)
    }
  }, [consultingStartTime])


  useEffect(() => {
    setSelectedDate(selectedDateObj.getDate())
    setMonth((selectedDateObj.getMonth() + 1) + '월')
  }, [selectedDateObj])

  useEffect(() => {
    console.log('availableTimes', availableTimes)
  }, [availableTimes])

  return (
    <CalendarWrapper>
      <Card title={'상담 가능 일정'} min_width={'400px'}>
        <CalendarContentWrapper>

          <CalendarMentorUpper
            availableDates={availableDates}
            selectedDateObjProp={selectedDateObj}
            onClickAvailableDateProps={onClickAvailableDate}
            onDateChange={(dateObject) => {
              setSelectedDateObj(dateObject);
            }} />
          {`${year}-${selectedDateObj.getMonth() + 1}-${selectedDateObj.getDate()}`}
          <AddOutlined />

          <Flex>
            <AddNewAvailableTime onSetTime={(time) => { addNewAvailableTime(selectedDate, time) }} />
          </Flex>
          {availableTimes[selectedDate] && availableTimes[selectedDate].map((e, index) => {
            let startAMPM = e.startAMPM
            let startHour = e.startHour
            let startMin = e.startMin
            let endAMPM = e.endAMPM
            let endHour = e.endHour
            let endMin = e.endMin
            let isRepeat = e.isRepeat
            return <Flex key={index}>
              {index}={startAMPM}-{startHour}-{startMin}~{endAMPM}-{endHour}-{endMin}-{isRepeat}
            </Flex>
          })}

        </CalendarContentWrapper>
      </Card >
    </CalendarWrapper>

  );
}

export default CalendarMentor;
