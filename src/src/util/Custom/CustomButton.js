import { Button, styled } from "@mui/material";
import { colorCareerDiveBlue } from '../styledComponent';

export const CustomButton = styled(Button)`
  background-color: ${props => props.background_color ? props.background_color : colorCareerDiveBlue};
  color: ${props => props.custom_color ? props.custom_color : 'white'};
  &:hover {
    background-color: ${props => props.background_color ? props.background_color : colorCareerDiveBlue};
    color: ${props => props.custom_color ? props.custom_color : 'white'};
  }
  min-height: ${props => props.height ? props.height : '48px'};
  min-width: ${props => props.width ? props.width : ''};
  height: ${props => props.height ? props.height : '48px'};
  width: ${props => props.width ? props.width : ''};
  font-size: 16px;
  line-height: 24px;
  border-radius: 8px !important;
`;
