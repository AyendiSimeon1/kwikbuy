import React, { useState } from 'react';
import axios from 'axios';
import { 
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Chip,
  
  Grid
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import Papa from 'papaparse';

interface WhatsAppMessage {
  messaging_product: string;
  recipient_type: string;
  to: string;
  type: string;
  text: {
    preview_url: boolean;
    body: string;
  };
}

interface SentMessage {
  to: string;
  text: {
    body: string;
  };
}

interface CSVRow {
  phone_number: string;
  [key: string]: string;
}

const WhatsAppMessaging: React.FC = () => {
  const [recipientNumbers, setRecipientNumbers] = useState<string[]>([]);
  const [newRecipientNumber, setNewRecipientNumber] = useState<string>('');
  const [messageContent, setMessageContent] = useState<string>('');
  const [allMessages, setAllMessages] = useState<SentMessage[]>([]);

  const addRecipientNumber = () => {
    if (newRecipientNumber.trim() !== '') {
      setRecipientNumbers([...recipientNumbers, newRecipientNumber.trim()]);
      setNewRecipientNumber('');
    }
  };

  const removeRecipientNumber = (index: number) => {
    const updatedNumbers = [...recipientNumbers];
    updatedNumbers.splice(index, 1);
    setRecipientNumbers(updatedNumbers);
  };

  const importRecipientsFromCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      Papa.parse(event.target.files[0], {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results: Papa.ParseResult<CSVRow>) => {
          const newNumbers = results.data.map((row: { phone_number: string; }) => row.phone_number);
          setRecipientNumbers([...recipientNumbers, ...newNumbers]);
        }
      });
    }
  };

  const sendWhatsAppMessage = async () => {
    const messageData: WhatsAppMessage[] = recipientNumbers.map((number) => ({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: number,
      type: 'text',
      text: {
        preview_url: false,
        body: messageContent
      }
    }));

    try {
      const responses = await Promise.all(
        messageData.map((data) => axios.post<WhatsAppMessage>('/api/whatsapp-message', data))
      );
      console.log('Messages sent:', responses.map((res) => res.data));
    } catch (error) {
      console.error('Error sending messages:', error);
    }
  };

  const getAllMessages = async () => {
    try {
      const response = await axios.get<SentMessage[]>('/api/whatsapp-messages');
      setAllMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              All Sent Messages
            </Typography>
            <Box marginBottom={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={getAllMessages}
                fullWidth
              >
                Fetch Messages
              </Button>
            </Box>
            <Box 
              style={{ maxHeight: '300px', overflowY: 'auto' }} // Set max height and enable vertical scrolling
            >
              <List>
                {allMessages.map((message, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={`Recipient: ${message.to}`}
                      secondary={`Message: ${message.text.body}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Send WhatsApp Message
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="stretch" marginBottom={2}>
              <TextField
                label="Recipient Phone Number"
                variant="outlined"
                value={newRecipientNumber}
                onChange={(e) => setNewRecipientNumber(e.target.value)}
                fullWidth
                margin="normal" />
              <Button
                variant="contained"
                color="primary"
                onClick={addRecipientNumber}
                style={{ marginTop: '8px' }}
              >
                Add
              </Button>
            </Box>
            <Box marginBottom={2}>
              {recipientNumbers.map((number, index) => (
                <Chip
                  key={index}
                  label={number}
                  onDelete={() => removeRecipientNumber(index)}
                  deleteIcon={<DeleteIcon />}
                  style={{ marginRight: '8px', marginBottom: '8px' }} />
              ))}
            </Box>
            <TextField
              label="Message Content"
              variant="outlined"
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              fullWidth
              multiline
              rows={4}
              margin="normal" />
            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={sendWhatsAppMessage}
                disabled={recipientNumbers.length === 0}
              >
                Send Message
              </Button>
              <Button
                variant="contained"
                color="secondary"
                component="label"
              >
                Import from CSV
                <input
                  type="file"
                  accept=".csv"
                  onChange={importRecipientsFromCSV}
                  style={{ display: 'none' }} />
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default WhatsAppMessaging;