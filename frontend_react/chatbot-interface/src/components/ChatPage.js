// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import {
//   TextField,
//   Box,
//   IconButton,
//   CircularProgress,
//   Tooltip,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Typography,
//   Alert,
// } from '@mui/material';
// import {
//   Send as SendIcon,
//   Upload as UploadIcon,
//   Logout as LogoutIcon,
//   Chat as ChatIcon
//   // Edit as EditIcon,
// } from '@mui/icons-material';

// function ChatPage() {
//   const { botName } = useParams();
//   const navigate = useNavigate();
//   const [question, setQuestion] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [error, setError] = useState('');
//   const [bots, setBots] = useState([]);
//   const [selectedBot, setSelectedBot] = useState(''); // Initially empty
//   const [loading, setLoading] = useState(false);
//   const userId = sessionStorage.getItem('userId');

//   const fetchBots = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/bots', {
//         headers: { UserId: userId },
//       });
//       setBots(res.data.bots);

//       // Select the first bot automatically if bots are available
//       if (res.data.bots.length > 0) {
//         const firstBot = res.data.bots[0].bot_name;
//         setSelectedBot(firstBot); // Automatically set the first bot
//       }
//     } catch (err) {
//       setError('Failed to fetch bots.');
//       console.error(err);
//     }
//   };

