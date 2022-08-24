import { Button, styled } from "@mui/material";
import RequestFormIcon from "assets/icon/RequestFormIcon";
import { useState } from "react";
import { colorBackgroundGrayLight, colorCareerDiveBlue, colorTextLight, Flex, SizedImg, TextSubtitle1 } from '../styledComponent';
const CustomIconButtonStyle = styled(Button)`
  display:flex;
  flex-direction: row;
  justify-content: start;
  transition: all 0.3s ease-out;
  background-color: ${props => props.default_color ? props.default_color : colorBackgroundGrayLight};
  color: ${props => props.custom_color ? props.custom_color : 'white'};
  &:hover {
    background-color: ${props => props.hover_color ? props.hover_color : colorBackgroundGrayLight};
    color: ${props => props.custom_color ? props.custom_color : 'white'};
    width: ${props => props.width};
  }
  min-width: 0;
  width: 40px;
  height: 40px;
  min-width: none;
  // overflow: clip;
  border-radius: 8px !important;
  white-space: nowrap;
  overflow-x: hidden;
`;

const IconText = styled(TextSubtitle1)`
  transition: all 0.3s ease-out;
  color: ${props => props.hover === 'true' ? props.hover_color : props.hover_color};
// &:hover {
//   color: ${props => props.textColor};
// }
`;

export function CustomIconButton({ Icon, text, width, default_color, default_text_color, hover_color, text_color, onClick }) {
  const [isHover, setIsHover] = useState(false)
  console.log('default_text_color', default_text_color)
  return (
    <CustomIconButtonStyle width={width} hover_color={hover_color} default_color={default_color}
      onClick={onClick}
      onMouseEnter={() => { setIsHover(true) }}
      onMouseLeave={() => { setIsHover(false) }}>
      {/* <SizedImg style={{ marginRight: '8px', color: text_color }} src={icon} width='24px' height='24px'></SizedImg> */}
      <Flex style={{ marginRight: '8px', minWidth: '24px', minHeight: '24px' }}>
        <Icon
          style={{ transition: 'all 0.3s ease-out', color: isHover ? text_color : default_text_color ? default_text_color : colorTextLight }}
          color={isHover ? text_color : default_text_color ? default_text_color : colorTextLight}></Icon>
      </Flex>
      <IconText color={default_text_color ? default_text_color : colorTextLight} style={{}} hover_color={text_color} hover={String(isHover)}>
        {text}
      </IconText>
    </CustomIconButtonStyle>
  );
}
