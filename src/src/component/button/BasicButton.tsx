import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { colorBackgroundGrayMedium, colorCareerDiveBlue, colorCareerDivePink } from "util/styledComponent";

function BasicButton(props: { type: 'pink' | 'blue' | 'gray' | 'disabled'; } & Omit<ButtonProps, 'type'>) {
  let buttonProps = {
    ...props,
    type: undefined,
    color: undefined
  } as ButtonProps;
  const color = (() => {
    if (props.type === 'pink') {
      return colorCareerDivePink;
    } else if (props.type === 'gray') {
      return colorBackgroundGrayMedium;
    }
    else {
      return colorCareerDiveBlue;
    }
  })();
  return <Button
    {...buttonProps}
    variant="contained"
    disableElevation
    disabled={props.type === 'disabled' || props.disabled}
    sx={{
      ...props.sx,
      padding: '8px',
      borderRadius: '8px',
      backgroundColor: color,
      '&:hover': {
        backgroundColor: color
      }
    }}
  >
    {props.children}
  </Button>;
}

const memoizedBasicButton = React.memo(BasicButton, (prev, current) => {
  return (
    prev.type === current.type &&
    prev.disabled === current.disabled
  );
});
export default memoizedBasicButton;