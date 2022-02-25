import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export const colorCareerDiveBlue = "#698CFF";
export const colorCareerDivePink = "#E25D7D"
export const colorTextLight = "#898989";
export const colorTextBody = "#4F4F4F";


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
  max-width: 1194px;
  width: 100%;
`;

export const LinkNoDeco = styled(Link)`
  text-decoration: none;
  color: black;
`;
