import { Divider } from "@mui/material";
import React, { ReactElement } from "react";
import { CenterFlex, colorTextLight, RowAlignCenterFlex, TextCaption, TextHeading6, VerticalFlex } from "util/styledComponent";

export default function SignupTemplate({ title, step, children }: { title: string, step: string, children: ReactElement }) {
  return <CenterFlex style={{ width: "100%", minHeight: 'calc((100vh - 80px) - 220px)' }}>
    <VerticalFlex style={{ width: '378px' }}>
      <RowAlignCenterFlex style={{ justifyContent: 'space-between', marginBottom: '36px ' }}>
        <TextHeading6>
          {title}
        </TextHeading6>
        <TextCaption color={colorTextLight}>{step}</TextCaption>
      </RowAlignCenterFlex>
      {children}
    </VerticalFlex>
  </CenterFlex>
}