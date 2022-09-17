import { useState } from "react";
import { styled } from "@mui/material";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Flex } from "./styledComponent";

const MenuButton = styled(Button)`
    color: #bdbdbd;
    font-weight: ${props => props.fontWeight ? props.fontWeight : 0}
`

function SimpleMenu({ width, title, menuItems = [], style = {}, setState = () => { }, endIcon = undefined, onClickProps }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (text) => {
        if (menuItems.includes(text)) {
            setState(text)
        }
        setAnchorEl(null);
    };
    const onClick = (element) => {
        handleClose(element.target.outerText)
        onClickProps && onClickProps(element.target.outerText)
    }

    return (<Flex style={{ width: width }}>
        <MenuButton
            style={style}
            endIcon={endIcon}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
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
                <MenuItem style={{ width: style.width }} key={index} onClick={(element) => { onClick(element) }}>{element}</MenuItem>
            )}
        </Menu>
    </Flex>);
}
export default SimpleMenu;