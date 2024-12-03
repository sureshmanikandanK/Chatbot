// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function BotManagement() {
//   const [botName, setBotName] = useState('');
//   // const [fileId, setFileId] = useState('');
//   const [fileId, setFileId] = useState(sessionStorage.getItem('fileId'));
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleCreateBot = async () => {
//     const userId = sessionStorage.getItem('userId'); // Get the userId from session storage

//     if (!userId) {
//       setError('User not logged in');
//       return;
//     }

//     try {
//       // Send a POST request to create the bot, passing the userId in the headers
//       await axios.post('http://localhost:5000/bot-create', {
//         bot_name: botName,
//         file_id: fileId,
//       }, {
//         headers: {
//           'userId': userId, // Include the userId in the headers
//         },
//       });

//       // On success, navigate to the dashboard
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Failed to create bot');
//     }
//   };

//   return (
//     <div className="bot-management">
//       <h2>Create a Bot</h2>
//       <input
//         type="text"
//         placeholder="Bot Name"
//         value={botName}
//         onChange={(e) => setBotName(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="File ID"
//         value={fileId}
//         onChange={(e) => setFileId(e.target.value)}
//       />
//       {error && <p>{error}</p>}
//       <button onClick={handleCreateBot}>Create Bot</button>
//     </div>
//   );
// }

// export default BotManagement;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';
import { Create as CreateIcon } from '@mui/icons-material'; // Create icon for the button

function BotManagement() {
  const [botName, setBotName] = useState('');
  const [fileId, setFileId] = useState(sessionStorage.getItem('fileId'));
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // To handle the loading state for creating bot
  const navigate = useNavigate();

  const handleCreateBot = async () => {
    const userId = sessionStorage.getItem('userId'); // Get the userId from session storage

    if (!userId) {
      setError('User not logged in');
      return;
    }

    setLoading(true); // Start loading when creating the bot

    try {
      // Send a POST request to create the bot, passing the userId and fileId
      await axios.post('http://localhost:5000/bot-create', {
        bot_name: botName,
        file_id: fileId,
      }, {
        headers: {
          'userId': userId, // Include the userId in the headers
        },
      });

      // On success, navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create bot');
    } finally {
      setLoading(false); // Stop loading after the request is done
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f6f8',
        padding: 2
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create a New Bot
        </Typography>

        {/* Display error alert if any */}
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {/* Bot Name Input */}
        <TextField
          label="Bot Name"
          variant="outlined"
          fullWidth
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* File ID Input */}
        <TextField
          label="File ID"
          variant="outlined"
          fullWidth
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
          sx={{ marginBottom: 2 }}
          disabled // Disable since fileId is automatically retrieved from sessionStorage
        />

        {/* Create Bot Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateBot}
          sx={{ marginTop: 2 }}
          startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <CreateIcon />}
          disabled={loading} // Disable while creating the bot
        >
          {loading ? 'Creating Bot...' : 'Create Bot'}
        </Button>
      </Box>
    </Box>
  );
}

export default BotManagement;