//   const fetchChatHistory = async (botName) => {
//     const bot = bots.find((b) => b.bot_name === botName);
//     if (!bot) {
//       setError('Bot not found.');
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/chat/history?file_id=${bot.file_id}`,
//         { headers: { UserId: userId } }
//       );
//       const formattedHistory = res.data.history.flatMap((item) => [
//         { sender: 'user', text: item.question },
//         { sender: 'bot', text: item.response },
//       ]);

//       setChatHistory(formattedHistory);
//     } catch (err) {
//       setError('Failed to fetch chat history.');
//       console.error(err);
//     }
//   };

//   const handleSendQuestion = async () => {
//     if (!selectedBot) {
//       setError('Please select a bot first.');
//       return;
//     }

//     if (!question.trim()) {
//       setError('Please enter a question.');
//       return;
//     }

//     const bot = bots.find((b) => b.bot_name === selectedBot);
//     if (!bot) {
//       setError('Invalid bot.');
//       return;
//     }

//     const userMessage = { sender: 'user', text: question };
//     setChatHistory((prev) => [...prev, userMessage]);

//     setLoading(true);

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/chat',
//         { question, file_id: bot.file_id },
//         { headers: { UserId: userId } }
//       );

//       const botMessage = { sender: 'bot', text: res.data.response };
//       setChatHistory((prev) => [...prev, botMessage]);
//       setQuestion('');
//       setError(''); // Clear error after sending the message successfully
//     } catch (err) {
//       setError('Failed to send message. Please try again.');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await saveConversation();
//     sessionStorage.clear();
//     navigate('/');
//   };

//   const saveConversation = async () => {
//     try {
//       await axios.post(
//         'http://localhost:5000/chat/history',
//         { chatHistory, botName: selectedBot },
//         { headers: { UserId: userId } }
//       );
//     } catch (err) {
//       console.error('Failed to save conversation:', err);
//     }
//   };

//   const handleGoToUploadPage = () => navigate('/upload');

//   useEffect(() => {
//     if (userId) {
//       fetchBots();
//     }
//   }, [userId]);

//   useEffect(() => {
//     // Fetch chat history only if a bot is selected and bots have been loaded
//     if (selectedBot && bots.length > 0) {
//       fetchChatHistory(selectedBot);
//     }
//   }, [selectedBot, bots]); // Trigger this effect when selectedBot or bots change

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         height: '100vh',
//         backgroundColor: '#f7f7f7',
//       }}
//     >
//       {/* Left Sidebar - List of Bots */}
//       <Box
//         sx={{
//           width: '300px',
//           height: '100%',
//           backgroundColor: '#fff',
//           padding: '16px',
//           borderRight: '1px solid #ddd',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         {/* Available Bots Header and Upload Button */}
//         <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//             Available Bots
//           </Typography>
//           <Tooltip title="Upload Bot" arrow>
//             <IconButton
//               onClick={handleGoToUploadPage}
//               sx={{
//                 backgroundColor: '#00796b',
//                 color: 'white',
//                 '&:hover': {
//                   backgroundColor: '#005a4d',
//                 },
//               }}
//             >
//               <UploadIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>

//         <Divider sx={{ marginBottom: 2 }} />

        // <List>
        //   {bots.map((bot) => (
        //     <ListItem
        //       button
        //       key={bot.id}
        //       onClick={() => {
        //         setSelectedBot(bot.bot_name);
        //         fetchChatHistory(bot.bot_name);
        //         setError('');
        //       }}
        //       sx={{
        //         padding: '10px 16px',
        //         backgroundColor: selectedBot === bot.bot_name ? '#00796b' : 'transparent',
        //         color: selectedBot === bot.bot_name ? 'white' : 'black',
        //         borderRadius: '8px',
        //         boxShadow: selectedBot === bot.bot_name ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
        //         marginBottom: '10px',
        //         display: 'flex',
        //         alignItems: 'center',
        //         '&:hover': {
        //           backgroundColor: '#999999',
        //         },
        //       }}
        //     >
        //       <IconButton sx={{ marginRight: 2 }}>
        //       <ChatIcon sx={{ color: selectedBot === bot.bot_name ? 'white' : 'black' }} /> {/* Changed to Chat Icon */}
        //       </IconButton>
        //       <ListItemText primary={bot.bot_name} />
        //     </ListItem>
        //   ))}
        // </List>
//       </Box>

//       {/* Right Side - Chat Area */}
//       <Box
//         sx={{
//           width: 'calc(100% - 300px)', // Adjust the width based on the left section
//           height: '100%',
//           backgroundColor: 'white',
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         {/* Top Bar */}
//         <Box
//           sx={{
//             padding: '16px',
//             backgroundColor: '#fff',
//             color: '#222',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             fontWeight: 600,
//           }}
//         >
//           <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//             Chat with {selectedBot || 'Select a Bot'}
//           </Typography>

//           <Box>
//             <Tooltip title="LogOut" arrow>
//               <IconButton
//                 onClick={handleLogout}
//                 sx={{
//                   color: 'black',
//                 }}
//               >
//                 <LogoutIcon />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         </Box>

//         {/* Error Message */}
//         {error && (
//           <Alert
//             severity="error"
//             sx={{
//               position: 'absolute',
//               top: 70,
//               left: 0,
//               right: 0,
//               margin: '0 16px',
//             }}
//           >
//             {error}
//           </Alert>
//         )}

//         <Divider sx={{ marginBottom: 2 }} />

//         {/* Chat Messages */}
//         <Box
//           sx={{
//             flexGrow: 1,
//             overflowY: 'auto',
//             padding: '16px',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: 2,
//           }}
//         >
//           {chatHistory.map((message, index) => (
            // <Box
            //   key={index}
            //   sx={{
            //     display: 'flex',
            //     justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            //   }}
            // >
            //   <Box
            //     sx={{
            //       maxWidth: '75%',
            //       padding: '12px',
            //       borderRadius: '16px',
            //       backgroundColor: message.sender === 'user' ? '#00796b' : '#f1f1f1',
            //       color: message.sender === 'user' ? 'white' : 'black',
            //       boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
            //       fontSize: '0.95rem',
            //     }}
            //   >
            //     {message.text}
            //   </Box>
            // </Box>
//           ))}
//           {loading && (
//             <Box sx={{ textAlign: 'center' }}>
//               <CircularProgress />
//             </Box>
//           )}
//         </Box>

//         {/* Input Section */}
        // <Box
        //   sx={{
        //     display: 'flex',
        //     alignItems: 'center',
        //     padding: '16px',
        //     backgroundColor: '#fff',
        //     borderTop: '1px solid #ddd',
        //   }}
        // >
        //   <TextField
        //     variant="outlined"
        //     placeholder="Ask a question..."
        //     fullWidth
        //     value={question}
        //     onChange={(e) => setQuestion(e.target.value)}
        //     disabled={loading}
        //     sx={{ marginRight: 2 }}
        //   />
        //   <IconButton
        //     color="primary"
        //     onClick={handleSendQuestion}
        //     disabled={loading}
        //   >
        //     <SendIcon />
        //   </IconButton>
        // </Box>
//       </Box>
//     </Box>
//   );
// }

// export default ChatPage;



import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import {
  TextField,
  Box,
  IconButton,
  CircularProgress,
  Tooltip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import {
  Send as SendIcon,
  Upload as UploadIcon,
  Logout as LogoutIcon,
  Chat as ChatIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';

function ChatPage() {
  const { botName } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');
  const [bots, setBots] = useState([]);
  const [selectedBot, setSelectedBot] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileUploadModalOpen, setFileUploadModalOpen] = useState(false);
  const [botCreationModalOpen, setBotCreationModalOpen] = useState(false); // Separate modal for bot creation
  const [file, setFile] = useState(null);
  const [botNameInput, setBotNameInput] = useState('');
  const [fileId, setFileId] = useState(null);
  const [botError, setBotError] = useState('');
  const [botLoading, setBotLoading] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const username = sessionStorage.getItem('username');
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  // const fileId = bot.file_id;

  const fetchBots = async () => {
    try {
      const res = await axios.get('http://localhost:5000/bots', {
        headers: { UserId: userId },
      });
      setBots(res.data.bots);

      if (res.data.bots.length > 0) {
        const firstBot = res.data.bots[0].bot_name;
        setSelectedBot(firstBot);
      }
    } catch (err) {
      setError('Failed to fetch bots.');
      console.error(err);
    }
  };
  

  const fetchChatHistory = async (botName) => {
    const bot = bots.find((b) => b.bot_name === botName);
    console.log("bot : ",bot)
    if (!bot) {
      setError('Bot not found.');
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/chat/history?file_id=${bot.file_id}`,
        { headers: { UserId: userId } }
      
      );
      setFileId(bot.file_id)
      const formattedHistory = res.data.history.flatMap((item) => [
        { sender: 'user', text: item.question },
        { sender: 'bot', text: item.response },
      ]);
      setChatHistory(formattedHistory);
    } catch (err) {
      setError('Failed to fetch chat history.');
      console.error(err);
    }
  };

  const handleDeleteChatHistory = async (botId) => {
    console.log("botId: ",botId)
    try {
        // Send a DELETE request to the backend with the botId (file_id) as a query parameter
        const response = await axios.delete(`http://localhost:5000/chat/history/${botId}`, {
            headers: { UserId: userId }, // Pass UserId in the headers
            params: { file_id: botId }, // Sending botId (file_id) as query parameter
        });

        // After successful deletion, clear the chat history in the frontend
        if (selectedBot === botId) {
            setChatHistory([]); // Clear the current chat history in the UI
        }

        setError(''); // Reset any error
        alert("Chat history deleted successfully.");
        window.location.reload(); // Show success message
    } catch (err) {
        setError('Failed to delete chat history.');
        console.error(err);
    }
};



  const handleSendQuestion = async () => {
    if (!selectedBot) {
      setError('Please select a bot first.');
      return;
    }

    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    const bot = bots.find((b) => b.bot_name === selectedBot);
    if (!bot) {
      setError('Invalid bot.');
      return;
    }

    const userMessage = { sender: 'user', text: question };
    setChatHistory((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await axios.post(
        'http://localhost:5000/chat',
        { question, file_id: bot.file_id },
        { headers: { UserId: userId } }
      );

      const botMessage = { sender: 'bot', text: res.data.response };
      setChatHistory((prev) => [...prev, botMessage]);
      setQuestion('');
      setError('');
      setFileId(bot.file_id)
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = async () => {
  //   sessionStorage.clear();
  //   navigate('/');
  // };


  const handleLogout = async () => {
    try {
      sessionStorage.clear(); // Clear session storage
      navigate('/login'); // Redirect to the home page or any page you prefer after logout
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Function to open the logout confirmation dialog
  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  // Function to close the logout confirmation dialog
  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleGoToUploadPage = () => {
    setFileUploadModalOpen(true); // Open file upload modal
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'userId': userId,
        },
      });

      const { file_id } = response.data;
      setFileId(file_id);

      // Open the bot creation modal after successful file upload
      setFileUploadModalOpen(false);
      setBotCreationModalOpen(true);
    } catch (err) {
      setError('File upload failed');
    } finally {
      setLoading(false);
    }
  };


  const handleCreateBot = async () => {
    if (!botNameInput || !fileId) {
      setBotError('Bot name and file ID are required');
      return;
    }

    setBotLoading(true);

    try {
      await axios.post('http://localhost:5000/bot-create', {
        bot_name: botNameInput,
        file_id: fileId,
      }, {
        headers: {
          'userId': userId,
        },
      });

      // Close the bot creation modal and navigate after successful bot creation
      setBotCreationModalOpen(false);
      window.location.reload();
      
    } catch (err) {
      setBotError('Failed to create bot');
    } finally {
      setBotLoading(false);
    }
  };


  const handleDeleteBot = async (botId) => {
    console.log('Bot ID:', botId); // Log the botId
  
    if (!botId) {
      setError('Invalid Bot ID');
      return; // Prevent API call if botId is invalid
    }
  
    try {
      // Send DELETE request to the backend with botId (file_id)
      const response = await axios.delete(`http://localhost:5000/bot-delete?file_id=${botId}`, {
        headers: { UserId: userId },
      });
  
      // Assuming the response is correct and includes a success message
      setBots((prevBots) => prevBots.filter((bot) => bot.file_id !== botId));
  
      // If the bot being deleted is the selected bot, clear the chat
      if (selectedBot === botId) {
        setSelectedBot('');
        setChatHistory([]);
      }
  
      setError(''); // Reset any error
      alert('Bot deleted successfully.');
      window.location.reload();
    } catch (err) {
      setError('Failed to delete the bot.');
      console.error(err);
    }
  };
  
  


  useEffect(() => {
    if (userId) {
      fetchBots();
    }
  }, [userId]);

  useEffect(() => {
    if (selectedBot) {
      setChatHistory([]);
      setError('');
      setQuestion('');
      fetchChatHistory(selectedBot);
    }
  }, [selectedBot, bots]);

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f7f7f7' }}>
      {/* Left Sidebar - List of Bots */}
      <Box sx={{ width: '300px', height: '100%', backgroundColor: '#fff', padding: '16px', borderRight: '1px solid #ddd' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 900 }}>Available Bots</Typography>
          <Tooltip title="Create Bot" arrow>
            <IconButton onClick={handleGoToUploadPage} sx={{ backgroundColor: 'primary', color: 'black',
              '&:hover': {
            backgroundColor: '#00796b', // Set background color to red when hovered
          },
             }}>
              <UploadIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider sx={{ marginBottom: 2 }} />
        
        <List>
  {bots.length === 0 ? (
    <ListItem>
      <ListItemText primary="No bots available" />
    </ListItem>
  ) : (
    bots.map((bot) => (
      <ListItem
        button
        key={bot.id}
        onClick={() => {
          setSelectedBot(bot.bot_name);
          fetchChatHistory(bot.bot_name);
          setError('');
        }}
        sx={{
          padding: '10px 16px',
          backgroundColor: selectedBot === bot.bot_name ? '#00796b' : 'transparent',
          color: selectedBot === bot.bot_name ? 'white' : 'black',
          borderRadius: '8px',
          boxShadow: selectedBot === bot.bot_name ? '0 4px 10px rgba(0, 0, 0, 0.2)' : 'none',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#999999',
          },
        }}
      >
        <IconButton sx={{ marginRight: 2 }}>
          <ChatIcon sx={{ color: selectedBot === bot.bot_name ? 'white' : 'black' }} />
        </IconButton>
        <ListItemText primary={bot.bot_name} />
        <IconButton
  onClick={(e) => {
    e.stopPropagation(); // Prevent triggering the item selection on delete
    console.log('Deleting bot:', bot.file_id); // Log the bot ID when the delete button is clicked
    handleDeleteBot(bot.file_id); // Pass the bot's file_id to the delete handler
  }}
  sx={{
    marginLeft: 'auto',
    color: 'red', // Set delete button color to red
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  }}
>
  <DeleteIcon />
</IconButton>

      </ListItem>
    ))
  )}
</List>



      </Box>

      {/* Right Side - Chat Area */}
      <Box sx={{ width: 'calc(100% - 300px)', height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ padding: '16px', backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{flexGrow: 1, fontWeight: 900 }} >Chat with {selectedBot || 'Select a Bot'}</Typography>
          
          <Tooltip title={username ? `${username}` : 'User not logged in'} arrow>
      <IconButton
        sx={{
          // marginRight: 'px',
          '&:hover': {
            backgroundColor: 'lightblue', // Set background color to light blue when hovered
          },
        }}
      >
        <AccountCircleIcon />
      </IconButton>
    </Tooltip>
          <Tooltip title="LogOut" arrow>
            {/* <IconButton onClick={handleLogout}><LogoutIcon /></IconButton> */}
            <IconButton
        onClick={handleOpenLogoutDialog}
        sx={{
          '&:hover': {
            backgroundColor: 'red', // Set background color to red when hovered
          },
        }}
      >
        <LogoutIcon />
      </IconButton>

      

      {/* Logout Confirmation Dialog */}
      <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          Are you sure you want to log out?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="secondary">
            No
          </Button>
          <Button
            onClick={() => {
              handleLogout(); // Trigger the logout
              handleCloseLogoutDialog(); // Close the dialog
            }}
            color="primary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

          </Tooltip>
        </Box>

        {error && <Alert severity="error">{error}</Alert>}

        <Divider sx={{ marginBottom: 2 }} />

        <Box sx={{ flexGrow: 1, overflowY: 'auto', padding: '16px' }}>
          {chatHistory.map((message, index) => (
            <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Box
              sx={{
                maxWidth: '70%',
                padding: '12px',
                borderRadius: '16px',
                backgroundColor: message.sender === 'user' ? '#00796b' : '#f1f1f1',
                color: message.sender === 'user' ? 'white' : 'black',
                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
                fontSize: '0.95rem',
              }}
            >
              {message.text}
            </Box>
          </Box>
          ))}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          )}
        </Box>

        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#fff',
    borderTop: '1px solid #ddd',
  }}
