import { useState } from "react";
import { styled } from "@mui/material";

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const MenuButton = styled(Button)`
    color: #bdbdbd;
    font-weight: ${props => props.fontWeight ? props.fontWeight : 0}
`

function SimpleMenu({ title, menuItems = [], style = {}, setState = () => { }, endIcon = undefined }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (element) => {
        setState(element)
        setAnchorEl(null);
    };

    return (<div>
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
                <MenuItem key={index} onClick={() => { handleClose(element) }}>{element}</MenuItem>
            )}
        </Menu>
    </div>);
}
export default SimpleMenu;