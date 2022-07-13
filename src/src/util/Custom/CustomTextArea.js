import { styled, TextareaAutosize } from "@mui/material";
import { colorBackgroundGrayLight } from "util/styledComponent";

export const CustomTextArea = styled(TextareaAutosize)`
  background-color: ${colorBackgroundGrayLight};
  border-radius: 8px;
  border: none;
  padding: 20px;
  line-height: 28px;
  font-size: 14px;
`;
