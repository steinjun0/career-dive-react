import { Button, styled } from "@mui/material";
import { colorCareerDiveBlue } from './styledComponent';

export const CustomButton = styled(Button)`
  background-color: ${props => props.background_color ? props.background_color : colorCareerDiveBlue};
  color: ${props => props.custom_color ? props.custom_color : 'white'};
  &:hover {
    background-color: ${props => props.background_color ? props.background_color : colorCareerDiveBlue};
    color: ${props => props.custom_color ? props.custom_color : 'white'};
  }
  height: ${props => props.height ? props.height : ''};

  font-size: 16px;
  line-height: 24px;
`;
