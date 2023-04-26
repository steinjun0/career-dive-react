import { FormControl, InputLabel, MenuItem, Select, SelectProps } from "@mui/material";
import React, { useState } from "react";
import { Flex, TextBody1, colorBackgroundGrayLight } from "util/styledComponent";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function RoundedGraySelect({ label = '', texts = [], handleChange, sx }: { label?: string, texts: string[], handleChange: SelectProps['onChange'], sx?: SelectProps['sx']; }) {
  const [value, setValue] = useState<string>('');
  return <FormControl>
    <Select
      sx={{
        '.MuiOutlinedInput-notchedOutline': { border: 0 },
        "&>fieldset": { border: '0 !important' },
        "&>.MuiInputBase-input": { padding: '10px 50px 10px 20px !important' },
        "&>.MuiSelect-icon": { marginRight: '4px' },
        borderRadius: '8px',
        backgroundColor: colorBackgroundGrayLight,
        ...sx
      }}
      value={value}
      displayEmpty
      renderValue={(value) => {
        if (value) {
          return <TextBody1>{value}</TextBody1>;
        }
        return <TextBody1 sx={{ color: '#898989' }}>{label}</TextBody1>;
      }}
      onChange={(event, child) => {
        handleChange && handleChange!(event, child);
        setValue(event.target.value as string);
      }}
      IconComponent={KeyboardArrowDownIcon}
    >
      {texts.map((text, i) => <MenuItem key={i} value={`${text}`}>{text}</MenuItem>)}
    </Select>
  </FormControl>;
}
