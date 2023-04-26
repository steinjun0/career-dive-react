import { Flex } from "util/styledComponent";
import React, { useState } from "react";
import RoundedGraySelect from "component/select/RoundedGraySelect";
export default function SearchBar() {
  const [sector, setSector] = useState<string>();
  return <Flex sx={{ gap: '16px', marginTop: '35px' }}>
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
      texts={['반도체', 'IT']}
      label="업종"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
    |
    <RoundedGraySelect
      texts={['반도체', 'IT']}
      label="업종"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
    <RoundedGraySelect
      texts={['반도체', 'IT']}
      label="업종"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
    <RoundedGraySelect
      texts={['반도체', 'IT']}
      label="업종"
      handleChange={(value) => { setSector(value.target.value as string); }}
    />
  </Flex>;
}