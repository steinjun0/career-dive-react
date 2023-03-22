import { ToggleButton, ToggleButtonProps } from "@mui/material";
import React, { ReactPropTypes } from "react";
import { colorBackgroundGrayLight, colorBackgroundCareerDivePink, colorCareerDivePink } from "util/styledComponent";

export default function CustomTogglebutton(props: ToggleButtonProps) {
    return <ToggleButton
        {...props}
        value="check"
        sx={{
            borderRadius: '8px', backgroundColor: colorBackgroundGrayLight, border: 'none',
            width: '40px',
            '&.Mui-selected': {
                backgroundColor: colorBackgroundCareerDivePink,
                color: colorCareerDivePink
            },
            '&:hover': {
                backgroundColor: `${colorBackgroundCareerDivePink} !important`,
            }
        }}
    >
        {props.children}
    </ToggleButton>;
}