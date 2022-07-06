import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { colorBackgroundGrayLight, colorCareerDiveBlue, colorTextLight } from '../styledComponent';


const TimeButton = styled(ToggleButton)`
 justify-content: center;
 width: 76px;
 min-width: 76px;
 margin-top: 16px;
 margin-right: 16px;
 height: 44px;
 background-color: ${colorBackgroundGrayLight};
 color: ${colorTextLight};
 border: solid 1px ${colorBackgroundGrayLight};
 border-radius: 8px !important;

 &.Mui-selected {
  color: ${colorCareerDiveBlue};
  border: 1px ${colorCareerDiveBlue} solid !important;
  background-color: rgba(105, 140, 255, 0.2);
 }
 &.Mui-selected:hover {
  color: ${colorCareerDiveBlue};
  border: 1px ${colorCareerDiveBlue} solid !important;
  background-color: rgba(105, 140, 255, 0.3);
 }
`

const TimeButtonWrapper = styled(ToggleButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
`

export function CustomToggleButtonGroup({ value, valueArray, onChange }) {
  return (
    <TimeButtonWrapper
      value={value}
      exclusive
      onChange={onChange}
      aria-label="text alignment"
    >
      {
        valueArray.map((value, index) => {
          return <TimeButton value={value} aria-label={`${value}`} key={index}>
            {value}
          </TimeButton>
        })
      }
    </TimeButtonWrapper>
  )
}

