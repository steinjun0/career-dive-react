import { ToggleButton, ToggleButtonProps } from "@mui/material";
import React, { CSSProperties } from "react";
import { colorBackgroundGrayLight } from "util/styledComponent";

export default function CustomTogglebutton(propsInput:
    Omit<ToggleButtonProps, 'value'>
    & {
        value?: ToggleButtonProps['value'],
        selectedColor?: CSSProperties['color'],
        selectedBackgroundColor?: CSSProperties['backgroundColor'];
    }) {
    const { selectedColor, selectedBackgroundColor, ...props } = { ...propsInput };
    return <ToggleButton
        {...props}
        value={props.value ?? 0}
        sx={{
            borderRadius: '8px', backgroundColor: colorBackgroundGrayLight, border: 'none',
            wordBreak: 'keep-all',
            '&.Mui-selected': {
                backgroundColor: selectedBackgroundColor,
                color: selectedColor,
                border: `1px solid ${selectedColor}`

            },
            '&:hover': {
                backgroundColor: `${selectedBackgroundColor} !important`,
            },
            ...props.sx,
        }}
    >
        {props.children}
    </ToggleButton>;
}