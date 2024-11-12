"use client";

import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, IconButton, Drawer } from '@mui/material';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import BoltIcon from '@mui/icons-material/Bolt';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome /> },
    { name: 'Profile', icon: <FiUser /> },
    { name: 'Settings', icon: <FiSettings /> },
    { name: 'Log out', icon: <FiUser /> },
    { name: 'Notifications', icon: <FiSettings /> },
  ];

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton 
        onClick={toggleDrawer} 
        sx={{ display: { xs: 'block', sm: 'none' }, color: 'green' }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        sx={{
          '& .MuiDrawer-paper': {
            width: 240,
            bgcolor: 'grey.100',
            color: 'green',
          }
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <BoltIcon />
          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                px: 4,
                py: 3,
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'white' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemIcon sx={{ color: 'black', minWidth: 'auto', mr: 2 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box sx={{ display: { xs: 'none', sm: 'block' }, width: 240, height: '100vh', bgcolor: 'grey.100', color: 'green' }}>
        <List>
          <ListItem sx={{ px: 4, mr: 3 }}>
            <BoltIcon />
            KwikBy
          </ListItem>
        </List>
        <hr />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              sx={{
                px: 4,
                py: 3,
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': { bgcolor: 'white' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ListItemIcon sx={{ color: 'black', minWidth: 'auto', mr: 2 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default Sidebar;