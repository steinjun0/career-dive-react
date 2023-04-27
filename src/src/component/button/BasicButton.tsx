import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { colorCareerDiveBlue, colorCareerDivePink } from "util/styledComponent";

interface ICustomButtonProps extends Omit<ButtonProps, 'type'> {
  type: 'pink' | 'blue' | 'disabled';
}

export default function BasicButton(props: ICustomButtonProps) {

  return <Button
    variant="contained"
    disableElevation
    disabled={props.type === 'disabled'}
    sx={{
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: props.type === 'pink' ? colorCareerDivePink : colorCareerDiveBlue,
      '&:hover': {
        backgroundColor: props.type === 'pink' ? colorCareerDivePink : colorCareerDiveBlue
      }
    }}
  >
    {props.children}
  </Button>;
}