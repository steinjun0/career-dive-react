import React, { PropsWithChildren } from "react";
import { Flex, VerticalFlex } from "util/styledComponent";
import useBreakpoint from "util/hooks/useBreakpoint";

export default function RegisterTemplate(props: PropsWithChildren) {
  const isDownSm = useBreakpoint('sm');
  return <Flex sx={{
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: isDownSm ? 'calc(100vh - 48px - 48px)' : 'calc(100vh - 80px - 80px)',
  }}>
    <VerticalFlex
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
        width: isDownSm ? '100%' : '378px',
        gap: '30px',
        height: isDownSm ? '100%' : undefined,
        ":first-of-type": {
          margin: '30px 16px'
        }
      }}>
      {props.children}
    </VerticalFlex>

  </Flex>;
}