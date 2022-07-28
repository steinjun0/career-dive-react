import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import { InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { colorCareerDiveBlue, colorTextDisabled } from "util/styledComponent";
import { CustomTextField } from "./CustomTextField";


export function CustomPasswordTextField({ setPassword, onKeyPress, style }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomTextField
      style={style}
      onChange={(event) => { setPassword(event.target.value) }}
      onKeyPress={onKeyPress}
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
              {showPassword ? <VisibilityOutlined fontSize="small" style={{ color: colorCareerDiveBlue }} /> : <VisibilityOffOutlined fontSize="small" style={{ color: colorTextDisabled }} />}
            </IconButton>
          </InputAdornment>
        )
      }}
      fullWidth={true}
      margin="dense" size="small" hiddenLabel placeholder="비밀번호"
    />
  );
}