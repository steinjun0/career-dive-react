import { Divider, styled, useMediaQuery, useTheme } from "@mui/material";

import {
  TextHeading6,
  RowAlignCenterFlex,
  VerticalFlex,
  Flex,
  colorBackgroundGrayMedium,
} from "./styledComponent";

const CardWrapper = styled(VerticalFlex)((props) => {
  return {
    justifyContent: 'start',
    minWidth: `${props.min_width}`,
    maxWidth: `${props.max_width}`,
    borderRadius: '8px',
    padding: '24px',
    backgroundColor: 'white',
    boxShadow: '10px 20px 40px rgba(130, 130, 130, 0.1)',
    width: '100%',
    ['@media (max-width:899.95px)']: {
      padding: '16px'
    }
  }
})


const TitleWrapper = styled(VerticalFlex)`
  font-size: 20px;
  font-weight: 700;
  ${props => props.no_divider == 'true' ? '' : `border-bottom: 1px solid ${colorBackgroundGrayMedium};`}
  ${props => props.no_divider == 'true' ? '' : 'padding-bottom: 16px;'}
  
`;

const TitleHead = styled(RowAlignCenterFlex)`
`

const TitleTail = styled(RowAlignCenterFlex)({
  marginLeft: 'auto',
  ['@media (max-width:899.95px)']: {
    marginLeft: 0
  }
})

const TitleBottom = styled(RowAlignCenterFlex)`
`

export function Card(props) {
  const theme = useTheme()
  const isDownMd = useMediaQuery(theme.breakpoints.down('md'))
  return (
    <CardWrapper style={props.style} max_width={props.max_width} min_width={props.min_width}>
      <TitleWrapper no_divider={props.no_divider}>
        <RowAlignCenterFlex>
          <TextHeading6>{props.title}</TextHeading6>
          <TitleHead>
            {props.titleHead}
          </TitleHead>
          {
            !isDownMd
            &&
            <TitleTail>
              {props.titleTail}
            </TitleTail>
          }
        </RowAlignCenterFlex>
        <Flex>
          <TitleBottom>
            {props.titleBottom}
          </TitleBottom>
        </Flex>
      </TitleWrapper>
      {isDownMd && <Divider sx={{ borderColor: colorBackgroundGrayMedium, borderWidth: 0.5, width: 'calc(100% + 32px)', marginLeft: '-16px', margin: '16px 0 16px -16px' }} />}
      {
        isDownMd
        &&
        <TitleTail>
          {props.titleTail}
        </TitleTail>
      }
      {props.children}
    </CardWrapper>
  );
}
