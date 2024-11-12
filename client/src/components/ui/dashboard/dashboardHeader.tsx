"use client";
import React from 'react';
import { Bell, Settings } from 'lucide-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
 import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/userSlice';
// import { InputLabel, SelectChangeEvent } from '@mui/material';
import DashboardHero from './dashboardHero';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const DashboardHeader = () => {
  // const dispatch = useDispatch();
  // const [selectValue, setSelectedValue] = useState<string>('');
  const user = useSelector(selectCurrentUser);
  
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

  // const handleChange = (event: SelectChangeEvent<string>) => {
  //   setSelectedValue(event.target.value);
  // }

  return (
    <div>
      <div className="flex flex-col flex-grow">
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'green', boxShadow: 'none' }}>
          <Toolbar>
            <div style={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {getGreeting()}, {user?.username}
              </Typography>
              <Typography variant="subtitle1" color="inherit" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {formattedDate}
              </Typography>
            </div>
       
            <SearchBar>
              <InputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                sx={{ paddingLeft: 2, width: { xs: '100%', sm: '200px' } }} 
              />
            </SearchBar>
            
            <IconButton size="large" aria-label="user settings" color="inherit">
              <Settings />
            </IconButton>
            <IconButton size="large" aria-label="notifications" color="inherit">
              <Bell />
            </IconButton>
          </Toolbar>
        </AppBar>
        <hr />
      </div>
      <div>
        <DashboardHero />
      </div>
    </div>
  );
};

export default DashboardHeader;