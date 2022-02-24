import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export const colorCareerDiveBlue = "#698CFF";

export const Flex = styled("div")`
  display: flex;
`;

export const VerticalFlex = styled(Flex)`
  flex-direction: column;
`;

export const VerticalCenterAlignDiv = styled(Flex)`
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

export const FullWidthWrapper = styled(Flex)`
  justify-content: center;
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
