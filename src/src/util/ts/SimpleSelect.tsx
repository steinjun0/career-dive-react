import { FormControl, InputLabel, Select, SelectChangeEvent, styled, SxProps } from "@mui/material";

import MenuItem from '@mui/material/MenuItem';
import { Flex } from "util/styledComponent";
import React from "react";
import { CSSProperties } from "@mui/styled-engine";


function SimpleSelect<T>(
    { items = [], texts = [], label = '', onChange, initialValue, sx }: { items: T[], texts: string[], label?: string, onChange: Function, initialValue?: T, sx?: SxProps }
) {
    const [value, setValue] = React.useState<T>(initialValue ?? items[0]);

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as T)
        setValue(event.target.value as T);
    };
    return (<Flex style={{ width: '100%' }}>
        <FormControl fullWidth>
            <InputLabel id="simple-select-label">{label}</InputLabel>
            <Select
                sx={{
                    '.MuiOutlinedInput-notchedOutline': { border: 0 },
                    "&>fieldset": { border: '0 !important' },
                    ...sx
                }}
                labelId="simple-select-label"
                id="simple-select"
                value={`${value}`}
                label={label}
                onChange={handleChange}
            >
                {items.map((item, i) => <MenuItem key={i} value={`${item}`}>{texts[i]}</MenuItem>)}
            </Select>
        </FormControl>
    </Flex>);
}
export default SimpleSelect;