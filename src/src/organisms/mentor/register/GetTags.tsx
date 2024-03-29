import { useState } from "react";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import React from "react";
import Tag from "component/Tag";
import { VerticalFlex, Flex, EmptyWidth, TextCaption, TextSubtitle2, colorTextTitle, colorCareerDivePink, colorBackgroundCareerDivePink } from "util/styledComponent";
import BasicTextField from "component/input/BasicTextField";


export default function GetTags({ tags, onEnter, onDelete }: { tags: string[], onEnter: (tag: string) => void, onDelete: (tag: string) => void; }) {
  const [tag, setTag] = useState<string>('');

  function deleteTag(deletedTag: string) {
    onDelete(deletedTag);
  };


  return <VerticalFlex sx={{ width: '100%', gap: '16px' }}>
    <VerticalFlex sx={{ gap: '4px' }}>
      <TextSubtitle2>태그</TextSubtitle2>
      <TextCaption sx={{ color: colorTextTitle }}>
        최대 10개까지 입력이 가능합니다
      </TextCaption>
    </VerticalFlex>
    <Flex sx={{ gap: '16px', justifyContent: 'space-between' }}>
      <BasicTextField
        placeholder='입력 후 Enter'
        value={tag}
        onChange={(e) => {
          setTag(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onEnter(tag);
            setTag('');
          }
        }}
      />
    </Flex>
    <Flex style={{ flexWrap: 'wrap' }}>
      {tags.map((e, i) => {
        return <Flex key={i} style={{ marginRight: '10px', marginBottom: '8px' }}>
          <Tag
            size="medium"
            color={colorCareerDivePink}
            backgroundColor={colorBackgroundCareerDivePink}>{e}
            <EmptyWidth width={'4px'} />
            <Flex
              style={{ cursor: 'pointer' }}
              onClick={() => {
                deleteTag(e);
              }}>
              <CloseOutlinedIcon sx={{ fontSize: '14px' }} />
            </Flex>
          </Tag>
        </Flex>;
      })}
    </Flex>
  </VerticalFlex>;
}
