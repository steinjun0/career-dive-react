import { useEffect, useRef, useState } from "react";
import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { Card } from "util/Card"

import {
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex,
  colorBackgroundGrayLight,
  EmptyHeight,
  TextSubtitle1,
  RowAlignCenterFlex,
  EmptyWidth,
  TextBody2,
  colorBackgroundCareerDiveBlue,
  TextHeading6,
  colorBackgroundCareerDivePink,
  colorCareerDivePink
} from "util/styledComponent";
import { TagLarge } from "util/Custom/CustomTag";

import { CustomButton } from "util/Custom/CustomButton";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomToggleButtonGroup } from "util/Custom/CustomToggleButtonGroup";
import { addMinute, updateReservation, usePrevious } from "util/util";
import CalendarMentorUpper from "component/CalendarMentorUpper";
import { AddOutlined } from "@material-ui/icons";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SimpleMenu from "util/SimpleMenu";
import { CustomIconButton } from "util/Custom/CustomIconButton";


const CalendarWrapper = styled(Flex)`
  width: 100%;
  // margin-top: 30px;
  transition: all 0.3s ease-out;
`

const CalendarContentWrapper = styled(VerticalFlex)`
  justify-content: start;
`;

const calendarSimpleMenuStyle = {
  fontWeight: 400,
  fontSize: 14,
  color: colorTextLight,
  backgroundColor: colorBackgroundGrayLight,
  padding: '4px 12px',
  minWidth: 0,
  borderRadius: '8px'
};

