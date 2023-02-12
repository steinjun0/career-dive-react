import { Button, styled } from "@mui/material";
import { colorBackgroundGrayLight, colorCareerDiveBlue, colorTextDisabled, cssLength } from '../styledComponent';
import { CSSProperties } from 'react'
export const CustomButton = styled(Button) <{ padding?: CSSProperties["padding"], background_color?: CSSProperties["color"], custom_color?: CSSProperties["color"], height?: CSSProperties["height"], width?: CSSProperties["width"] }>`
  padding: ${props => props.padding ? props.padding : '4px 12px'};
  background-color: ${props => props.background_color ? props.background_color : colorCareerDiveBlue};
  color: ${props => props.custom_color ? props.custom_color : 'white'};
  &:hover {
    background-color: ${props => props.background_color ? props.background_color : colorCareerDiveBlue};
    color: ${props => props.custom_color ? props.custom_color : 'white'};
  }
  :disabled{
    background-color: ${colorBackgroundGrayLight};
    color: ${colorTextDisabled};
  }
  min-height: ${props => props.height ? props.height : '0px'};
  min-width: ${props => props.width ? props.width : '0px'};
  height: ${props => props.height ? props.height : ''};
  width: ${props => props.width ? props.width : ''};
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px !important;
`;
