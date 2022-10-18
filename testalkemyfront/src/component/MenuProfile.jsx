import { Avatar, Button, Menu, MenuItem } from '@mui/material'
import Divider from '@mui/material/Divider';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { Logout } from './Logout';

export const MenuProfile = ({user}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const onOpen = (event) => {
    setAnchorEl(event.currentTarget);
    };
    const onClose = () => {
        setAnchorEl(null);
    };

  return (
    <div>
        <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        variant="p"
        color="info"
        aria-expanded={open ? 'true' : undefined}
        onClick={onOpen}
      >
        <span>{user.username}</span>
         <Avatar style={{ backgroundColor: user.color , marginInline:10}}>{user !== null?user.username[0].toUpperCase():''}</Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={onClose}>
        <Link
            to='/profile'
            style={{textDecoration: 'none'}}
        >
            <Button color="info" variant="outlined">Profile</Button>
        </Link>
        </MenuItem>
        <Divider />
        <MenuItem onClick={onClose}><Logout/></MenuItem>
      </Menu>
    </div>
  )
}
