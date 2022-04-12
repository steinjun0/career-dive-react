import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { colorCareerDiveBlue } from './styledComponent';

export const CustomToggleButton = styled(Switch)(({ theme }) => ({
  width: 36,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 24,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(8px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : colorCareerDiveBlue,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    // boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    boxShadow: 'none',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 13.5,
    width: 36,
    height: 20,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : '#c4c4c4',
    boxSizing: 'border-box',
  },
}));

export const onChangeToggle = (event, state, setState) => {
  setState(!state)
}
