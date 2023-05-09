import { TextField, styled, TextFieldProps } from "@mui/material";
import { colorBackgroundGrayLight } from "util/styledComponent";
import { CSSProperties } from "react";
import React from "react";
export default function BasicTextField(
  {
    height = '48px',
    ...rest
  }:
    {
      height?: CSSProperties['height'],
    } & TextFieldProps
) {
  return <TextField
    {...rest}
    variant="filled"
    fullWidth={true}
    size="small"
    sx={{
      borderRadius: '8px',
      width: '100% !important',
      margin: '0 !important',
      '.MuiFilledInput-root': {
        backgroundColor: colorBackgroundGrayLight,
        fontSize: '14px',
        borderRadius: '8px',
        height: height,
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
      ...rest.sx
    }}
  />;
}

