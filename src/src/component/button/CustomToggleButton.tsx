import { ToggleButton, ToggleButtonProps } from "@mui/material";
import React, { CSSProperties } from "react";
import { colorBackgroundGrayLight } from "util/styledComponent";

export default function CustomTogglebutton(props: ToggleButtonProps & { selected_color?: CSSProperties['color'], selected_background_color?: CSSProperties['backgroundColor']; }) {
    return <ToggleButton
        {...props}
        sx={{
            borderRadius: '8px', backgroundColor: colorBackgroundGrayLight, border: 'none',
            '&.Mui-selected': {
                backgroundColor: props.selected_background_color,
                color: props.selected_color
            },
            '&:hover': {
                backgroundColor: `${props.selected_background_color} !important`,
            },
            ...props.sx
        }}
    >
        {props.children}
    </ToggleButton>;
}