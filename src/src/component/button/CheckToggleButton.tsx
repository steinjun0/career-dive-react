import { Checkbox, CheckboxProps } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { colorCareerDiveBlue, colorTextDisabled } from "util/styledComponent";
import React, { CSSProperties } from "react";


export function CheckToggleButton(propsInput: Omit<CheckboxProps, 'color'> & { color?: CSSProperties['color']; }) {
  const props = { ...propsInput } as CheckboxProps;
  delete props.color;
  return (
    <Checkbox
      {...props}
      disableRipple
      style={{ padding: 0 }}
      icon={<CheckCircleOutlineIcon fontSize={'small'} sx={{ color: colorTextDisabled }} />}
      checkedIcon={<CheckCircleOutlineIcon fontSize={'small'} sx={{ color: propsInput.color ?? colorCareerDiveBlue }} />}
    />
  );
}