import { TextField, styled } from "@mui/material";
import { colorBackgroundGrayLight } from "util/styledComponent";

export const CustomTextField = styled(TextField)`
  background-color: ${colorBackgroundGrayLight} ;
  .MuiFilledInput-root{
    border-radius: 8px;
    background-color: ${colorBackgroundGrayLight}!important;
  }
  .MuiFilledInput-input{
    height: ${props => props.height ? props.height : '32px'};
    padding: 8px 20px 10px 20px;
    padding-top:8px;
    border-radius: 8px;
    background-color: ${colorBackgroundGrayLight};
  }
`;
