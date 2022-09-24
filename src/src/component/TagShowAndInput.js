import { useState } from "react";
import { TagSmall } from "util/Custom/CustomTag";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import CustomTextField1 from "util/Custom/CustomTextField1";
import API from "API"
import { useEffect } from "react";

const { VerticalFlex, Flex, TextSubtitle1, colorBackgroundCareerDiveBlue, colorCareerDiveBlue, EmptyWidth, EmptyHeight } = require("util/styledComponent");

function TagShowAndInput({ tagList, setTagList, isEditing }) {
  const [tagText, setTagText] = useState('');

  const addNewTag = () => {
    setTagList([...tagList, tagText])
    setTagText('')
  }

  const deleteTag = (deletedTag) => {
    const newTagList = tagList.filter((e) => {
      if (e !== deletedTag) {
        return true
      } else {
        return false
      }
    })
    setTagList(newTagList)
  }

  useEffect(() => {
    setTagText('');
  }, [isEditing])


  return <VerticalFlex>
    <TextSubtitle1>태그</TextSubtitle1>
    <EmptyHeight height={'20px'} />
    <Flex style={{ flexWrap: 'wrap' }}>
      {tagList.map((e, i) => {
        return <Flex key={i} style={{ marginRight: '10px', marginBottom: '8px' }}>
          <TagSmall
            color={colorCareerDiveBlue}
            background_color={colorBackgroundCareerDiveBlue}>{e}
            <EmptyWidth width={'4px'} />
            <Flex
              style={{ cursor: 'pointer' }}
              onClick={() => {
                deleteTag(e)
              }}>
              <CloseOutlinedIcon fontSize="14px" />
            </Flex>

          </TagSmall>
        </Flex>
      })}
    </Flex>
    {isEditing && <Flex>
      <EmptyHeight height={'20px'} />
      <CustomTextField1
        onEnter={() => {
          if (tagText !== '') {
            addNewTag()
          }
        }}
        value={tagText}
        onChange={(e) => {
          setTagText(e.target.value)
        }}
        fullWidth={true}
        placeholder={'입력 후 Enter'}
      />
    </Flex>
    }
  </VerticalFlex>;
}

export default TagShowAndInput;