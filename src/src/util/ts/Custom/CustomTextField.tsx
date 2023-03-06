import { TextField, styled, TextFieldProps } from "@mui/material";
import { colorBackgroundGrayLight } from "util/styledComponent";
import { ChangeEventHandler, CSSProperties } from "react";
import React from "react";

const CustomTextFieldStyle = styled(TextField)((props: { height?: CSSProperties['height'] }) => ({
  borderRadius: '8px',
  width: '100% !important',
  margin: '0 !important',
  '.MuiFilledInput-root': {
    backgroundColor: colorBackgroundGrayLight,
    fontSize: '14px',
    borderRadius: '8px',
    height: props.height ?? '28px',
    ':before': {
      borderBottom: '0 !important'
    },
    ':after': {
      borderBottom: '0 !important'
    },
  },
  '.MuiFilledInput-input': {
    padding: '10px 20px',
    borderRadius: '8px',
  },
}));

export default function CustomTextField(
  {
    height,
    ...rest
  }:
    {
      height?: CSSProperties['height'],
    } & TextFieldProps
) {
  return <CustomTextFieldStyle
    variant="filled"
    fullWidth={true}
    size="small"
    height={height}
    {...rest}
  />
}

