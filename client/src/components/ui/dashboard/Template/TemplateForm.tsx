import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import { Plus as AddIcon, Trash2 as DeleteIcon } from 'lucide-react';

interface TemplateComponent {
  type: 'text' | 'image' | 'button' | 'list';
  text?: string;
  url?: string;
  items?: string[];
  style?: {
    color?: string;
    fontSize?: number;
  };
  buttons?: TemplateButton[];
}

interface TemplateButton {
  type: 'URL' | 'PHONE_NUMBER';
  text: string;
  url?: string;
  phone_number?: string;
}

interface Template {
  name: string;
  language: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  components: TemplateComponent[];
}

const INITIAL_COMPONENT: TemplateComponent = {
  type: 'text',
  text: '',
};

const INITIAL_BUTTON: TemplateButton = {
  type: 'URL',
  text: '',
  url: '',
};

interface CreateTemplateFormProps {
  onSubmit: (template: Template) => void;
  onCancel: () => void;
}

export const CreateTemplateForm: React.FC<CreateTemplateFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [template, setTemplate] = useState<Template>({
    name: '',
    language: 'en_US',
    category: 'MARKETING',
    components: [{ ...INITIAL_COMPONENT }],
  });

  const handleComponentChange = <T extends keyof TemplateComponent>(
    index: number,
    field: T,
    value: TemplateComponent[T]
  ) => {
    const updatedComponents = [...template.components];
    updatedComponents[index] = {
      ...updatedComponents[index],
      [field]: value,
    };
    setTemplate({ ...template, components: updatedComponents });
  };

  const handleButtonChange = (
    componentIndex: number,
    buttonIndex: number,
    field: keyof TemplateButton,
    value: string
  ) => {
    const updatedComponents = [...template.components];
    const buttons = updatedComponents[componentIndex].buttons || [];
    buttons[buttonIndex] = { ...buttons[buttonIndex], [field]: value };
    updatedComponents[componentIndex].buttons = buttons;
    setTemplate({ ...template, components: updatedComponents });
  };

  const addComponent = () => {
    setTemplate({
      ...template,
      components: [...template.components, { ...INITIAL_COMPONENT }],
    });
  };

  const removeComponent = (index: number) => {
    const updatedComponents = template.components.filter((_, i) => i !== index);
    setTemplate({ ...template, components: updatedComponents });
  };

  const addButton = (componentIndex: number) => {
    const updatedComponents = [...template.components];
    const component = updatedComponents[componentIndex];
    component.buttons = [...(component.buttons || []), { ...INITIAL_BUTTON }];
    setTemplate({ ...template, components: updatedComponents });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(template);
  };

  return (
    <Card sx={{ width: '100%', mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Create Template
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <TextField
              label="Template Name"
              value={template.name}
              onChange={(e) => setTemplate({ ...template, name: e.target.value })}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={template.category}
                label="Category"
                onChange={(e) =>
                  setTemplate({
                    ...template,
                    category: e.target.value as Template['category'],
                  })
                }
              >
                <MenuItem value="MARKETING">Marketing</MenuItem>
                <MenuItem value="UTILITY">Utility</MenuItem>
                <MenuItem value="AUTHENTICATION">Authentication</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {template.components.map((component, index) => (
            <Box key={index} sx={{ border: '1px solid #e0e0e0', p: 2, borderRadius: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <FormControl sx={{ width: '200px' }}>
                  <InputLabel>Component Type</InputLabel>
                  <Select
                    value={component.type}
                    label="Component Type"
                    onChange={(e) => handleComponentChange(index, 'type', e.target.value as TemplateComponent['type'])}
                  >
                    <MenuItem value="text">Text</MenuItem>
                    <MenuItem value="image">Image</MenuItem>
                    <MenuItem value="button">Button</MenuItem>
                    <MenuItem value="list">List</MenuItem>
                  </Select>
                </FormControl>
                <IconButton onClick={() => removeComponent(index)} sx={{ color: 'error.main' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>

              {component.type !== 'button' && (
                <TextField
                  label="Text"
                  value={component.text || ''}
                  onChange={(e) => handleComponentChange(index, 'text', e.target.value)}
                  fullWidth
                  multiline
                  rows={2}
                />
              )}

              {component.type === 'button' && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {component.buttons?.map((button, buttonIndex) => (
                    <Box key={buttonIndex} sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)' }}>
                      <FormControl fullWidth>
                        <InputLabel>Button Type</InputLabel>
                        <Select
                          value={button.type}
                          label="Button Type"
                          onChange={(e) =>
                            handleButtonChange(index, buttonIndex, 'type', e.target.value as TemplateButton['type'])
                          }
                        >
                          <MenuItem value="URL">URL</MenuItem>
                          <MenuItem value="PHONE_NUMBER">Phone Number</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField
                        label="Button Text"
                        value={button.text}
                        onChange={(e) => handleButtonChange(index, buttonIndex, 'text', e.target.value)}
                      />
                      <TextField
                        label={button.type === 'URL' ? 'URL' : 'Phone Number'}
                        value={button.type === 'URL' ? button.url : button.phone_number || ''}
                        onChange={(e) =>
                          handleButtonChange(
                            index,
                            buttonIndex,
                            button.type === 'URL' ? 'url' : 'phone_number',
                            e.target.value
                          )
                        }
                      />
                    </Box>
                  ))}
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => addButton(index)}
                    variant="outlined"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Add Button
                  </Button>
                </Box>
              )}
            </Box>
          ))}

          <Button startIcon={<AddIcon />} onClick={addComponent} variant="outlined">
            Add Component
          </Button>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Create Template
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};