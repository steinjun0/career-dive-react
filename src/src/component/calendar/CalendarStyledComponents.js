import { styled } from "@mui/material";
import SimpleMenu from "util/SimpleMenu"

import {
  RowAlignCenterFlex,
  VerticalFlex,
  colorCareerDiveBlue,
  colorTextLight,
  Flex,
  colorTextDisabled,
  colorBackgroundGrayLight,
} from "util/styledComponent";

export const CalendarWrapper = styled(Flex)`
  width: 100%;
  // margin-top: 30px;
  transition: all 0.3s ease-out;
`

export const DateWrapper = styled(VerticalFlex)`
  border-bottom: 1px solid #CFD6E0;
  padding-bottom: 16px;
`;

export const WeekBox = styled(RowAlignCenterFlex)`
  justify-content: space-between;
  // width: 534px;
  height: 44px;
  width: 100%;
  margin-top: 16px;
`;

export const DateBox = styled(RowAlignCenterFlex)`
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius:12px;
  color: ${colorTextLight};
  cursor: pointer;
`;

export const DateBoxNoPointer = styled(RowAlignCenterFlex)`
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius:12px;
  color: ${colorTextLight};
`;

export const DisableDateBox = styled(RowAlignCenterFlex)`
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius:12px;
  color: ${colorTextDisabled};
`;

export const DayWrapper = styled(Flex)`
  justify-content: space-between;
  font-weight: 700;
  color: black;
  margin-top: 10px;
`;

export const DayBox = styled(DateBox)`
  color: black;
`;

export const AvailableDateBox = styled(DateBox)`
  background-color: ${colorBackgroundGrayLight};
  color: ${colorTextLight};
  cursor: pointer;
`;

export const SelectedDateBox = styled(DateBox)`
  background-color:${colorCareerDiveBlue};
  color: white;
  cursor: pointer;
`;

export const CalendarContentWrapper = styled(VerticalFlex)`
  justify-content: start;
  min-width: 400px;
`;


export const YearMonthMenuWrapper = styled(RowAlignCenterFlex)`
 justify-content: center;
 margin: 16px 0;
 height: 24px;
`

export const YearMonthMenu = styled(SimpleMenu)`
`;