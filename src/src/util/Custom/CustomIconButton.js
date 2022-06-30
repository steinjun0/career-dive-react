import { Button, styled } from "@mui/material";
import RequestFormIcon from "assets/icon/RequestFormIcon";
import { useState } from "react";
import { colorBackgroundGrayLight, colorCareerDiveBlue, colorTextLight, Flex, SizedImg, TextSubtitle1 } from '../styledComponent';
const CustomIconButtonStyle = styled(Button)`
  display:flex;
  flex-direction: row;
  justify-content: start;
  transition: all 0.3s ease-out;
  background-color: ${colorBackgroundGrayLight};
  color: ${props => props.custom_color ? props.custom_color : 'white'};
  &:hover {
    background-color: ${props => props.background_color ? props.background_color : colorBackgroundGrayLight};
    color: ${props => props.custom_color ? props.custom_color : 'white'};
    width: ${props => props.width};
  }
  min-width: 0;
  width: 40px;
  min-width: none;
  // overflow: clip;
  border-radius: 8px !important;
  white-space: nowrap;
  overflow-x: hidden;
`;

const IconText = styled(TextSubtitle1)`
  transition: all 0.3s ease-out;
  color: ${props => props.hover === 'true' ? props.hover_color : colorTextLight};
// &:hover {
//   color: ${props => props.textColor};
// }
`;

export function CustomIconButton({ Icon, text, width, background_color, text_color }) {
  const [isHover, setIsHover] = useState(false)
  return (
    <CustomIconButtonStyle width={width} background_color={background_color}
      onMouseEnter={() => { setIsHover(true) }}
      onMouseLeave={() => { setIsHover(false) }}>
      {/* <SizedImg style={{ marginRight: '8px', color: text_color }} src={icon} width='24px' height='24px'></SizedImg> */}
      <Flex style={{ marginRight: '8px', minWidth: '24px', minHeight: '24px' }}>
        <Icon color={isHover ? text_color : colorTextLight}></Icon>
      </Flex>
      <IconText color={colorTextLight} style={{}} hover_color={text_color} hover={String(isHover)}>
        {text}
      </IconText>
    </CustomIconButtonStyle>
  );
}
