import { TextField, styled } from "@mui/material";
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
  { onChange,
    placeholder,
    error = false,
    helperText,
    height,
    type = 'text'
  }:
    {
      onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>,
      placeholder?: string,
      error?: boolean,
      helperText?: string,
      height?: CSSProperties['height'],
      type?: string
    }
) {
  return <CustomTextFieldStyle
    onChange={onChange}
    variant="filled"
    fullWidth={true}
    size="small"
    height={height}
    placeholder={placeholder}
    error={error}
    helperText={helperText}
    type={type}
  />
}

