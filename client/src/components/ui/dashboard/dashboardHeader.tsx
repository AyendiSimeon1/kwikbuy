"use client";
import React, { useState } from 'react';
import { User, Bell, Settings, Search } from 'lucide-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser } from '@/redux/userSlice';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useRouter } from 'next/router';



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

  const router = useRouter();
  const [selectValue, setSelectedValue] = useState('');
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

  const handleChange = (event: ) => {
    setSelectedValue(event.target.value);
  }

  return (
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

        <SearchBar>
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            style={{ padding: '8px', width: '200px' }}
          />
          <IconButton type="submit" aria-label="search">
            <Search className="h-5 w-5 text-gray-400" />
          </IconButton>
        </SearchBar>

        <FormControl fullWidth style={{ marginTop: 20 }}>
          <InputLabel id='custom-select-label'>Select Month</InputLabel>
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
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
        </FormControl>
        <IconButton color="inherit">
          <Bell className="h-5 w-5 text-gray-600" />
        </IconButton>
        <IconButton color="inherit">
          <Settings className="h-5 w-5 text-gray-600" />
        </IconButton>
        <IconButton color="inherit">
          <User className="h-5 w-5 text-gray-600" />
          <span style={{ display: 'none',  }}>Profile</span>
        </IconButton>
      </Toolbar>
    </AppBar>
    <hr></hr>
    </div>
  );
};

export default DashboardHeader;