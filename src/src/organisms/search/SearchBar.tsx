import { Flex, VerticalFlex } from "util/styledComponent";
import React, { useState } from "react";
import SearchIcon from "assets/icon/search.svg";
import { styled } from "@mui/material";

const ColoredInput = styled('input')({
  '::placeholder': {
    color: '#BDBDBD'
  }
});

export default function SearchTags() {
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
        <span style={{ fontWeight: 'regular', lineHeight: '24px', fontSize: '14px', width: '122px' }}>UI/UX</span>
      </Flex>
      <Flex sx={{ padding: '16px 24px' }}>
        <span style={{ fontWeight: 'bold', lineHeight: '24px', fontSize: '14px', marginRight: '14px' }}>직무</span>
        <ColoredInput type="text" placeholder="회사를 입력하세요" style={{ width: '122px' }} />
      </Flex>
      <Flex sx={{ padding: '16px 24px' }}>
        <span style={{ fontWeight: 'bold', lineHeight: '24px', fontSize: '14px', marginRight: '14px' }}>직무</span>
        <ColoredInput type="text" placeholder="태그를 입력하세요" style={{ width: '122px' }} />
      </Flex>
      <img src={SearchIcon} alt="search" style={{ width: '36px', height: '36px', margin: '10px', cursor: 'pointer' }}
        onClick={() => { }}
      />
    </Flex>
  </VerticalFlex>;
}