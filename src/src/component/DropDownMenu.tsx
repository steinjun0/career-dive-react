import { Divider, styled } from "@mui/material";
import { CSSProperties } from "@mui/styled-engine";
import React, { MouseEventHandler, useRef } from "react";
import { colorBackgroundGrayMedium, colorTextLight, defaultBoxShadow, Flex, LinkNoDeco, TextBody2, TextSubtitle2, VerticalFlex } from "util/styledComponent";

const DropDownMenuWrapper = styled(VerticalFlex)(() => ({
  width: '180px',
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '24px',
  gap: '16px',
  color: colorTextLight,
}));

const HideWrapper = styled(VerticalFlex)((props: { is_hide: 'true' | 'false', height: CSSProperties['height']; }) => ({
  transition: 'height 0.3s ease',
  overflowY: 'hidden',
  boxShadow: defaultBoxShadow,
  height: props.is_hide === 'true' ? '0px' : props.height
}));

export default function DropDownMenu(
  props: {
    isHide: boolean,
    mainItems: { name: string, link: string, onClick?: MouseEventHandler<HTMLSpanElement>; }[],
    subItems: { name: string, link: string, onClick?: MouseEventHandler<HTMLSpanElement>; }[];
  }
) {

  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <HideWrapper is_hide={props.isHide ? 'true' : 'false'} height={menuRef.current?.scrollHeight} >
      <DropDownMenuWrapper ref={menuRef}>
        {props.mainItems.map((item, index) => {
          return (
            <LinkNoDeco
              to={item.link}
              key={index}
              onClick={item.onClick}
            >
              <TextSubtitle2
                sx={{ overFlow: 'auto' }}
              >
                {item.name}
              </TextSubtitle2>
            </LinkNoDeco>
          );
        })}
        <Divider style={{ color: colorBackgroundGrayMedium }}></Divider>
        {props.subItems.map((item, index) => {
          return (
            <TextBody2
              sx={{ overflow: 'initial', cursor: 'pointer' }}
              key={index}
              onClick={item.onClick}
            >
              {item.name}
            </TextBody2>
          );
        })}
      </DropDownMenuWrapper>
    </HideWrapper >

  );
}