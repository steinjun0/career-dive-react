import { Flex, TextBody1, colorBackgroundCareerDiveBlue, colorBackgroundCareerDivePink, colorBackgroundGrayMedium, colorCareerDiveBlue, colorCareerDivePink } from "util/styledComponent";
import React, { useState } from "react";
import RoundedGraySelect from "component/select/RoundedGraySelect";
import CustomTogglebutton from "component/button/BasicToggleButton";

export default function SearchBar() {
  const [sector, setSector] = useState<string>();
  const [isPremium, setIsPremium] = useState<boolean>(false);
  return <Flex sx={{ gap: '16px', marginTop: '35px', justifyContent: 'center', alignItems: 'center' }}>
    <Flex sx={{ gap: '16px', justifyContent: 'flex-end' }}>
      {/* <RoundedGraySelect
        texts={['반도체', 'IT']}
        label="업종"
        handleChange={(value) => { setSector(value.target.value as string); }}
      />
      <RoundedGraySelect
        texts={['대기업', '중소기업']}
        label="기업형태"
        handleChange={(value) => { setSector(value.target.value as string); }}
      /> */}
      <RoundedGraySelect
        texts={['좋음', '나쁨']}
        label="만족도"
        handleChange={(value) => { setSector(value.target.value as string); }}
      />
    </Flex>

    {/* <div style={{ borderRight: `2px solid ${colorBackgroundGrayMedium}`, height: '20px' }} /> */}
    <Flex sx={{ gap: '16px', }}>
      <CustomTogglebutton
        sx={{ height: '44px' }}
        selectedBackgroundColor={colorBackgroundCareerDiveBlue}
        selectedColor={colorCareerDiveBlue}
        selected={!isPremium}
        onClick={() => { setIsPremium(false); }}
      >
        <span style={{ fontWeight: '400', fontSize: '16px' }}>일반</span>
      </CustomTogglebutton>
      <CustomTogglebutton
        sx={{ height: '44px' }}
        selectedBackgroundColor={colorBackgroundCareerDivePink}
        selectedColor={colorCareerDivePink}
        selected={isPremium}
        onClick={() => { setIsPremium(true); }}
      >
        <span style={{ fontWeight: '400', fontSize: '16px' }}>프리미엄</span>
      </CustomTogglebutton>

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
    </Flex>
  </Flex>;
}