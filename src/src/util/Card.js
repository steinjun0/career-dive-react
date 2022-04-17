import { styled } from "@mui/material";

import {
  TextHeading6,
  VerticalCenterAlignFlex,
  VerticalFlex,
} from "./styledComponent";

const CardWrapper = styled(VerticalFlex)`
  justify-content: start;
  min-width: ${props => `${props.min_width}px`};
  border-radius: 8px;
  padding: 24px;
  background-color: white;
  box-shadow: 10px 20px 40px rgba(130, 130, 130, 0.1);
  width: 100%;
`;

const TitleWrapper = styled(VerticalCenterAlignFlex)`
  font-size: 20px;
  font-weight: 700;
  ${props => props.no_divider ? '' : 'border-bottom: 1px solid #CFD6E0;'}
  ${props => props.no_divider ? '' : 'padding-bottom: 16px;'}
  
`;

const TitleHead = styled(VerticalCenterAlignFlex)`
`

const TitleTail = styled(VerticalCenterAlignFlex)`
  margin-left: auto;
`

export function Card(props) {
  return (
    <CardWrapper min_width={props.min_width}>
      <TitleWrapper no_divider={props.no_divider}>
        <TextHeading6>{props.title}</TextHeading6>
        <TitleHead>
          {props.titleHead}
        </TitleHead>
        <TitleTail>
          {props.titleTail}
        </TitleTail>
      </TitleWrapper>
      {props.children}
    </CardWrapper>
  );
}
