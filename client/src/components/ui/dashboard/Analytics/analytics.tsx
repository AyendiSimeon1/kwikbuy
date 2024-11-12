import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  CircularProgress
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AnalyticsData {
  analytics: {
    data: {
      phone_number_metrics: {
        day: string;
        total_conversations: number;
        total_messages_received: number;
        total_messages_sent: number;
      }[];
    };
  };
}

const UserAnalytics: React.FC = () => {
  const [startTime, setStartTime] = useState<number>(Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60);
  const [endTime, setEndTime] = useState<number>(Math.floor(Date.now() / 1000));
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
  const [accessToken, setAccessToken] = useState<string>('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await axios.get<AnalyticsData>('/api/analytics', {
          params: {
            api_version: 'v14.0',
            waba_id: 'your_waba_id',
            start_time: startTime,
            end_time: endTime,
            user_phone_number: userPhoneNumber,
            access_token: accessToken
          }
        });
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [startTime, endTime, userPhoneNumber, accessToken]);

  const handleFetchAnalytics = () => {
    // Update start and end times based on user input
    setStartTime(Math.floor(new Date(startTime * 1000).getTime() / 1000));
    setEndTime(Math.floor(new Date(endTime * 1000).getTime() / 1000));
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          User Analytics
        </Typography>
        <Box display="flex" gap={2} marginBottom={2}>
          <TextField
            label="Start Time (Unix timestamp)"
            type="number"
            value={startTime}
            onChange={(e) => setStartTime(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="End Time (Unix timestamp)"
            type="number"
            value={endTime}
            onChange={(e) => setEndTime(Number(e.target.value))}
            fullWidth
          />
          <TextField
            label="User Phone Number"
            value={userPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            fullWidth
          />
          <TextField
            label="Access Token"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFetchAnalytics}
          >
            Fetch Analytics
          </Button>
        </Box>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : analyticsData ? (
          <LineChart width={600} height={400} data={analyticsData.analytics.data.phone_number_metrics}>
            <XAxis dataKey="day" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="total_conversations" stroke="#8884d8" />
            <Line type="monotone" dataKey="total_messages_received" stroke="#82ca9d" />
            <Line type="monotone" dataKey="total_messages_sent" stroke="#ffc658" />
          </LineChart>
        ) : (
          <Typography variant="body1">No data available.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UserAnalytics;