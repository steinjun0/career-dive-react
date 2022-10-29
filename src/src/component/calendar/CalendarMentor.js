import { useEffect, useState } from "react";
import { styled } from "@mui/material";


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

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ShortcutOutlinedIcon from '@mui/icons-material/ShortcutOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';



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
  borderRadius: '8px',

};

const repeatOptionConverter = {
  '반복 없음': 'custom',
  '매일 반복': 'day',
  '매주 반복': 'week',
  'custom': '반복 없음',
  'day': '매일 반복',
  'week': '매주 반복',
}

function SetAvailableTime({ onSetTime, onRemoveRule, onRemoveNotRule, initialTime, setIsAdding, setIsEditing, style }) {
  const hoursList = ['밤 12', '오전 01', '오전 02', '오전 03', '오전 04', '오전 05', '오전 06', '오전 07', '오전 08', '오전 09', '오전 10', '오전 11', '오전 12',
    '오후 01', '오후 02', '오후 03', '오후 04', '오후 05', '오후 06', '오후 07', '오후 08', '오후 09', '오후 10', '오후 11']
  const minsList = ['00', '30']

  const [startAMPM, setStartAMPM] = useState('오전')
  const [startHour, setStartHour] = useState('08')
  const [startAMPMHour, setStartAMPMHour] = useState('오전 08')
  const [startMin, setStartMin] = useState('00')

  const [endAMPM, setEndAMPM] = useState('오후')
  const [endHour, setEndHour] = useState('02')
  const [endAMPMHour, setEndAMPMHour] = useState('오후 02')
  const [endMin, setEndMin] = useState('00')

  const [repeatOption, setRepeatOption] = useState('매주 반복')
  const [isShow, setIsShow] = useState(true)
  const [isShowDeleteDropDown, setIsShowDeleteDropDown] = useState(false)
  useEffect(() => {
    if (initialTime) {
      setStartAMPM(initialTime.startAMPM)
      setStartHour(initialTime.startHour.toString().padStart(2, '0'))
      setStartAMPMHour(`${initialTime.startAMPM} ${initialTime.startHour.toString().padStart(2, '0')}`)
      setStartMin(initialTime.startMin)
      setEndAMPM(initialTime.endAMPM)
      setEndHour(initialTime.endHour.toString().padStart(2, '0'))
      setEndAMPMHour(`${initialTime.endAMPM} ${initialTime.endHour.toString().padStart(2, '0')}`)
      setEndMin(initialTime.endMin)

      setRepeatOption(initialTime.repeatOption)
    }
  }, [])

  useEffect(() => {
    const spaceIndex = startAMPMHour.indexOf(' ')
    setStartAMPM(startAMPMHour.slice(0, spaceIndex))
    setStartHour(startAMPMHour.slice(spaceIndex + 1))
    if (initialTime) {
      initialTime.startAMPM = startAMPMHour.slice(0, spaceIndex)
      initialTime.startHour = startAMPMHour.slice(spaceIndex + 1)
    }

  }, [startAMPMHour])

  useEffect(() => {
    const spaceIndex = endAMPMHour.indexOf(' ')
    setEndAMPM(endAMPMHour.slice(0, spaceIndex))
    setEndHour(endAMPMHour.slice(spaceIndex + 1))
    if (initialTime) {
      initialTime.endAMPM = endAMPMHour.slice(0, spaceIndex)
      initialTime.endHour = endAMPMHour.slice(spaceIndex + 1)
    }
  }, [endAMPMHour])


  const openDeleteDropDown = () => {
    setIsShowDeleteDropDown(true)
  }

  const closeDeleteDropDown = () => {
    setIsShowDeleteDropDown(false)
  }

  return (isShow &&
    <RowAlignCenterFlex
      style={Object.assign({ width: '100%', justifyContent: 'space-between' }, style)}>
      <RowAlignCenterFlex>
        <SimpleMenu
          style={Object.assign({ wordSpacing: '4px' }, calendarSimpleMenuStyle)}
          title={startAMPMHour}
          menuItems={hoursList}
          onClickProps={initialTime ? (text) => { } : () => { }}
          setState={setStartAMPMHour}
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
          style={Object.assign({ wordSpacing: '4px' }, calendarSimpleMenuStyle)}
          title={endAMPMHour}
          menuItems={hoursList.slice(hoursList.indexOf(startAMPMHour) + (startMin == '00' ? 0 : 1))}
          onClickProps={initialTime ? (text) => { } : () => { }}
          setState={setEndAMPMHour}
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
      </RowAlignCenterFlex>


      {/* 새로운 시간 추가(post) */}
      {!initialTime && <Flex>
        <CustomButton
          background_color={colorBackgroundGrayLight}
          custom_color={colorTextLight}

          style={{ padding: 0, marginLeft: 'auto', padding: '7px', }}
          onClick={() => {
            setIsAdding(false)
          }}
        >
          <ShortcutOutlinedIcon
            style={{ transform: 'scaleX(-1)' }}
            fontSize={'small'}
          />
        </CustomButton>
        <EmptyWidth width={'10px'} />
        <CustomButton
          background_color={colorBackgroundCareerDiveBlue}
          custom_color={colorCareerDiveBlue}

          style={{ padding: 0, marginLeft: 'auto', padding: '7px', }}
          onClick={() => {
            onSetTime({ startAMPM, startHour, startMin, endAMPM, endHour, endMin, repeatOption })
          }}
        >
          <CheckIcon
            color={colorCareerDiveBlue}
            fontSize={'small'}
          />
        </CustomButton>
      </Flex>}


      {/* 기존 시간 수정(patch) */}
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
      />}

      {isShowDeleteDropDown && <Flex style={{ position: 'relative' }}>
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
    await postConsultScheduleList(temp)
    await postConsultScheduleRule(temp)
    const res = await getConsultSchedule()
  }

  // 날짜 선택시, 기존값 초기화
  const onClickAvailableDate = (date) => {
    setSelectedDate(date);
  }

  const getConsultSchedule = async () => {
    try {
      const res = await API.getConsultSchedule(
        year,
        month.slice(0, -1),
        Number(localStorage.getItem('UserID')))
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

  const postConsultScheduleList = async (availableTimesProps) => {
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
          const type = repeatOptionConverter[e.repeatOption]

          const res = await API.postConsultScheduleRule(
            startTime,
            endTime,
            weekDay,
            type,
            Number(localStorage.getItem('UserID')),
            `${year}-${(month.slice(0, -1)).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
          )
        })
    )
  }

  const patchConsultScheduleList = async (availableTimesProps) => {
    await Promise.all(
      availableTimesProps[selectedDate].filter((e) => {
        if (e.repeatOption === '반복 없음') {
          return true
        }
        return false
      }).map(
        async (e) => {
          const startTime = `${String(Number(e.startHour) + (e.startAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.startMin)).padStart(2, '0')}`
          const endTime = `${String(Number(e.endHour) + (e.endAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.endMin)).padStart(2, '0')}`
          const res = await API.patchConsultSchedule(
            e.scheduleId,
            startTime,
            endTime,
            Number(localStorage.getItem('UserID')),
            // `${year}-${(month.slice(0, -1)).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
          )
        })
    )
  }

  const patchConsultScheduleRule = async (availableTimesProps) => {
    await Promise.all(
      availableTimesProps[selectedDate].filter((e) => {
        if (e.repeatOption === '반복 없음') { // rule만 골라내는 filter
          return false
        } else {
          return true
        }
      }).map(
        async (e) => {
          const startTime = `${String(Number(e.startHour) + (e.startAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.startMin)).padStart(2, '0')}`
          const endTime = `${String(Number(e.endHour) + (e.endAMPM === '오후' ? 12 : 0)).padStart(2, '0')}:${String(Number(e.endMin)).padStart(2, '0')}`
          const weekDay = new Date(year, Number(month.slice(0, -1)) - 1, selectedDate).getDay()
          const type = repeatOptionConverter[e.repeatOption]
          if (e.ruleId !== undefined) {
            if (e.ruleId !== -1) {
              const res = await API.patchConsultScheduleRule(
                e.ruleId,
                startTime,
                endTime,
                weekDay,
                type,
                Number(localStorage.getItem('UserID')),
                `${year}-${(month.slice(0, -1)).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
              )
              return
            }
          }

          const res = await API.postConsultScheduleRule(
            startTime,
            endTime,
            weekDay,
            type,
            Number(localStorage.getItem('UserID')),
            `${year}-${(month.slice(0, -1)).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`
          )

        })
    )
  }


  const deleteConsultScheduleList = async (availableTimesProps) => {
    let popList = []
    await Promise.all(availableTimesProps[selectedDate].map(async (e) => {
      if (e.isDeleting) {
        const res = await API.deleteConsultSchedule(e.scheduleId)
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

  const cleanIsDeletingSchedule = (scheduleList) => {
    availableTimes[selectedDate].map(() => {

    })
  }

  const deleteConsultScheduleRuleQueue = async (availableTimesProps) => {
    let popList = []
    await Promise.all(availableTimesProps[selectedDate].map(async (e) => {
      if (e.isDeleting && e.ruleId !== undefined) {
        const res = await API.deleteConsultScheduleRule(
          e.ruleId,
          `${year}-${(month.slice(0, -1)).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`)
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
            <TextHeading6>세부 시간 설정</TextHeading6>
            {!isAdding && availableTimes[selectedDate] && !isEditing && <CustomButton
              background_color={colorBackgroundGrayLight}
              custom_color={colorTextLight}
              style={{ padding: '7px' }}
              onClick={() => {
                setTempAvailableTime(availableTimes[selectedDate] ? [...availableTimes[selectedDate]] : [])
                setIsEditing(true)
              }}
            >
              <ModeEditOutlineOutlinedIcon fontSize={'small'} />
            </CustomButton>}
            {isEditing && <Flex>
              <CustomButton
                background_color={colorBackgroundGrayLight}
                custom_color={colorTextLight}
                style={{ padding: '7px' }}
                onClick={() => {
                  availableTimes[selectedDate] = tempAvailableTime
                  setTempAvailableTime([])
                  setIsEditing(false)
                }}
              >
                <ShortcutOutlinedIcon
                  style={{ transform: 'scaleX(-1)' }}
                  fontSize={'small'}
                />
              </CustomButton>
              <EmptyWidth width={'16px'} />
              <CustomButton
                background_color={colorBackgroundCareerDiveBlue}
                custom_color={colorCareerDiveBlue}
                style={{ padding: '7px' }}
                onClick={async () => {
                  await patchConsultScheduleList(availableTimes)
                  await patchConsultScheduleRule(availableTimes)
                  await deleteConsultScheduleList(availableTimes)
                  await deleteConsultScheduleRuleQueue(availableTimes)
                  setIsEditing(false)
                  await getConsultSchedule()
                }}
              >
                <CheckIcon
                  fontSize={'small'}
                />
              </CustomButton>
            </Flex>}

          </Flex>

          {!isEditing && availableTimes[selectedDate] && availableTimes[selectedDate].sort((a, b) => +a.startHour + (a.startAMPM === '오전' ? 0 : 12) - +b.startHour - (b.startAMPM === '오전' ? 0 : 12)).map((e, index) => {
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

          {isAdding && <Flex style={{ marginTop: '16px' }}>
            <SetAvailableTime
              onSetTime={async (time) => {
                await addNewAvailableTime(selectedDate, time)
                setIsAdding(false)
              }}
              setIsAdding={setIsAdding}
            />
          </Flex>}
          {isEditing && availableTimes[selectedDate] && availableTimes[selectedDate].map((e, index) => {
            return <SetAvailableTime
              key={index}
              style={{ marginTop: '16px' }}
              setIsEditing={setIsEditing}
              onRemoveRule={() => {
                const index = availableTimes[selectedDate].indexOf(e);
                Object.assign(availableTimes[selectedDate][index], { isDeleting: true, scheduleId: e.scheduleId })
              }}
              onRemoveNotRule={() => {
                // const index = availableTimes[selectedDate].indexOf(e);
                // Object.assign(availableTimes[selectedDate][index], { isDeleting: true, scheduleId: e.scheduleId })
                // availableTimes[selectedDate].splice(index, 1);
                availableTimes[selectedDate].push({ isDeleting: true, scheduleId: e.scheduleId })
              }}
              initialTime={e} />
          })}

          {!isAdding && !isEditing &&
            <Flex>
              <CustomButton
                background_color={colorBackgroundCareerDiveBlue}
                custom_color={colorCareerDiveBlue}
                onClick={async () => {
                  setIsAdding(true)
                }}
                style={{ marginTop: '16px', width: '32px', height: '32px' }}
              >
                <AddIcon />
              </CustomButton>
            </Flex>
          }

        </CalendarContentWrapper>
      </Card >
    </CalendarWrapper>

  );
}

export default CalendarMentor;
