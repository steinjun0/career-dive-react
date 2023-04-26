import { ToggleButton, ToggleButtonProps } from "@mui/material";
import React, { CSSProperties } from "react";
import { colorBackgroundGrayLight } from "util/styledComponent";

export default function CustomTogglebutton(props: ToggleButtonProps & { selectedColor?: CSSProperties['color'], selectedBackgroundColor?: CSSProperties['backgroundColor']; }) {
    return <ToggleButton
        {...props}
        sx={{
            borderRadius: '8px', backgroundColor: colorBackgroundGrayLight, border: 'none',
            '&.Mui-selected': {
                backgroundColor: props.selectedBackgroundColor,
                color: props.selectedColor
            },
            '&:hover': {
                backgroundColor: `${props.selectedBackgroundColor} !important`,
            },
            ...props.sx
        }}
    >
        {props.children}
    </ToggleButton>;
}