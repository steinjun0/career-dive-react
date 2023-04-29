import BasicTextField from "component/input/BasicTextField";
import React, { useState } from "react";
import { VerticalFlex, TextSubtitle2, Flex, colorBackgroundGrayLight, colorTextLight, TextBody2, colorBackgroundGrayMedium, colorCareerDivePink, colorBackgroundCareerDivePink, colorBackgroundGrayDark } from "util/styledComponent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Job, Sector, categorizedJobs } from "interfaces/job";


export default function GetJobInfo(
  { sector, job, jobInComp, onClickSector, onClickJob, onChangeJobInComp }:
    {
      sector: Sector,
      job: Job,
      jobInComp: string,
      onClickSector: (clickedSector: Sector) => void,
      onClickJob: (clickedJob: Job) => void,
      onChangeJobInComp: (jobInComp: string) => void;
    }
) {
  const [isShowCategoryDropDown, setIsShowCategoryDropDown] = useState(false);

  return <VerticalFlex sx={{ width: '100%', gap: '16px' }}>
    <VerticalFlex sx={{ gap: '4px' }}>
      <TextSubtitle2>직무 정보*</TextSubtitle2>
    </VerticalFlex>
    <Flex
      style={{ backgroundColor: colorBackgroundGrayLight, color: colorTextLight, padding: '10px 20px', justifyContent: 'space-between', cursor: 'pointer' }}
      onClick={() => {
        setIsShowCategoryDropDown(!isShowCategoryDropDown);
      }}
    >
      <TextBody2 color={colorTextLight} style={{ lineHeight: '28px' }}>{job !== '' ? `${sector} | ${job}` : '직무'}</TextBody2>
      <KeyboardArrowDownIcon sx={{ color: colorTextLight }} />
    </Flex>

    {isShowCategoryDropDown &&
      <VerticalFlex >
        <Flex style={{ backgroundColor: colorBackgroundGrayLight, borderRadius: '8px', marginTop: '16px', overflow: 'hidden' }}>
          <VerticalFlex
            style={{ borderRight: `1px solid ${colorBackgroundGrayMedium}` }}>
            {(Object.keys(categorizedJobs) as Sector[]).map((elem, i) => {
              return <Flex
                key={i}
                style={{
                  padding: '4px 20px',
                  cursor: 'pointer',
                  color: sector === elem ? colorCareerDivePink : 'black',
                  backgroundColor: sector === elem ? colorBackgroundCareerDivePink : colorBackgroundGrayLight,
                }}
                onClick={() => {
                  onClickSector(elem);
                }}>
                <TextBody2 style={{ lineHeight: '28px' }}>{elem}</TextBody2>
              </Flex>;
            })}
          </VerticalFlex>
          <VerticalFlex style={{ flex: 1 }}>
            {sector !== null && categorizedJobs[sector].map((elem, i) => {
              return <Flex
                key={i}
                style={{
                  padding: '4px 20px',
                  color: job === elem ? colorCareerDivePink : colorBackgroundGrayDark,
                  backgroundColor: job === elem ? colorBackgroundCareerDivePink : colorBackgroundGrayLight,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  onClickJob(elem);
                  setIsShowCategoryDropDown(false);
                }}>
                <TextBody2 style={{ lineHeight: '28px' }}>{elem}</TextBody2>
              </Flex>;
            })}
          </VerticalFlex>
        </Flex>
      </VerticalFlex>
    }
    <BasicTextField
      placeholder='사내 직무명(선택)'
      value={jobInComp}
      onChange={(e) => {
        onChangeJobInComp(e.target.value);
      }}
    />
  </VerticalFlex>;
}