function SetAvailableTime({ onSetTime, onRemove, initialTime, style }) {
  let housrList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  let minsList = ['00', '10', '20', '30', '40', '50']
  const [startAMPM, setStartAMPM] = useState('오전')
  const [startHour, setStartHour] = useState('01')
  const [startMin, setStartMin] = useState('00')
  const [endAMPM, setEndAMPM] = useState('오전')
  const [endHour, setEndHour] = useState('01')
  const [endMin, setEndMin] = useState('00')
  const [repeatOption, setRepeatOption] = useState('매일 반복')
  const [isShow, setIsShow] = useState(true)

  useEffect(() => {
    if (initialTime) {
      setStartAMPM(initialTime.startAMPM)
      setStartHour(initialTime.startHour)
      setStartMin(initialTime.startMin)
      setEndAMPM(initialTime.endAMPM)
      setEndHour(initialTime.endHour)
      setEndMin(initialTime.endMin)
      setRepeatOption(initialTime.repeatOption)
    }
  }, [])


  return (isShow &&
    <RowAlignCenterFlex
      style={Object.assign({ width: '100%' }, style)}>
      <SimpleMenu
        style={calendarSimpleMenuStyle}
        title={startAMPM}
        menuItems={['오전', '오후']}
        onClickProps={initialTime ? (text) => { initialTime.startAMPM = text } : () => { }}
        setState={setStartAMPM}
      />
      <EmptyWidth width={'4px'} />
      <SimpleMenu
        style={calendarSimpleMenuStyle}
        title={startHour}
        menuItems={housrList}
        onClickProps={initialTime ? (text) => { initialTime.startHour = text } : () => { }}
        setState={setStartHour}
      />
      <EmptyWidth width={'4px'} />
      :
      <EmptyWidth width={'4px'} />
      <SimpleMenu
        style={calendarSimpleMenuStyle}
        title={startMin}
        menuItems={minsList}
        onClickProps={initialTime ? (text) => { initialTime.startMin = text } : () => { }}
        setState={setStartMin}
      />
      <EmptyWidth width={'4px'} />
      ~
      <EmptyWidth width={'4px'} />
      <SimpleMenu
        style={calendarSimpleMenuStyle}
        title={endAMPM}
        menuItems={['오전', '오후']}
        onClickProps={initialTime ? (text) => { initialTime.endAMPM = text } : () => { }}
        setState={setEndAMPM}
      />
      <EmptyWidth width={'4px'} />
      <SimpleMenu
        style={calendarSimpleMenuStyle}
        title={endHour}
        menuItems={housrList}
        onClickProps={initialTime ? (text) => { initialTime.endHour = text } : () => { }}
        setState={setEndHour}
      />
      <EmptyWidth width={'4px'} />
      :
      <EmptyWidth width={'4px'} />
      <SimpleMenu
        style={calendarSimpleMenuStyle}
        title={endMin}
        menuItems={minsList}
        onClickProps={initialTime ? (text) => { initialTime.endMin = text } : () => { }}
        setState={setEndMin}
      />
      <EmptyWidth width={'4px'} />
      <SimpleMenu
        style={calendarSimpleMenuStyle}
        title={`${repeatOption}`}
        menuItems={['매일 반복', '매주 반복', '반복 없음']}
        onClickProps={initialTime ? (text) => { initialTime.repeatOption = text } : () => { }}
        setState={setRepeatOption}
        endIcon={<KeyboardArrowDownIcon />}
      />
      <EmptyWidth width={'4px'} />


      {!initialTime && <CustomButton
        style={{ padding: 0, marginLeft: 'auto', padding: '4px 12px' }}
        height={'32px'}
        width={'0px'}
        onClick={() => {
          onSetTime({ startAMPM, startHour, startMin, endAMPM, endHour, endMin, repeatOption })
        }}
      >
        <TextBody2>확인</TextBody2>
      </CustomButton>}

      {initialTime && <CustomIconButton
        style={{ marginLeft: 'auto' }}
        Icon={DeleteIcon}
        default_color={colorBackgroundCareerDivePink}
        default_text_color={colorCareerDivePink}
        hover_color={colorCareerDivePink}
        onClick={() => {
          onRemove()
          setIsShow(false)
        }}
      />}

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

  const [isAdding, setIsAdding] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [tempAvailableTime, setTempAvailableTime] = useState([])


  const addNewAvailableTime = (selectedDate, { startAMPM, startHour, startMin, endAMPM, endHour, endMin, repeatOption }) => {
    let temp = JSON.parse(JSON.stringify(availableTimes))
    if (typeof temp[selectedDate] == 'object') {
      temp[selectedDate].push({ startAMPM, startHour, startMin, endAMPM, endHour, endMin, repeatOption })
    } else {
      temp[selectedDate] = [{ startAMPM, startHour, startMin, endAMPM, endHour, endMin, repeatOption }]
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
    // console.log('availableTimes', availableTimes)
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
          {/* {`${year}-${selectedDateObj.getMonth() + 1}-${selectedDateObj.getDate()}`}
          <AddOutlined /> */}
          <Flex style={{ justifyContent: 'space-between', marginTop: '24px', marginBottom: '8px' }}>
            <TextHeading6>상담 가능 시간대 설정</TextHeading6>
            {!isAdding && !isEditing && <CustomButton
              background_color={colorBackgroundGrayLight}
              custom_color={colorTextLight}
              width={'0px'}
              height={'32px'}
              style={{ padding: '4px 12px' }}
              onClick={() => {
                setTempAvailableTime([...availableTimes[selectedDate]])
                setIsEditing(true)
              }}
            >
              <TextBody2>
                수정
              </TextBody2>
            </CustomButton>}
            {isEditing && <Flex>
              <CustomButton
                background_color={colorBackgroundGrayLight}
                custom_color={colorTextLight}
                width={'0px'}
                height={'32px'}
                style={{ padding: '4px 12px' }}
                onClick={() => {
                  availableTimes[selectedDate] = tempAvailableTime
                  setTempAvailableTime([])
                  setIsEditing(false)
                }}
              >
                <TextBody2>
                  취소
                </TextBody2>
              </CustomButton>
              <EmptyWidth width={'16px'} />
              <CustomButton
                background_color={colorCareerDiveBlue}
                custom_color={'white'}
                width={'0px'}
                height={'32px'}
                style={{ padding: '4px 12px' }}
                onClick={() => {
                  setIsEditing(false)
                }}
              >
                <TextBody2>
                  저장
                </TextBody2>
              </CustomButton>
            </Flex>}

          </Flex>



          {!isEditing && availableTimes[selectedDate] && availableTimes[selectedDate].map((e, index) => {
            let startAMPM = e.startAMPM
            let startHour = e.startHour
            let startMin = e.startMin
            let endAMPM = e.endAMPM
            let endHour = e.endHour
            let endMin = e.endMin
            let repeatOption = e.repeatOption
            return <Flex key={index} style={{ justifyContent: 'space-between', marginTop: '16px' }}>
              <TagLarge style={{ padding: '4px 12px' }}>
                <TextBody2>
                  {startAMPM} {startHour}:{startMin} ~ {endAMPM} {endHour} : {endMin} · {repeatOption}
                </TextBody2>
              </TagLarge>
            </Flex>
          })}

          {isEditing && availableTimes[selectedDate] && availableTimes[selectedDate].map((e, index) => {

            return <SetAvailableTime
              key={index}
              style={{ marginTop: '16px' }}
              onRemove={() => {
                const index = availableTimes[selectedDate].indexOf(e);
                if (index > -1) {
                  availableTimes[selectedDate].splice(index, 1);
                }
              }}
              initialTime={e} />
          })}

          {isAdding && <Flex style={{ marginTop: '16px' }}>
            <SetAvailableTime onSetTime={(time) => {
              addNewAvailableTime(selectedDate, time)
              setIsAdding(false)
            }} />
          </Flex>}

          {!isAdding && !isEditing &&
            <Flex>
              <CustomButton
                background_color={colorBackgroundCareerDiveBlue}
                custom_color={colorCareerDiveBlue}
                width={'0px'}
                height={'0px'}
                onClick={() => { setIsAdding(true) }}
                style={{ marginTop: '16px', padding: '4px 12px' }}
              >
                <TextBody2>
                  추가
                </TextBody2>
              </CustomButton>
            </Flex>
          }

        </CalendarContentWrapper>
      </Card >
    </CalendarWrapper>

  );
}

export default CalendarMentor;
