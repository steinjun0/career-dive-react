import { styled, StyledComponentProps } from "@mui/material";
import { MUIStyledCommonProps } from "@mui/system";
import React, { CSSProperties, FC, ReactNode } from "react";

import {
  TextHeading6,
  RowAlignCenterFlex,
  VerticalFlex,
  Flex,
  colorBackgroundGrayMedium,
} from "../styledComponent";
// import { cssLength } from "./styledComponent";

const CardWrapper = styled(VerticalFlex) <{
  min_width?: CSSProperties["minWidth"],
  max_width?: CSSProperties["maxWidth"]
}>`
  justify-content: start;
  min-width: ${props => `${props.min_width}`};
  max-width: ${props => `${props.max_width}`};
  border-radius: 8px;
  padding: 24px;
  background-color: white;
  box-shadow: 10px 20px 40px rgba(130, 130, 130, 0.1);
  width: 100%;
`;

const TitleWrapper = styled(VerticalFlex) <{ no_divider: 'true' | 'false' }>`
  font-size: 20px;
  font-weight: 700;
  ${props => props.no_divider === 'true' ? '' : `border-bottom: 1px solid ${colorBackgroundGrayMedium};`}
  ${props => props.no_divider === 'true' ? '' : 'padding-bottom: 16px;'}
  
`;

const TitleHead = styled(RowAlignCenterFlex)`
`

const TitleTail = styled(RowAlignCenterFlex)`
  margin-left: auto;
`
const TitleBottom = styled(RowAlignCenterFlex)`
`

function Card(props: {
  sx?: Object;
  max_width?: CSSProperties["maxWidth"]; min_width?: CSSProperties["minWidth"];
  no_divider: boolean;
  title?: ReactNode; titleHead?: ReactNode; titleTail?: ReactNode; titleBottom?: ReactNode; children?: ReactNode;
}) {
  return (
    <CardWrapper sx={props.sx} max_width={props.min_width} min_width={props.min_width} >
      <TitleWrapper no_divider={props.no_divider ? 'true' : 'false'}>
        <RowAlignCenterFlex>
          <TextHeading6>{props.title}</TextHeading6>
          <TitleHead>
            {props.titleHead}
          </TitleHead>
          <TitleTail>
            {props.titleTail}
          </TitleTail>
        </RowAlignCenterFlex>
        <Flex>
          <TitleBottom>
            {props.titleBottom}
          </TitleBottom>
        </Flex>
      </TitleWrapper>
      {props.children}
    </CardWrapper>
  );
}

export default Card
