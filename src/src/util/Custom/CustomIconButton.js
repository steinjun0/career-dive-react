import { Button, styled } from "@mui/material";
import { useState } from "react";
import { colorBackgroundGrayLight, colorCareerDiveBlue, colorTextLight, SizedImg, TextSubtitle1 } from '../styledComponent';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
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
color: ${props => props.hover === 'true' ? colorTextLight : props.hoverColor};
  // &:hover {
  //   color: ${props => props.textColor};
  // }
`;

export function CustomIconButton({ icon, text, width, background_color, text_color }) {
  const [isHover, setIsHover] = useState(false)
  return (
    <CustomIconButtonStyle width={width} background_color={background_color}
      onMouseEnter={() => { setIsHover(true) }}
      onMouseLeave={() => { setIsHover(false) }}>
      <SizedImg style={{ marginRight: '8px', color: text_color }} src={icon} width='24px' height='24px'></SizedImg>
      <IconText color={colorTextLight} style={{}} hoverColor={text_color} hover={isHover}>
        {text}
      </IconText>
    </CustomIconButtonStyle>
  );
}
