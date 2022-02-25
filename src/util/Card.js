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
`;


const TitleWrapper = styled(VerticalCenterAlignFlex)`
  font-size: 20px;
  font-weight: 700;
  ${props => props.noDivider ? '' : 'border-bottom: 1px solid #CFD6E0;'}
  padding-bottom: 16px;
`;

const TitleTail = styled(VerticalCenterAlignFlex)`
  margin-left: auto;
`

function Card(props) {
  return (
    <CardWrapper min_width={props.min_width}>
      <TitleWrapper noDivider={props.noDivider}>
        <span>{props.title}</span>
        <TitleTail>
          {props.titleTail}
        </TitleTail>
      </TitleWrapper>
      {props.children}
    </CardWrapper>
  );
}

export default Card;
