import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography, Alert, CircularProgress } from '@mui/material';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // To handle the loading state
  const [open, setOpen] = useState(true); // Controls the file upload dialog visibility
  const [fileUploaded, setFileUploaded] = useState(false); // Track if the file has been uploaded successfully
  const [openBotDialog, setOpenBotDialog] = useState(false); // Controls the Bot Management dialog visibility
  const [botName, setBotName] = useState(''); // Bot name state
  const [botError, setBotError] = useState(''); // Bot creation error state
  const [botLoading, setBotLoading] = useState(false); // Loading state for bot creation
  const [fileId, setFileId] = useState(sessionStorage.getItem('fileId')); // Get fileId from sessionStorage
  const navigate = useNavigate();

  // File upload handler
  const handleFileUpload = async () => {
    const userId = sessionStorage.getItem('userId');  // Get userId from sessionStorage

    if (!userId) {
      setError('User not logged in');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);  // Start loading indicator

      // Make the API call to upload the file
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'userId': userId,  // Include user ID in the headers
        },
      });

      // Assuming the response contains the file_id, store it in sessionStorage
      const { file_id } = response.data;  // Replace 'file_id' with whatever key the server sends
      sessionStorage.setItem('fileId', file_id);
      setFileId(file_id);

      // File upload successful, open the Bot Management dialog
      setFileUploaded(true);
      setOpen(false); // Close the file upload dialog
      setOpenBotDialog(true); // Open the Bot Management dialog
    } catch (err) {
      setError('File upload failed');
    } finally {
      setLoading(false);  // Stop loading indicator
    }
  };

  // Bot creation handler
  const handleCreateBot = async () => {
    const userId = sessionStorage.getItem('userId'); // Get the userId from session storage

    if (!userId) {
      setBotError('User not logged in');
      return;
    }

    if (!fileId || !botName) {
      setBotError('Bot name and file ID are required');
      return;
    }

    setBotLoading(true); // Start loading when creating the bot

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

      // On success, navigate to the dashboard or handle any other post-creation action
      navigate('/dashboard');
    } catch (err) {
      setBotError('Failed to create bot');
    } finally {
      setBotLoading(false); // Stop loading after the request is done
    }
  };

  const handleCloseBotDialog = () => {
    setOpenBotDialog(false);
    navigate('/dashboard'); // Optionally navigate to the dashboard or another page
  };

  return (
    <div>
      {/* File Upload Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload CSV File</DialogTitle>
        <DialogContent>
          {/* Display error alert if any */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          {/* File input */}
          <TextField
            type="file"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setFile(e.target.files[0])}
            inputProps={{ accept: ".csv, .pdf, .docx, .xlsx, .xls, .txt" }} // Only allow CSV files
          />

          {/* Display loading spinner while uploading */}
          {loading ? (
            <CircularProgress sx={{ marginTop: 2 }} />
          ) : (
            <Button
              onClick={handleFileUpload}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              disabled={loading} // Disable the button during upload
            >
              Upload
            </Button>
          )}
        </DialogContent>
      </Dialog>

      {/* Bot Management Dialog (will show after file upload is successful) */}
      <Dialog open={openBotDialog} onClose={handleCloseBotDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create a New Bot</DialogTitle>
        <DialogContent>
          <Typography variant="h6" align="center" gutterBottom>
            File uploaded successfully! Now you can create a new bot.
          </Typography>

          {/* Bot Name Input */}
          <TextField
            label="Bot Name"
            variant="outlined"
            fullWidth
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          {/* Display error alert if any */}
          {botError && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {botError}
            </Alert>
          )}

          {/* Create Bot Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleCreateBot}
            startIcon={botLoading ? <CircularProgress size={24} color="inherit" /> : null}
            disabled={botLoading} // Disable while creating the bot
          >
            {botLoading ? 'Creating Bot...' : 'Create Bot'}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBotDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FileUpload;



