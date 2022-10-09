import { styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { colorBackgroundCareerDiveBlue, colorBackgroundGrayLight, colorCareerDiveBlue, colorTextLight, TextBody2 } from '../styledComponent';


const CustomToggleButton = styled(ToggleButton)`
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
 white-space: nowrap;
 padding: 10px 20px;
 width: auto;

 &.Mui-selected {
  color: ${props => props.selected_color || colorCareerDiveBlue};
  border: 1px ${props => props.selected_color || colorCareerDiveBlue} solid !important;
  background-color: ${props => props.background_color || colorBackgroundCareerDiveBlue}; 
 }
 &.Mui-selected:hover {
  color: ${props => props.selected_color || colorCareerDiveBlue};
  border: 1px ${props => props.selected_color || colorCareerDiveBlue} solid !important;
  background-color: ${props => props.background_color || colorBackgroundCareerDiveBlue}; 
 }
`

const CustomToggleButtonWrapper = styled(ToggleButtonGroup)`
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
  padding-left:1px;
`

export function CustomToggleButtonGroup({ value, valueArray, onChange, isExclusive, selectedColor, backgroundColor }) {
  return (
    <CustomToggleButtonWrapper
      value={value}
      exclusive={isExclusive}
      onChange={onChange}
      aria-label="text alignment"
    >
      {
        valueArray && valueArray.map((value, index) => {
          return <CustomToggleButton
            selected_color={selectedColor}
            background_color={backgroundColor}
            value={value}
            aria-label={`${value}`}
            key={index}>
            <TextBody2>{value}</TextBody2>
          </CustomToggleButton>
        })
      }
    </CustomToggleButtonWrapper>
  )
}

