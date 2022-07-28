import { Checkbox } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { colorCareerDiveBlue, colorTextDisabled } from "util/styledComponent";


export function CustomCheckbox({ isChecked, setIsChecked, onClick }) {

  return (
    <Checkbox
      disableRipple
      onClick={onClick}
      checked={isChecked}
      onChange={() => { setIsChecked(!isChecked) }}
      style={{ padding: 0 }}
      icon={<CheckCircleOutlineIcon fontSize={'small'} style={{ color: colorTextDisabled }} />}
      checkedIcon={<CheckCircleOutlineIcon fontSize={'small'} style={{ color: colorCareerDiveBlue }} />}
    />
  );
}