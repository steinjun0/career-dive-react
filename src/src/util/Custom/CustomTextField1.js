import { Flex } from "util/styledComponent";
import { CustomTextField } from "./CustomTextField";

function CustomTextField1({ style, onChange, onEnter, placeholder, fullWidth, value }) {
  return <CustomTextField
    onKeyPress={(e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        onEnter();
      }
    }}
    style={style}
    value={value}
    onChange={onChange}
    variant="filled"
    InputProps={{ disableUnderline: true, }}
    fullWidth={fullWidth}
    margin="dense"
    size="small"
    hiddenLabel
    placeholder={placeholder}
  />;
}

export default CustomTextField1;