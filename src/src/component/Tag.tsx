import { SxProps } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { CSSProperties } from "react";
import { Flex } from "util/styledComponent";

export default function Tag(props: { color: CSSProperties['color'], backgroundColor: CSSProperties['backgroundColor'], size: 'small' | 'medium' | 'large', sx?: SxProps, } & PropsWithChildren) {
  const padding = (() => {
    switch (props.size) {
      case 'small': return '2px 6px';
      case 'medium': return '4px 8px';
      case 'large': return '4px 8px';
    }
  })();

  const height = (() => {
    switch (props.size) {
      case 'small': return '20px';
      case 'medium': return '28px';
      case 'large': return '32px';
    }
  })();

  return <Flex
    sx={{
      backgroundColor: props.backgroundColor,
      color: props.color,
      borderRadius: '6px',
      padding: padding,
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '12px',
      ...props.sx
    }}>
    {props.children}
  </Flex>;
}