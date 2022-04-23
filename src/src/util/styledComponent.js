import { Link } from "react-router-dom";
import { styled } from "@mui/material";

// color
export const colorCareerDiveBlue = "#698CFF";
export const colorCareerDivePink = "#E25D7D";
export const colorBlueGray = '#CFD6E0';
export const colorTextLight = "#898989";
export const colorTextBody = "#4F4F4F";
export const colorBackgroundGrayLight = "#F8F8F8";
export const colorBackgroundGrayDark = "#E6E6E6";

// text
export const TextBody1 = styled(`span`)`
  font-size: 16px;
  line-height: 24px;
`;

export const TextBody2 = styled(`span`)`
  font-size: 14px;
  line-height: 24px;
`;

export const TextSubtitle1 = styled(`span`)`
  font-weight: 700;
  line-height: 24px;
`;

export const TextSubtitle2 = styled(`span`)`
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
`;

export const TextHeading6 = styled(`h6`)`
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
`;

export const TextButton = styled(`span`)`
  font-size: 14px;
  line-height: 20px;
  color: ${colorTextLight};
  font-weight: 500;
`;

export const TextCaption = styled(`span`)`
  font-size: 12px;
  color: ${colorTextLight};
`;


// container
export const Flex = styled("div")`
  display: flex;
`;

export const VerticalFlex = styled(Flex)`
  flex-direction: column;
`;

export const VerticalCenterAlignFlex = styled(Flex)`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export const FullWidthWrapper = styled(VerticalFlex)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CenterWidthWrapper = styled(Flex)`
  flex-direction: column;
  align-items: start;
  max-width: 1194px;
  width: 100%;
`;

export const CircleImg = styled("img")`
  border-radius: 50%;
`;

export const GrayBackground = styled(Flex)`
  background-color: #f8f8f8;
  flex-direction: column;
  align-items: center;
  width: 100%;
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



