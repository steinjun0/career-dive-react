import { ReactElement, useState } from "react";
import { styled } from "@mui/material";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Flex } from "util/styledComponent";
import React from "react";

const MenuButton = styled(Button)`
    color: #bdbdbd;
`
// font-weight: ${props => props.fontWeight ? props.fontWeight : 0}

// !!!!!!!!!!!! Caution !!!!!!!!!!!!
// 수정하다 중간에 멈춤
// 필요시 꼭 다시 코드를 확인할 것(23.01.23)
// 코드를 수정했다면 본 주석을 삭제할 것(23.01.23)
function SimpleMenu(
    {
        title,
        menuItems = [],
        endIcon = undefined,
        propsOnClick
    }
        :
        {
            title: string,
            menuItems: string[],
            endIcon?: ReactElement,
            propsOnClick?: Function
        }
) {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const open = Boolean(anchorEl);
    const handleClick = (currentTarget: Element | null) => {
        setAnchorEl(currentTarget ?? null);
    };
    const handleClose = (text: string) => {
        if (menuItems.includes(text)) {
            // setState(text)
        }
        setAnchorEl(null);
    };
    const onClick = (target: EventTarget | null) => {
        target && handleClose((target as HTMLElement).outerText)
        propsOnClick && propsOnClick()
    }

    return (<Flex style={{ width: '100%' }}>
        <MenuButton
            // style={style}
            endIcon={endIcon}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(event) => handleClick(event.currentTarget)}
        >
            {title}
        </MenuButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            {menuItems.map((element, index) =>
                <MenuItem key={index} onClick={(element) => { onClick(element.target) }}>{element}</MenuItem>
            )}
        </Menu>
    </Flex>);
}
export default SimpleMenu;