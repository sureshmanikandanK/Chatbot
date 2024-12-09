//Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Button, Typography, Alert, Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText } from '@mui/material';  // Add List, ListItem, and ListItemText here

function Dashboard() {
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  // Fetch list of bots associated with the user
  const fetchBots = async () => { 
    try {
      const res = await axios.get('http://localhost:5000/bots', {
        headers: {
          'UserId': userId
        }
      });
      setBots(res.data.bots);
    } catch (err) {
      setError("Failed to fetch bots.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBots();
    }
  }, [userId]);

  const handleBotSelect = (event) => {
    setSelectedBot(event.target.value);
  };

  const handleChatPageNavigation = () => {
    if (!selectedBot) {
      setError("Please select a bot.");
      return;
    }
    navigate(`/chat/${selectedBot}`);  // Navigate to the ChatPage with the selected bot
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box sx={{ bgcolor: 'background.paper', padding: 3, borderRadius: 2, boxShadow: 3, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Dashboard
        </Typography>

        {/* Display error message if any */}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {/* Bot selection dropdown */}
        <Box sx={{ marginBottom: 2, width: '100%' }}>
          <FormControl fullWidth>
            <InputLabel id="bot-select-label">Select a Bot</InputLabel>
            <Select
              labelId="bot-select-label"
              value={selectedBot}
              onChange={handleBotSelect}
              label="Select a Bot"
            >
              <MenuItem value="">
                <em>-- Select a Bot --</em>
              </MenuItem>
              {bots.map((bot) => (
                <MenuItem key={bot.id} value={bot.bot_name}>
                  {bot.bot_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Buttons */}
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate('/upload')}
          >
            Upload File
          </Button>
        </Box>

        {/* Button to navigate to ChatPage */}
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleChatPageNavigation}
          >
            Chat with Bot
          </Button>
        </Box>

        {/* List of Bots */}
        {bots.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              {/* Your Bots */}
            </Typography>
            {/* <List>
              {bots.map((bot) => (
                <ListItem key={bot.id} sx={{ borderBottom: '1px solid #ccc', padding: '8px' }}>
                  <ListItemText primary={bot.bot_name} />
                </ListItem>
              ))}
            </List> */}
          </>
        )}

        {/* In case there are no bots */}
        {bots.length === 0 && !error && (
          <Typography variant="body1" align="center">
            You don't have any bots yet. Upload a file to get started.
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard;

