import { useEffect, useState } from "react";
import { styled } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import { Card } from "util/Card"

import {
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex,
  colorBackgroundGrayLight,
  RowAlignCenterFlex,
  EmptyWidth,
  TextBody2,
  colorBackgroundCareerDiveBlue,
  TextHeading6,
  colorBackgroundCareerDivePink,
  colorCareerDivePink,
  EmptyHeight
} from "util/styledComponent";
import { TagLarge } from "util/Custom/CustomTag";

import { CustomButton } from "util/Custom/CustomButton";
import CalendarMentorUpper from "component/calendar/CalendarMentorUpper";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SimpleMenu from "util/SimpleMenu";
import { CustomIconButton } from "util/Custom/CustomIconButton";
import API from "API";


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

const repeatOptionConverter = {
  '반복 없음': 'custom',
  '매일 반복': 'day',
  '매주 반복': 'week',
  'custom': '반복 없음',
  'day': '매일 반복',
  'week': '매주 반복',
}

function SetAvailableTime({ onSetTime, onRemoveRule, onRemoveNotRule, initialTime, style }) {
  const housrList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  const minsList = ['00', '10', '20', '30', '40', '50']

  const [startAMPM, setStartAMPM] = useState('오전')
  const [startHour, setStartHour] = useState('01')
  const [startMin, setStartMin] = useState('00')
  const [endAMPM, setEndAMPM] = useState('오전')
  const [endHour, setEndHour] = useState('01')
  const [endMin, setEndMin] = useState('00')
  const [repeatOption, setRepeatOption] = useState('매일 반복')
  const [isShow, setIsShow] = useState(true)
  const [isShowDeleteDropDown, setIsShowDeleteDropDown] = useState(false)
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

  const openDeleteDropDown = () => {
    setIsShowDeleteDropDown(true)
  }

  const closeDeleteDropDown = () => {
    setIsShowDeleteDropDown(false)
  }

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
          if (repeatOption === '반복 없음') {
            onRemoveNotRule()
            setIsShow(false)
          }
          else {
            openDeleteDropDown()
          }
        }}
      />}{
        isShowDeleteDropDown && <Flex style={{ position: 'relative' }}>
          <VerticalFlex style={{ position: 'absolute', top: '24px', left: '-40px', width: '70px', padding: '8px', backgroundColor: 'gray' }}>
            <Flex style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={() => closeDeleteDropDown()}>X</Flex>
            <Flex
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onRemoveRule()
                setIsShow(false)
              }}>규칙 삭제</Flex>
            <EmptyHeight height="8px" />
            <Flex
              style={{ cursor: 'pointer' }}
              onClick={() => {
                onRemoveNotRule()
                setIsShow(false)
              }}>일자 삭제</Flex>
          </VerticalFlex>
        </Flex>
      }
    </RowAlignCenterFlex>
  )

}


