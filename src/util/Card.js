import { styled } from "@mui/material";

import {
  VerticalCenterAlignFlex,
  VerticalFlex,
} from "../util/styledComponent";

const CardWrapper = styled(VerticalFlex)`
  min-width: ${props => `${props.min_width}px`};
  border-radius: 8px;
  padding: 24px;
  background-color: white;
  box-shadow: 10px 20px 40px rgba(130, 130, 130, 0.1);
`;

const TitleWrapper = styled(VerticalCenterAlignFlex)`
  font-size: 20px;
  font-weight: 700;
  ${props => props.no_divider ? '' : 'border-bottom: 1px solid #CFD6E0;'}
  padding-bottom: 16px;
`;

const TitleHead = styled(VerticalCenterAlignFlex)`
`

const TitleTail = styled(VerticalCenterAlignFlex)`
  margin-left: auto;
`

function Card(props) {
  return (
    <CardWrapper min_width={props.min_width}>
      <TitleWrapper no_divider={props.no_divider}>
        <span>{props.title}</span>
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

export default Card;
