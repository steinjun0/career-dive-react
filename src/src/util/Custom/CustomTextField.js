import { TextField, styled } from "@mui/material";
import { colorBackgroundGrayLight } from "util/styledComponent";

export const CustomTextField = styled(TextField)`
  background-color: ${colorBackgroundGrayLight} ;
  border-radius: 8px;
  line-height: 200%;
  font-size: 14px;
  margin: 0;
  .MuiFilledInput-root{
    border-radius: 8px;
    background-color: ${colorBackgroundGrayLight}!important;
  }
  .MuiFilledInput-input{
    height: ${props => props.height ? props.height : '32px'};
    padding: 10px 20px;
    border-radius: 8px;
    background-color: ${colorBackgroundGrayLight};
  }
`;
