import { Button, styled } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import React, { ComponentPropsWithoutRef, DOMAttributes, useRef } from "react";
import { useState } from "react";
import { colorBackgroundGrayLight, TextSubtitle1, Flex, colorTextLight } from "util/styledComponent";
const CustomIconButtonStyle = styled(Button)(
  (
    {
      background_color = colorBackgroundGrayLight,
      text_color = colorTextLight,
      hover_background_color,
      hover_text_color
    }:
      {
        background_color: CSSProperties["color"],
        text_color: CSSProperties["color"],
        hover_background_color: CSSProperties["color"],
        hover_text_color: CSSProperties["color"];
      }
  ) => ({
    justifyContent: 'start',
    transition: 'all 0.3s ease-out',
    backgroundColor: background_color,
    color: text_color,
    '&:hover': {
      backgroundColor: hover_background_color,
      color: hover_text_color,
    },
    height: '40px',
    overflowX: 'hidden', // 이걸 해야 하위 text가 본래의 width를 유지함
    whiteSpace: 'nowrap'
  }));

export function ExpandingIconButton(
  { Icon, text, color, textColor, hoverColor, hoverTextColor, ...prop }
    : {
      Icon: any, // TODO: add type
      text: string,
      color?: CSSProperties['color'],
      textColor?: CSSProperties['color'],
      hoverColor: CSSProperties['color'],
      hoverTextColor: CSSProperties['color'],
    } & ComponentPropsWithoutRef<"div">
) {
  const [isHover, setIsHover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <Flex
      sx={{
        width: isHover ? buttonRef.current?.scrollWidth : '40px',
        borderRadius: '8px',
        transition: 'all 0.3s ease-out',
        overflow: 'hidden'
      }}
      {...prop}
    >
      <CustomIconButtonStyle
        background_color={color}
        text_color={textColor}
        hover_background_color={hoverColor}
        hover_text_color={hoverTextColor}

        onMouseEnter={() => { setIsHover(true); }}
        onMouseLeave={() => { setIsHover(false); }}
        ref={buttonRef}
      >
        <Flex
          style={{ marginRight: '8px', minWidth: '24px', minHeight: '24px' }}
        >
          <Icon
            sx={{
              transition: 'all 0.3s ease-out',
            }}
            color={isHover ? hoverTextColor : textColor ?? colorTextLight}
          />
        </Flex>
        <TextSubtitle1
          sx={{
            transition: 'all 0.3s ease-out',
            color: isHover ? hoverTextColor : colorTextLight,
            minWidth: 'fit-content'
          }}
        >
          {text}
        </TextSubtitle1>
      </CustomIconButtonStyle>
    </Flex>
  );
}