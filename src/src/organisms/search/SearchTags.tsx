import { Flex, colorBackgroundGrayMedium } from "util/styledComponent";
import React, { useState } from "react";
import RoundedGraySelect from "component/select/RoundedGraySelect";
import CustomTogglebutton from "component/button/CustomToggleButton";
import { ToggleButtonGroup } from "@mui/material";
export default function SearchBar() {
  const [sector, setSector] = useState<string>();
  return <Flex sx={{ gap: '16px', marginTop: '35px', justifyContent: 'center', alignItems: 'center' }}>
    <RoundedGraySelect
      texts={['반도체', 'IT']}
      label="업종"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
    <RoundedGraySelect
      texts={['대기업', '중소기업']}
      label="기업형태"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
    <RoundedGraySelect
      texts={['좋음', '나쁨']}
      label="만족도"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
    <div style={{ borderRight: `2px solid ${colorBackgroundGrayMedium}`, height: '20px' }} />

    <CustomTogglebutton value={20}>일반</CustomTogglebutton>
    <CustomTogglebutton value={20}>프리미엄</CustomTogglebutton>


    <RoundedGraySelect
      texts={['반도체', 'IT']}
      label="업종"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
    <RoundedGraySelect
      texts={['면접 준비', '시험 준비']}
      label="상담 내용"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
  </Flex>;
}