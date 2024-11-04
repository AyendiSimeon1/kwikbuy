import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography } from '@mui/material';

// Create a custom TabPanel component
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

// Helper function for a11y props
const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const DashboardHero = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className='flex flex-col flex-grow'>
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="dashboard tabs"
          sx={{
            backgroundColor: 'white',
            '& .MuiTab-root': {
              color: 'black',
              '&.Mui-selected': {
                color: 'green',
                fontWeight: 'bold',
              },
            },
          }}
        >
          <Tab label="Metrics" {...a11yProps(0)} />
          <Tab label="Send Broadcast" {...a11yProps(1)} />
          <Tab label="Create Template" {...a11yProps(2)} />
          <Tab label="Get Business Analytics" {...a11yProps(3)} />
          <Tab label="Create Chatbot" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <Typography variant="h6" component="h2">
          Content for Tab 1
        </Typography>
        <Typography paragraph>
          Your content for tab 1 goes here
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Typography variant="h6" component="h2">
          Content for Tab 2
        </Typography>
        <Typography paragraph>
          Your content for tab 2 goes here
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h6" component="h2">
          Content for Tab 3
        </Typography>
        <Typography paragraph>
          Your content for tab 3 goes here
        </Typography>
      </TabPanel>
    </Box>
    </div>
  );
};

export default DashboardHero;