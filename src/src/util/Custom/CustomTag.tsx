import { styled } from "@mui/material";
import { colorBackgroundGrayLight, colorTextLight, CssColor, RowAlignCenterFlex } from '../styledComponent';

export const TagSmall = styled(RowAlignCenterFlex) <{ background_color?: CssColor }>`
  background-color: ${props => props.background_color ? props.background_color : colorBackgroundGrayLight};
  color: ${props => props.color ? props.color : colorTextLight};
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
  height: 20px;
`;

export const TagMedium = styled(RowAlignCenterFlex) <{ background_color?: CssColor }>`
  background-color: ${props => props.background_color ? props.background_color : colorBackgroundGrayLight};
  color: ${props => props.color ? props.color : colorTextLight};
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 12px;
  height: 28px;
`;

export const TagLarge = styled(RowAlignCenterFlex) <{ background_color?: CssColor }>`
  background-color: ${props => props.background_color ? props.background_color : colorBackgroundGrayLight};
  color: ${props => props.color ? props.color : colorTextLight};
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  height: 32px;
  box-sizing: border-box;
`;
