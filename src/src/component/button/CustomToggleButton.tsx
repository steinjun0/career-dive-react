import { ToggleButton, ToggleButtonProps } from "@mui/material";
import React, { ReactPropTypes } from "react";
import { colorBackgroundGrayLight, colorBackgroundCareerDivePink, colorCareerDivePink } from "util/styledComponent";

export default function CustomTogglebutton(props: ToggleButtonProps) {
    return <ToggleButton
        {...props}
        sx={{
            borderRadius: '8px', backgroundColor: colorBackgroundGrayLight, border: 'none',
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