import { styled, StyledComponentProps } from "@mui/material";
import { MUIStyledCommonProps } from "@mui/system";
import React, { CSSProperties, FC, ReactNode } from "react";

import {
  TextHeading6,
  RowAlignCenterFlex,
  VerticalFlex,
  Flex,
  colorBackgroundGrayMedium,
  defaultBoxShadow,
} from "../styledComponent";
// import { cssLength } from "./styledComponent";

const CardWrapper = styled(VerticalFlex)(() => ({
  justifyContent: 'start',
  borderRadius: '8px',
  padding: '24px',
  backgroundColor: 'white',
  boxShadow: defaultBoxShadow,
  // filter: 'drop-shadow(0px 0px 40px rgba(130, 130, 130, 0.1))',
  width: '100%',
}))


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
    <CardWrapper sx={props.sx}>
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
