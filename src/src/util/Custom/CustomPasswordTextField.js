import { Visibility, VisibilityOff } from "@material-ui/icons";
import { TextField, styled, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { colorCareerDiveBlue } from "util/styledComponent";
import { CustomTextField } from "./CustomTextField";


export function CustomPasswordTextField({ setPassword }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomTextField
      height={'26px'}
      onChange={(event) => { setPassword(event.target.value) }}
      variant="filled"
      InputProps={{
        disableUnderline: true,
        type: showPassword ? 'text' : 'password',
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => { setShowPassword(!showPassword) }}
            >
              {showPassword ? <VisibilityOff style={{ color: colorCareerDiveBlue }} /> : <Visibility style={{ color: colorCareerDiveBlue }} />}
            </IconButton>
          </InputAdornment>
        )
      }}
      fullWidth={true}
      margin="dense" size="small" hiddenLabel placeholder="비밀번호"
    />
  );
}