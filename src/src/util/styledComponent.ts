import { Link } from "react-router-dom";
import { styled } from "@mui/material";
import { CSSProperties } from "react";

// type


// color
export const colorCareerDiveBlue: CSSProperties["color"] = "#698CFF";
export const colorBackgroundCareerDiveBlue: CSSProperties["color"] = "#698CFF1a";
export const colorCareerDivePink: CSSProperties["color"] = "#E25D7D";
export const colorBackgroundCareerDivePink: CSSProperties["color"] = "#E25D7D1a";
export const colorBlueGray: CSSProperties["color"] = '#CFD6E0';
export const colorTextLight: CSSProperties["color"] = "#5F6368";
export const colorTextBody: CSSProperties["color"] = "#191919";
export const colorTextDisabled: CSSProperties["color"] = "#D9D9D9";
export const colorBackgroundGrayLight: CSSProperties["color"] = "#F8F8F8";
export const colorBackgroundGrayMedium: CSSProperties["color"] = "#E6E6E6";
export const colorBackgroundGrayDark: CSSProperties["color"] = "#7C7C7C";
export const colorSuccess: CSSProperties["color"] = "#B4CE16";


// text
export const TextHeading1 = styled(`h1`) <{ color?: CSSProperties["color"]; }>`
  font-size: 48px;
  font-weight: 700;
  line-height: 64px;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextHeading2 = styled(`h2`) <{ color?: CSSProperties["color"]; }>`
  font-size: 36px;
  font-weight: 700;
  line-height: 48px;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextHeading3 = styled(`h3`) <{ color?: CSSProperties["color"]; }>`
  font-size: 32px;
  font-weight: 700;
  line-height: 44px;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextHeading4 = styled(`h4`) <{ color?: CSSProperties["color"]; }>`
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextHeading5 = styled(`h5`) <{ color?: CSSProperties["color"]; }>`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextHeading6 = styled(`h6`) <{ color?: CSSProperties["color"]; }>`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextBody1 = styled(`span`) <{ color?: CSSProperties["color"]; }>`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextBody2 = styled(`p`) <{ line_height?: CSSProperties["height"], color?: CSSProperties["color"]; }>`
  font-size: 14px;
  line-height: ${props => props.line_height ? props.line_height : '24px'};
  font-weight: 400;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextSubtitle1 = styled(`span`) <{ color?: CSSProperties["color"]; }>`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextSubtitle2 = styled(`span`) <{ color?: CSSProperties["color"]; }>`
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;


export const TextButton = styled(`span`) <{ color?: CSSProperties["color"]; }>`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextCaption = styled(`span`) <{ color?: CSSProperties["color"]; }>`
  font-size: 12px;
  color: ${props => props.color ? props.color : colorTextBody};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;


interface IPaddingSet {
  padding?: CSSProperties["padding"],
  paddingTop?: CSSProperties["paddingTop"],
  paddingBottom?: CSSProperties["paddingBottom"],
  paddingLeft?: CSSProperties["paddingLeft"],
  paddingRight?: CSSProperties["paddingRight"],
}

interface IMarginSet {
  margin?: CSSProperties["margin"],
  marginTop?: CSSProperties["marginTop"],
  marginBottom?: CSSProperties["marginBottom"],
  marginLeft?: CSSProperties["marginLeft"],
  marginRight?: CSSProperties["marginRight"],
}

const getMarginSet = (props: IMarginSet) => ({
  margin: props.margin,
  marginTop: props.marginTop,
  marginBottom: props.marginBottom,
  marginLeft: props.marginLeft,
  marginRight: props.marginRight,
});

const getPaddingSet = (props: IPaddingSet) => ({
  padding: props.padding,
  paddingTop: props.paddingTop,
  paddingBottom: props.paddingBottom,
  paddingLeft: props.paddingLeft,
  paddingRight: props.paddingRight,
});

// container
export const Flex = styled("div")((props: { gap?: CSSProperties["gap"]; } & IMarginSet & IPaddingSet) => ({
  display: 'flex',
  gap: props.gap,
  ...getMarginSet(props),
  ...getPaddingSet(props)
}));

export const VerticalFlex = styled(Flex)(() => ({
  flexDirection: 'column',
}));

export const ColumnAlignCenterFlex = styled(Flex)`
  flex-direction: column;
  align-items: center;
`;


export const RowAlignCenterFlex = styled(Flex)`
  flex-direction: row;
  align-items: center;
`;

export const CenterFlex = styled(Flex)({
  justifyContent: 'center',
  alignItems: 'center'
});

export const FullWidthWrapper = styled(VerticalFlex)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const FullHeightFullWidthWrapper = styled(FullWidthWrapper)`
  min-height: calc(100vh - 80px - 214px); // 100vh - header - footer
  justify-content: center;
`;

export const CenterWidthWrapper = styled(Flex)`
  flex-direction: column;
  align-items: center;
  max-width: 1194px;
  width: 100%;
`;

export const CircleImg = styled("img")`
  border-radius: 50%;
`;

export const SizedImg = styled("img")`
  width: ${props => props.width};
  height: ${props => props.height};
`;


export const GrayBackground = styled(Flex)`
  background-color: #f8f8f8;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 500px);
`;

export const MaxWidthDiv = styled(Flex)({
  flexDirection: 'column',
  maxWidth: '1254px',
  width: '100%',
  padding: '0 30px',
  boxSizing: 'border-box',
  '@media (max-width:899.95px)': { //md
    padding: '0 16px'
  }
});

export const EmptyHeight = styled(Flex) <{ height: CSSProperties["height"]; }>`
  min-height: ${props => props.height};
`;

export const EmptyWidth = styled(Flex) <{ width: CSSProperties["width"]; }>`
  min-width: ${props => props.width};
`;

export const WidthFixerWrapper = styled(Flex) <{ width: CSSProperties["width"], height: CSSProperties["height"]; }>`
  min-width: ${props => props.width};
  min-height: ${props => props.height};
  
  max-width: ${props => props.width};
  max-height: ${props => props.height};
`;

export const TextEllipsisContainer = styled(Flex)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;


// components
export const LinkNoDeco = styled(Link)`
  text-decoration: none;
  color: black;
  height: 100%;
  display:flex;
  align-items: center;
`;

export const UlNoDeco = styled('ul')`
  list-style: none;
  padding: 0;
`;



