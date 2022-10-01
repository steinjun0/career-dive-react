import { Link } from "react-router-dom";
import { styled } from "@mui/material";

// color
export const colorCareerDiveBlue = "#698CFF";
export const colorBackgroundCareerDiveBlue = "#698CFF1a";
export const colorCareerDivePink = "#E25D7D";
export const colorBackgroundCareerDivePink = "#E25D7D1a";
export const colorBlueGray = '#CFD6E0';
export const colorTextLight = "#5F6368";
export const colorTextBody = "#191919";
export const colorTextDisabled = "#D9D9D9";
export const colorBackgroundGrayLight = "#F8F8F8";
export const colorBackgroundGrayMedium = "#E6E6E6";
export const colorBackgroundGrayDark = "#7C7C7C";
export const colorSuccess = "#B4CE16";


// text
export const TextBody1 = styled(`span`)`
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextBody2 = styled(`p`)`
  font-size: 14px;
  line-height: ${props => props.line_height ? props.line_height : '24px'};
  font-weight: 400;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextSubtitle1 = styled(`span`)`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextSubtitle2 = styled(`span`)`
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextHeading6 = styled(`h6`)`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextHeading4 = styled(`h4`)`
  font-size: 28px;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextButton = styled(`span`)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  color: ${props => props.color};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;

export const TextCaption = styled(`span`)`
  font-size: 12px;
  color: ${props => props.color ? props.color : colorTextBody};
  text-overflow: inherit;
  white-space: inherit;
  overflow: inherit;
`;




// container
export const Flex = styled("div")`
  display: flex;
`;

export const VerticalFlex = styled(Flex)`
  flex-direction: column;
`;

export const ColumnAlignCenterFlex = styled(Flex)`
  flex-direction: column;
  align-items: center;
`;


export const RowAlignCenterFlex = styled(Flex)`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

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

export const MaxWidthDiv = styled(Flex)`
  flex-direction: column;
  max-width: 1254px;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
`;

export const EmptyHeight = styled(Flex)`
  min-height: ${props => props.height};
`

export const EmptyWidth = styled(Flex)`
  min-width: ${props => props.width};
`

export const WidthFixerWrapper = styled(Flex)`
  min-width: ${props => props.width};
  min-height: ${props => props.height};
  
  max-width: ${props => props.width};
  max-height: ${props => props.height};
`

export const TextEllipsisContainer = styled(Flex)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`


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



