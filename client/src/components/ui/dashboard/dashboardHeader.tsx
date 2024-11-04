"use client";
import React, { ChangeEvent, useState } from 'react';
import { User, Bell, Settings, Search } from 'lucide-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '@/redux/userSlice';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import DashboardHero from './dashboardHero';




const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const DashboardHeader = () => {
  const dispatch = useDispatch();
  const [selectValue, setSelectedValue] = useState<string>('');
  const  user  = useSelector(selectCurrentUser);
  console.log(user?.email);
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(currentDate);

  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value);
  }

  return (
   <div>
    <div className="flex flex-col flex-grow">
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div">
            {getGreeting()}, {user?.username}
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            {formattedDate}
          </Typography>
        </div>


        <FormControl style={{ marginTop: 20 }}>
               <Select
            labelId="custom-select-label"
            id="custom-select"
            value={selectValue}
            onChange={handleChange}
            IconComponent={User}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={1}>Logout</MenuItem>
           
            </Select>
        </FormControl>
        <IconButton color="inherit">
          <Bell className="h-5 w-5 text-gray-600" />
        </IconButton>
        <IconButton color="inherit">
          <Settings className="h-5 w-5 text-gray-600" />
        </IconButton>
      
      </Toolbar>
    </AppBar>
    <hr></hr>
    </div>
   <div>
     <DashboardHero />
   </div>
   </div>
  );
};

export default DashboardHeader;