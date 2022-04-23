import { Checkbox } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


export function CustomCheckbox({ isChecked, setIsChecked }) {

  return (
    <Checkbox
      disableRipple
      checked={isChecked}
      onChange={() => { setIsChecked(!isChecked) }}
      style={{ paddingLeft: 0 }}
      icon={<CheckCircleOutlineIcon fontSize={'small'} style={{ color: '#BDBDBD' }} />}
      checkedIcon={<CheckCircleIcon fontSize={'small'} />}
    />
  );
}