function CalendarMentor() {
  const year = 2022;
  const [month, setMonth] = useState(`${new Date().getMonth() + 1}월`);

  const [selectedDate, setSelectedDate] = useState(0);

  const [selectedDateObj, setSelectedDateObj] = useState(new Date());

  const [availableTimes, setAvailableTimes] = useState({})
  const [availableDates, setAvailableDates] = useState([])


  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [tempAvailableTime, setTempAvailableTime] = useState([])

  const ruleTypeConverter = { custom: '반복 없음', week: '매주 반복', day: '매일 반복' }


  const addNewAvailableTime = async (selectedDate, { startAMPM, startHour, startMin, endAMPM, endHour, endMin, repeatOption }) => {
    let temp = JSON.parse(JSON.stringify(availableTimes))
    if (typeof temp[selectedDate] == 'object') {
      temp[selectedDate].push({ startAMPM, startHour, startMin, endAMPM, endHour, endMin, repeatOption })
    } else {
      temp[selectedDate] = [{ startAMPM, startHour, startMin, endAMPM, endHour, endMin, repeatOption }]
    }
    postConsultSchedule(temp)
    postConsultScheduleRule(temp)
    setAvailableTimes(temp)
  }

  // 날짜 선택시, 기존값 초기화
  const onClickAvailableDate = (date) => {
    setSelectedDate(date);
  }

  const getConsultSchedule = async () => {
    try {
      const res = await API.getConsultSchedule(year, month.slice(0, -1), Number(localStorage.getItem('UserID')))
      if (res.status === 200) {
        if (res.data.DayTimes !== null) {
          const tempDayTimes = []
          const tempAvailableTime = {}
          res.data.DayTimes.map((e) => {
            tempDayTimes.push(e.Day)
            tempAvailableTime[e.Day] = []
            e.StartEnds.map((i) => {
              let startHour = i.StartTime.slice(0, i.StartTime.indexOf(':'))
              let startAMPM = startHour <= 12 ? '오전' : '오후'
              startHour = startHour <= 12 ? startHour : startHour - 12
              let startMin = i.StartTime.slice(i.StartTime.indexOf(':') + 1)

              let endHour = i.EndTime.slice(0, i.EndTime.indexOf(':'))
              let endAMPM = endHour <= 12 ? '오전' : '오후'
              endHour = endHour <= 12 ? endHour : endHour - 12
              let endMin = i.EndTime.slice(i.EndTime.indexOf(':') + 1)

              let repeatOption = ruleTypeConverter[i.RuleType]

              tempAvailableTime[e.Day].push({
                startAMPM, startHour, startMin,
                endAMPM, endHour, endMin,
                repeatOption,
                scheduleId: i.ScheduleID,
                ruleId: i.RuleID
              })

            })
            // setAvailableDates([...availableDates, e.Day])
          })
          setAvailableDates(tempDayTimes)
          setAvailableTimes(tempAvailableTime)
        } else {
          setAvailableDates([])
          setAvailableTimes({})
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const postConsultSchedule = async (availableTimesProps) => {
    const dayTimes = [...Object.keys(availableTimesProps).map((date) => {
      return {
        Day: Number(date),
        StartEnds: [...availableTimesProps[date].filter((e) => {
          if (e.repeatOption === '반복 없음') {
            return true
          }
          return false
        }).map((e) => {
          return {
            StartTime: `${String(Number(e.startHour) + (e.startAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.startMin)).padStart(2, '0')}`,
            EndTime: `${String(Number(e.endHour) + (e.endAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.endMin)).padStart(2, '0')}`,
          }
        })],
      }
    })]

    const res = await API.postConsultSchedule(dayTimes,
      year,
      Number(month.slice(0, -1)),
      Number(localStorage.getItem('UserID'))
    )
    getConsultSchedule()
  }

  const postConsultScheduleRule = async (availableTimesProps) => {
    await Promise.all(
      availableTimesProps[selectedDate].filter((e) => {
        if (e.repeatOption === '반복 없음') {
          return false
        }
        return true
      }).map(
        async (e) => {
          const startTime = `${String(Number(e.startHour) + (e.startAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.startMin)).padStart(2, '0')}`
          const endTime = `${String(Number(e.endHour) + (e.endAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.endMin)).padStart(2, '0')}`
          const weekDay = new Date(year, Number(month.slice(0, -1)) - 1, selectedDate).getDay()
          const type = e.repeatOption

          const res = await API.postConsultScheduleRule(
            startTime,
            endTime,
            weekDay,
            repeatOptionConverter[type],
            Number(localStorage.getItem('UserID'))
          )
        })
    )
    getConsultSchedule()
  }

  const patchConsultScheduleRule = async (availableTimesProps) => {
    await Promise.all(
      availableTimesProps[selectedDate].filter((e) => {
        if (e.repeatOption === '반복 없음') {
          return false
        }
        return true
      }).map(
        async (e) => {
          const startTime = `${String(Number(e.startHour) + (e.startAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.startMin)).padStart(2, '0')}`
          const endTime = `${String(Number(e.endHour) + (e.endAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.endMin)).padStart(2, '0')}`
          const weekDay = new Date(year, Number(month.slice(0, -1)) - 1, selectedDate).getDay()
          const type = repeatOptionConverter[e.repeatOption]

          const res = await API.patchConsultScheduleRule(
            e.ruleId,
            startTime,
            endTime,
            weekDay,
            type,
            Number(localStorage.getItem('UserID'))
          )
        })
    )
    getConsultSchedule()
  }


  const deleteDateConsultSchedule = async () => {
    await Promise.all(tempAvailableTime.map(async (e) => {
      if (e.ruleId === -1) {
        const res = await API.deleteConsultSchedule(e.scheduleId)
        return res
      }
    }))
  }

  const deleteDateConsultScheduleRule = async (availableTimesProps) => {
    let popList = []
    await Promise.all(availableTimesProps[selectedDate].map(async (e) => {
      if (e.isDeleting) {
        const res = await API.deleteConsultScheduleRule(e.ruleId, `${year}-${(month.slice(0, -1)).padStart(2, '0')}-${selectedDate}`)
        popList.push(e)
        return res
      }
    }))

    popList.map((e) => {
      const index = tempAvailableTime.indexOf(e);
      if (index > -1) {
        tempAvailableTime.splice(index, 1);
      }
    })

  }


  useEffect(async () => {
    getConsultSchedule()
  }, [month])


  useEffect(() => {
    setSelectedDate(selectedDateObj.getDate())
  }, [selectedDateObj])

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
            }}
            month={month}
            setMonth={setMonth} />
          {/* {`${year}-${selectedDateObj.getMonth() + 1}-${selectedDateObj.getDate()}`}
          <AddOutlined /> */}
          <Flex style={{ justifyContent: 'space-between', marginTop: '24px', marginBottom: '8px' }}>
            <TextHeading6>상담 가능 시간대 설정</TextHeading6>
            {!isAdding && !isEditing && <CustomButton
              background_color={colorBackgroundGrayLight}
              custom_color={colorTextLight}
              style={{ padding: '4px 12px' }}
              onClick={() => {
                setTempAvailableTime(availableTimes[selectedDate] ? [...availableTimes[selectedDate]] : [])
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
                style={{ padding: '4px 12px' }}
                onClick={async () => {
                  await deleteDateConsultSchedule()
                  await postConsultSchedule(availableTimes)
                  await patchConsultScheduleRule(availableTimes)
                  await deleteDateConsultScheduleRule(availableTimes)
                  setIsEditing(false)
                  await getConsultSchedule()
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
                  {startAMPM} {startHour}:{startMin} ~ {endAMPM} {endHour}:{endMin} · {repeatOption}
                </TextBody2>
              </TagLarge>
            </Flex>
          })}

          {isEditing && availableTimes[selectedDate] && availableTimes[selectedDate].map((e, index) => {

            return <SetAvailableTime
              key={index}
              style={{ marginTop: '16px' }}
              onRemoveRule={() => {
                const index = availableTimes[selectedDate].indexOf(e);
                availableTimes[selectedDate].push({ isDeleting: true, ruleId: e.ruleId })
              }}
              onRemoveNotRule={() => {
                const index = availableTimes[selectedDate].indexOf(e);
                availableTimes[selectedDate].splice(index, 1);
              }}
              initialTime={e} />
          })}

          {isAdding && <Flex style={{ marginTop: '16px' }}>
            <SetAvailableTime onSetTime={async (time) => {
              await addNewAvailableTime(selectedDate, time)
              setIsAdding(false)
            }} />
          </Flex>}

          {!isAdding && !isEditing &&
            <Flex>
              <CustomButton
                background_color={colorBackgroundCareerDiveBlue}
                custom_color={colorCareerDiveBlue}
                onClick={async () => {
                  setIsAdding(true)
                }}
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
