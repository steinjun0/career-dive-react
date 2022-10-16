import { Checkbox } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { colorCareerDiveBlue, colorTextDisabled, Flex } from "util/styledComponent";


export function CustomCheckbox({ isChecked, setIsChecked, onClick, children }) {
  return (
    <Flex onClick={() => {
      onClick && onClick()
      setIsChecked && setIsChecked(!isChecked)
    }}
      style={{
        cursor: 'pointer'
      }}>
      <Checkbox
        disableRipple
        checked={isChecked}
        onChange={() => { }}
        style={{ padding: 0 }}
        icon={<CheckCircleOutlineIcon fontSize={'small'} style={{ color: colorTextDisabled }} />}
        checkedIcon={<CheckCircleOutlineIcon fontSize={'small'} style={{ color: colorCareerDiveBlue }} />}
      />
      {children}
    </Flex>

  );
}