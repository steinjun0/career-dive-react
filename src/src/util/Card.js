import { styled } from "@mui/material";

import {
  TextHeading6,
  RowAlignCenterFlex,
  VerticalFlex,
  Flex,
} from "./styledComponent";

const CardWrapper = styled(VerticalFlex)`
  justify-content: start;
  min-width: ${props => `${props.min_width}`};
  max-width: ${props => `${props.max_width}`};
  border-radius: 8px;
  padding: 24px;
  background-color: white;
  box-shadow: 10px 20px 40px rgba(130, 130, 130, 0.1);
  width: 100%;
`;

const TitleWrapper = styled(VerticalFlex)`
  font-size: 20px;
  font-weight: 700;
  ${props => props.no_divider == 'true' ? '' : 'border-bottom: 1px solid #CFD6E0;'}
  ${props => props.no_divider == 'true' ? '' : 'padding-bottom: 16px;'}
  
`;

const TitleHead = styled(RowAlignCenterFlex)`
`

const TitleTail = styled(RowAlignCenterFlex)`
  margin-left: auto;
`
const TitleBottom = styled(RowAlignCenterFlex)`
`

export function Card(props) {
  return (
    <CardWrapper max_width={props.max_width} min_width={props.min_width}>
      <TitleWrapper no_divider={props.no_divider}>
        <Flex>
          <TextHeading6>{props.title}</TextHeading6>
          <TitleHead>
            {props.titleHead}
          </TitleHead>
          <TitleTail>
            {props.titleTail}
          </TitleTail>
        </Flex>
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
