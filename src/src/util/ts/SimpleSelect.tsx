import { FormControl, InputLabel, Select, SelectChangeEvent, styled } from "@mui/material";

import MenuItem from '@mui/material/MenuItem';
import { Flex } from "util/styledComponent";
import React from "react";


function SimpleSelect<T>(
    { items = [], texts = [], label = '', onChange }: { items: T[], texts: string[], label?: string, onChange: Function }
) {
    const [value, setValue] = React.useState<T>(items[0]);

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as T)
        setValue(event.target.value as T);
    };
    return (<Flex style={{ width: '100%' }}>
        <FormControl fullWidth>
            <InputLabel id="simple-select-label">{label}</InputLabel>
            <Select
                sx={{ '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
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