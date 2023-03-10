import { useTheme } from "@mui/material";
import React, { ReactElement } from "react";
import { colorTextLight, RowAlignCenterFlex, TextCaption, TextHeading6, VerticalFlex } from "util/styledComponent";

export default function SignupTemplate({ title, step, children }: { title: string, step: string, children: ReactElement; }) {
  const theme = useTheme();

  return <VerticalFlex
    sx={{
      boxSizing: 'border-box', width: "100%", height: 'calc(100vh - 80px)', padding: '16px',
      alignItems: 'center', justifyContent: 'center',
      [theme.breakpoints.down('sm')]: { justifyContent: 'start' }
    }}
  >
    <VerticalFlex sx={{
      width: '100%', minWidth: '284px', maxWidth: '378px',
      [theme.breakpoints.down('sm')]: { height: '100%' }
    }}>
      <RowAlignCenterFlex sx={{ justifyContent: 'space-between', marginBottom: '36px ' }}>
        <TextHeading6>
          {title}
        </TextHeading6>
        <TextCaption color={colorTextLight}>{step}</TextCaption>
      </RowAlignCenterFlex>
      {children}
    </VerticalFlex>
  </VerticalFlex>;
}