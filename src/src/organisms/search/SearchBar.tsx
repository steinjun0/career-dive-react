import { Flex, VerticalFlex } from "util/styledComponent";
import React, { useState } from "react";
import SearchIcon from "assets/icon/search.svg";
import { styled } from "@mui/material";

const ColoredInput = styled('input')({
  '::placeholder': {
    color: '#BDBDBD'
  }
});

export default function SearchBar({ onSearch }: { onSearch: ({ company, tag, job }: { company?: string, tag?: string, job?: string; }) => void; }) {

  const [job, setJob] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [tag, setTag] = useState<string>('');

  return <VerticalFlex>
    <Flex sx={{
      border: '1px solid #828282',
      borderRadius: '25px',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      filter: 'drop-shadow(0px 8px 16px rgba(33, 33, 33, 0.05))'
    }}>
      <Flex sx={{ padding: '16px 24px' }}>
        <span style={{ fontWeight: 'bold', lineHeight: '24px', fontSize: '14px', marginRight: '14px' }}>직무</span>
        <ColoredInput
          type="text" placeholder="직무를 입력하세요" style={{ width: '122px' }}
          value={job}
          onChange={(e) => setJob(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch({ job, company, tag });
            }
          }}
        />
      </Flex>
      <Flex sx={{ padding: '16px 24px' }}>
        <span style={{ fontWeight: 'bold', lineHeight: '24px', fontSize: '14px', marginRight: '14px' }}>회사</span>
        <ColoredInput
          type="text" placeholder="회사를 입력하세요" style={{ width: '122px' }}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch({ job, company, tag });
            }
          }}
        />
      </Flex>
      <Flex sx={{ padding: '16px 24px' }}>
        <span style={{ fontWeight: 'bold', lineHeight: '24px', fontSize: '14px', marginRight: '14px' }}>태그</span>
        <ColoredInput
          type="text" placeholder="태그를 입력하세요" style={{ width: '122px' }}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch({ job, company, tag });
            }
          }}
        />
      </Flex>
      <img src={SearchIcon} alt="search" style={{ width: '36px', height: '36px', margin: '10px', cursor: 'pointer' }}
        onClick={() => {
          onSearch({ company, tag, job });
        }}
      />
    </Flex>
  </VerticalFlex>;
}