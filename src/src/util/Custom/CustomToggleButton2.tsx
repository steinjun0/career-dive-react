import { Button, styled } from "@mui/material";
import React from "react";
import { colorBackgroundGrayLight, colorCareerDivePink, colorTextLight } from "util/styledComponent";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const ToggleButton = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  background-color: ${colorBackgroundGrayLight};
  color: white;
  &:hover {
    background-color: ${colorBackgroundGrayLight};
    color: white;
  }
`;


const ToggleButtonClicked = styled(Button)`
  min-width: 40px;
  min-height: 40px;
  background-color: rgba(226, 93, 125, 0.2);;
  color: white;
  &:hover {
    background-color: rgba(226, 93, 125, 0.2);;
    color: white;
  }
`;


export default function CustomToggleButton2({ isOn, setIsOn }: { isOn: boolean, setIsOn: React.Dispatch<React.SetStateAction<boolean>> }) {
  if (isOn) {
    return (<ToggleButtonClicked disableElevation onClick={() => { setIsOn(false) }}>
      <BookmarkBorderIcon style={{ color: colorCareerDivePink }} />
    </ToggleButtonClicked>)
  }
  else {
    return (<ToggleButton disableElevation onClick={() => { setIsOn(true) }}>
      <BookmarkBorderIcon style={{ color: colorTextLight }} />
    </ToggleButton>)
  }
}