><TextField
  variant="outlined"
  placeholder="Ask a question..."
  fullWidth
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  disabled={loading}
  sx={{ marginRight: 2 }}
/>
<IconButton
  sx={{
    marginLeft: -2,
    color: '#00796b',
    '&:hover': {
      background: '#87CEEB',
    },
  }} // Custom color for the IconButton
  onClick={handleSendQuestion}
  disabled={loading}
>
  <SendIcon />
</IconButton>

<Tooltip title="Delete Chat History" arrow>
  <Button
    color="red"
    startIcon={<DeleteIcon />}
    onClick={() => handleDeleteChatHistory(fileId)}  // Pass function reference
    disabled={loading}
    sx={{
      marginLeft: -2,
      color: "red", // Adds spacing between the buttons
    }}
  >
  </Button>
</Tooltip>


</Box>

      </Box>

      

      {/* File Upload Modal */}
      <Dialog open={fileUploadModalOpen} onClose={() => setFileUploadModalOpen(false)}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          {loading && <CircularProgress sx={{ display: 'block', marginTop: 2 }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFileUploadModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFileUpload} color="primary" disabled={loading}>
            Upload
          </Button>
        </DialogActions>
      </Dialog>

      {/* Bot Creation Modal */}
      <Dialog open={botCreationModalOpen} onClose={() => setBotCreationModalOpen(false)}>
        <DialogTitle>Create Bot</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Bot Name"
            value={botNameInput}
            onChange={(e) => setBotNameInput(e.target.value)}
          />
          {botError && <Alert severity="error">{botError}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBotCreationModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateBot} color="primary" disabled={botLoading}>
            {botLoading ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ChatPage;







