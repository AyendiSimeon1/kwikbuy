import React, { useState } from 'react';
import { AppBar, Tabs, Tab, Box, Typography} from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon } from 'lucide-react';
import TemplateManagement from './Template/templateManagement';
import WhatsAppMessaging from './Message/message';
import UserAnalytics from './Analytics/analytics';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// interface Template {
//   id: number;
//   name: string;
//   description: string;
// }

const TabPanel: React.FC<TabPanelProps> = (props) => {
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

const a11yProps = (index: number) => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
};

const DashboardHero: React.FC = () => {
  const [value, setValue] = useState(0);
  // const [templates, setTemplates] = useState<Template[]>([
  //   { id: 1, name: 'Invoice Template', description: 'Standard invoice format' },
  //   { id: 2, name: 'Report Template', description: 'Monthly report format' },
  // ]);
  // // const [searchQuery, setSearchQuery] = useState('');
  // const [isCreating, setIsCreating] = useState(false);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const handleDeleteTemplate = (id: number) => {
  //   setTemplates(templates.filter(template => template.id !== id));
  // };

  // const TemplateCard: React.FC<{ template: Template }> = ({ template }) => (
  //   <Card sx={{ width: '100%', mb: 2 }}>
  //     <CardContent>
       
  //       <Box display="flex" justifyContent="space-between" alignItems="flex-start">
  //         <Box>
  //           <Typography variant="h6" gutterBottom>
  //             {template.name}
  //           </Typography>
  //           <Typography variant="body2" color="text.secondary">
  //             {template.description}
  //           </Typography>
  //         </Box>
  //         <Box display="flex" gap={1}>
  //           <IconButton
  //             size="small"
  //             sx={{ color: 'primary.main' }}
  //           >
  //             <EditIcon className="h-5 w-5" />
  //           </IconButton>
  //           <IconButton
  //             size="small"
  //             onClick={() => handleDeleteTemplate(template.id)}
  //             sx={{ color: 'error.main' }}
  //           >
  //             <DeleteIcon className="h-5 w-5" />
  //           </IconButton>
  //         </Box>
  //       </Box>
  //     </CardContent>
  //   </Card>
  // );

  // const CreateTemplateForm: React.FC = () => (
  //   <Card sx={{ width: '100%', mb: 2 }}>
  //     <CardContent>
  //       <Typography variant="h6" gutterBottom>
  //         Create New Template
  //       </Typography>
  //       <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
  //         <TextField
  //           label="Template Name"
  //           variant="outlined"
  //           fullWidth
  //           size="small"
  //         />
  //         <TextField
  //           label="Description"
  //           variant="outlined"
  //           fullWidth
  //           multiline
  //           rows={3}
  //           size="small"
  //         />
  //         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
  //           <Button
  //             variant="outlined"
  //             onClick={() => setIsCreating(false)}
  //           >
  //             Cancel
  //           </Button>
  //           <Button
  //             variant="contained"
  //             type="submit"
  //           >
  //             Create Template
  //           </Button>
  //         </Box>
  //       </Box>
  //     </CardContent>
  //   </Card>
  // );

  // const TemplatesSection: React.FC = () => (
  //   <Box>
  //     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
  //       <Typography variant="h5">
  //         Templates
  //       </Typography>
  //       <Button
  //         variant="contained"
  //         startIcon={<AddIcon className="h-4 w-4" />}
  //         onClick={() => setIsCreating(true)}
  //       >
  //         Create Template
  //       </Button>
  //     </Box>

  //     <TextField
  //       fullWidth
  //       placeholder="Search templates..."
  //       variant="outlined"
  //       size="small"
  //       value={searchQuery}
  //       onChange={(e) => setSearchQuery(e.target.value)}
  //       sx={{ mb: 3 }}
  //       InputProps={{
  //         startAdornment: <SearchIcon className="h-4 w-4 mr-2 text-gray-400" />,
  //       }}
  //     />

  //     {isCreating && <CreateTemplateForm />}

  //     {templates
  //       .filter(template => 
  //         template.name.toLowerCase().includes(searchQuery.toLowerCase())
  //       )
  //       .map(template => (
  //         <TemplateCard key={template.id} template={template} />
  //       ))}
  //   </Box>
  // );

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="dashboard tabs"
          sx={{
            bgcolor: 'background.paper',
            '& .MuiTab-root': {
              color: 'green',
              '&.Mui-selected': {
                color: 'green',
                fontWeight: 'bold',
              },
            },
          }}
        >
          <Tab label="Send Broadcast" {...a11yProps(0)} />
          <Tab label="Templates" {...a11yProps(1)} />
          <Tab label="Growth Metrics" {...a11yProps(2)} />
          <Tab label="Get Business Analytics" {...a11yProps(3)} />
          <Tab label="Create Chatbot" {...a11yProps(4)} />
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <WhatsAppMessaging />
      </TabPanel>

      <TabPanel value={value} index={1}>
        {/* <TemplateCard template={templates} /> */}
        <TemplateManagement />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="h6" gutterBottom>
          Create Template
        </Typography>
        <Typography>
          Your template creation content goes here
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <UserAnalytics />
      </TabPanel>

      <TabPanel value={value} index={4}>
        <Typography variant="h6" gutterBottom>
          Create Chatbot
        </Typography>
        <Typography>
          Your chatbot creation content goes here
        </Typography>
      </TabPanel>
    </Box>
  );
};

export default DashboardHero;