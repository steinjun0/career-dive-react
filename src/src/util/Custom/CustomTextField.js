import { TextField, styled } from "@mui/material";
import { colorBackgroundGrayLight } from "util/styledComponent";

export const CustomTextField = styled(TextField)`
  .MuiFilledInput-root{
    border-radius: 8px;
    background-color: ${colorBackgroundGrayLight};
  }
  .MuiFilledInput-input{
    height: ${props => props.height ? props.height : '32px'};
    padding: 8px 20px 10px 20px;
    padding-top:8px;
    border-radius: 8px;
    background-color: ${colorBackgroundGrayLight};
  }
`;