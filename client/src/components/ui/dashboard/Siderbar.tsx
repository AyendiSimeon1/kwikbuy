"use client";


import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FiHome, FiUser, FiSettings } from 'react-icons/fi';
import { ListCheckIcon } from 'lucide-react';
import BoltIcon from '@mui/icons-material/Bolt';
const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome /> },
    { name: 'Profile', icon: <FiUser /> },
    { name: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div>
    <Box sx=
    {{ width: 240, height: '100vh', bgcolor: 'grey.200', color: 'black' }}>
      <List>
        <ListItem
          sx={{
            px:3,
            mr:2
          }}
        >
      <BoltIcon />
      KwikBy
        </ListItem>
       
      </List>
      <hr></hr>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              px: 3,
              py: 2,
              borderRadius: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: 'black' },
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
    </div>
  );
};

export default Sidebar;
