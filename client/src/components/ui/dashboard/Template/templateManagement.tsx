import { Box, Typography } from '@mui/material';
// import { Template } from './templateTypes';
// import { CreateTemplateForm } from './TemplateForm';

export const TemplateManagement: React.FC = () => {
  // const handleTemplateSubmit = (template: Template) => {
  //   console.log('Template created:', template);
  //   // Handle template creation logic here
  // };

  // const handleCancel = () => {
  //   // Handle cancellation logic here
  // };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Template Management
      </Typography>
      {/* <CreateTemplateForm
        onSubmit={handleTemplateSubmit}
        onCancel={handleCancel}
      /> */}
    </Box>
  );
};

export default TemplateManagement;