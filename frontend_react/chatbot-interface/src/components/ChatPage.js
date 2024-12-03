
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Button, TextField, Typography, Box, IconButton, CircularProgress, List, ListItem, ListItemText, Divider, Alert } from '@mui/material';
// import { Send as SendIcon, History as HistoryIcon, Error as ErrorIcon, Upload as UploadIcon, ExpandMore as ExpandMoreIcon, Logout as LogoutIcon } from '@mui/icons-material';
// import { Tooltip } from '@mui/material';

// function ChatPage() {
//   const { botName } = useParams();  // Get the selected bot name from the URL
//   const navigate = useNavigate();  // Hook for navigation
//   const [question, setQuestion] = useState('');
//   const [response, setResponse] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [error, setError] = useState('');
//   const [bots, setBots] = useState([]);
//   const [loading, setLoading] = useState(false);  // Track loading state
//   const [historyPage, setHistoryPage] = useState(1);  // To handle loading history in pages
//   const [hasMoreHistory, setHasMoreHistory] = useState(false);  // Track if there are more chats to load
//   const userId = sessionStorage.getItem('userId'); // Retrieve userId from sessionStorage



//   const handleLogout = () => {
//     sessionStorage.clear();  // Clear session storage
//     navigate('/');  // Redirect to the login page
//   };
//   // Fetch list of bots associated with the user
//   const fetchBots = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/bots', {
//         headers: {
//           'UserId': userId
//         }
//       });
//       setBots(res.data.bots);
//     } catch (err) {
//       setError("Failed to fetch bots.");
//       console.error(err);
//     }
//   };

//   // Fetch chat history for the selected bot with pagination
//   const fetchChatHistory = async (botName, page = 1) => {
//     const bot = bots.find(b => b.bot_name === botName);
//     if (!bot) {
//       setError('Bot not found.');
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/chat/history?file_id=${bot.file_id}&page=${page}`,
//         {
//           headers: {
//             'UserId': userId
//           }
//         }
//       );
      
//       if (page === 1) {
//         setChatHistory(res.data.history); // Set initial chat history
//       } else {
//         setChatHistory((prevHistory) => [...prevHistory, ...res.data.history]); // Append new history
//       }

//       // If there are more history records to load, set hasMoreHistory to true
//       setHasMoreHistory(res.data.history.length >= 10); // Check if we have 10 or more items
//     } catch (err) {
//       setError("Failed to fetch chat history.");
//       console.error(err);
//     }
//   };

//   // Handle sending the question to the bot
//   const handleSendQuestion = async () => {
//     if (!question.trim()) {
//       setError("Please enter a question.");
//       return;
//     }

//     const bot = bots.find(b => b.bot_name === botName);
//     if (!bot) {
//       setError("Invalid bot.");
//       return;
//     }

//     setLoading(true); // Start loading

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/chat', 
//         {
//           question: question,
//           file_id: bot.file_id  // Send the selected bot's file_id
//         },
//         {
//           headers: {
//             'UserId': userId  // Send the userId in the header for authentication
//           }
//         }
//       );
      
//       setResponse(res.data.response); // Set the response from the bot
//       setQuestion(''); // Clear the question input
//       fetchChatHistory(botName); // Refresh chat history after a new message is sent
//     } catch (err) {
//       setError("Failed to send message. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false); // Stop loading when the request is complete
//     }
//   };

//   // Handle selecting a chat history item
//   const handleSelectChat = (selectedQuestion) => {
//     setQuestion(selectedQuestion);  // Set selected chat question in the input
//     setResponse('');  // Clear the previous response
//     handleSendQuestion();  // Trigger bot response based on selected chat
//   };

//   // Navigate to upload page
//   const handleGoToUploadPage = () => {
//     navigate('/upload');  // Navigate to upload page
//   };

//   // Load more history when clicked
//   const handleLoadMoreHistory = () => {
//     setHistoryPage((prevPage) => prevPage + 1);  // Increment page count
//     fetchChatHistory(botName, historyPage + 1); // Fetch next page of history
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchBots();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (botName && bots.length > 0) {
//       fetchChatHistory(botName);  // Fetch initial chat history when botName or bots change
//     }
//   }, [botName, bots]);

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
//       {/* Chat History Section */}
//       <Box
//         sx={{
//           width: 300,
//           borderRight: '1px solid #ccc',
//           padding: 2,
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <Typography variant="h6" sx={{ marginBottom: 2 }}>
//           <HistoryIcon sx={{ marginRight: 1 }} />
//           Chat History
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ marginBottom: 2 }}>
//             <ErrorIcon sx={{ marginRight: 1 }} />
//             {error}
//           </Alert>
//         )}

//         {/* Display chat history */}
//         <List>
//           {chatHistory.length > 0 ? (
//             chatHistory.map((item, index) => (
//               <ListItem
//                 button
//                 key={index}
//                 onClick={() => handleSelectChat(item.question)}
//                 sx={{
//                   padding: 1,
//                   borderBottom: '1px solid #ddd',
//                   '&:hover': {
//                     backgroundColor: '#f0f0f0',
//                   },
//                 }}
//               >
//                 <ListItemText
//                   primary={`Q: ${item.question}`}
//                   secondary={item.response ? `A: ${item.response}` : null}
//                 />
//               </ListItem>
//             ))
//           ) : (
//             <Typography variant="body2" color="textSecondary">No chat history available.</Typography>
//           )}
//         </List>

//         {/* "More" button if there are more than 10 chat items */}
//         {hasMoreHistory && (
//           <Box sx={{ textAlign: 'center', marginTop: 2 }}>
//             <Button
//               variant="outlined"
//               color="primary"
//               endIcon={<ExpandMoreIcon />}
//               onClick={handleLoadMoreHistory}
//               sx={{
//                 borderRadius: 20,
//                 padding: '8px 16px',
//                 fontWeight: 'bold',
//                 '&:hover': {
//                   backgroundColor: '#e0e0e0',
//                   transform: 'scale(1.05)',
//                   transition: 'transform 0.2s ease, background-color 0.3s ease',
//                 },
//               }}
//             >
//               Load More
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* Chat Interface Section */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           padding: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Chat with {botName}
//         </Typography>

//         {/* Display response from bot */}
//         {response && (
//           <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 1, border: '1px solid #ddd', marginBottom: 2 }}>
//             <Typography variant="body1">
//               <strong>Bot:</strong> {response}
//             </Typography>
//           </Box>
//         )}

//         {/* Question input and send button */}
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <TextField
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Ask a question..."
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             sx={{ marginBottom: 2 }}
//           />
//                     <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <IconButton
//               onClick={handleSendQuestion}
//               color="primary"
//               disabled={loading}
//               sx={{
//                 backgroundColor: '#00796b',
//                 color: 'white',
//                 '&:hover': {
//                   backgroundColor: '#004d40',
//                 },
//               }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
//             </IconButton>
//           </Box>
//         </Box>

//         {/* Upload Button */}
//         <Tooltip title="Upload Bot" arrow>
//   <IconButton
//     onClick={handleGoToUploadPage}
//     sx={{
//       position: 'absolute',
//       top: 16,
//       right: 60,
//       backgroundColor: '#00796b',
//       color: 'white',
//       '&:hover': {
//         backgroundColor: '#004d40',
//       },
//     }}
//   >
//     <UploadIcon />
//   </IconButton>
// </Tooltip>

//         {/* Logout Button */}
//         <Tooltip title="LogOut" arrow>
//         <IconButton
//   onClick={handleLogout}
//   sx={{
//     position: 'absolute',
//     top: 16, // Distance from the bottom edge
//     right: 16,  // Distance from the right edge
//     backgroundColor: '#d32f2f', // Red background for logout
//     color: 'white',
//     '&:hover': {
//       backgroundColor: '#b71c1c', // Darker red on hover
//     },
//   }}
// >
//   <LogoutIcon />
// </IconButton>
// </Tooltip>

//       </Box>
//     </Box>
//   );
// }

// export default ChatPage;





// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Button, TextField, Typography, Box, IconButton, CircularProgress, List, ListItem, ListItemText, Divider, Alert } from '@mui/material';
// import { Send as SendIcon, History as HistoryIcon, Error as ErrorIcon, Upload as UploadIcon, ExpandMore as ExpandMoreIcon, Logout as LogoutIcon } from '@mui/icons-material';
// import { Tooltip } from '@mui/material';

// function ChatPage() {
//   const { botName } = useParams();  // Get the selected bot name from the URL
//   const navigate = useNavigate();  // Hook for navigation
//   const [question, setQuestion] = useState('');
//   const [response, setResponse] = useState('');
//   const [chatHistory, setChatHistory] = useState([]);
//   const [error, setError] = useState('');
//   const [bots, setBots] = useState([]);
//   const [loading, setLoading] = useState(false);  // Track loading state
//   const [historyPage, setHistoryPage] = useState(1);  // To handle loading history in pages
//   const [hasMoreHistory, setHasMoreHistory] = useState(false);  // Track if there are more chats to load
//   const userId = sessionStorage.getItem('userId'); // Retrieve userId from sessionStorage

//   const handleLogout = () => {
//     sessionStorage.clear();  // Clear session storage
//     navigate('/');  // Redirect to the login page
//   };

//   // Fetch list of bots associated with the user
//   const fetchBots = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/bots', {
//         headers: {
//           'UserId': userId
//         }
//       });
//       setBots(res.data.bots);
//     } catch (err) {
//       setError("Failed to fetch bots.");
//       console.error(err);
//     }
//   };

//   // Fetch chat history for the selected bot with pagination
//   const fetchChatHistory = async (botName, page = 1) => {
//     const bot = bots.find(b => b.bot_name === botName);
//     if (!bot) {
//       setError('Bot not found.');
//       return;
//     }

//     try {
//       const res = await axios.get(
//         `http://localhost:5000/chat/history?file_id=${bot.file_id}&page=${page}`,
//         {
//           headers: {
//             'UserId': userId
//           }
//         }
//       );
      
//       if (page === 1) {
//         setChatHistory(res.data.history); // Set initial chat history
//       } else {
//         setChatHistory((prevHistory) => [...prevHistory, ...res.data.history]); // Append new history
//       }

//       // If there are more history records to load, set hasMoreHistory to true
//       setHasMoreHistory(res.data.history.length >= 10); // Check if we have 10 or more items
//     } catch (err) {
//       setError("Failed to fetch chat history.");
//       console.error(err);
//     }
//   };

//   // Handle sending the question to the bot
//   const handleSendQuestion = async () => {
//     if (!question.trim()) {
//       setError("Please enter a question.");
//       return;
//     }

//     const bot = bots.find(b => b.bot_name === botName);
//     if (!bot) {
//       setError("Invalid bot.");
//       return;
//     }

//     setLoading(true); // Start loading

//     try {
//       const res = await axios.post(
//         'http://localhost:5000/chat', 
//         {
//           question: question,
//           file_id: bot.file_id  // Send the selected bot's file_id
//         },
//         {
//           headers: {
//             'UserId': userId  // Send the userId in the header for authentication
//           }
//         }
//       );
      
//       setResponse(res.data.response); // Set the response from the bot
//       setQuestion(''); // Clear the question input
//       fetchChatHistory(botName); // Refresh chat history after a new message is sent
//     } catch (err) {
//       setError("Failed to send message. Please try again.");
//       console.error(err);
//     } finally {
//       setLoading(false); // Stop loading when the request is complete
//     }
//   };

//   // Handle selecting a chat history item
//   const handleSelectChat = (selectedQuestion) => {
//     setQuestion(selectedQuestion);  // Set selected chat question in the input
//     setResponse('');  // Clear the previous response
//     handleSendQuestion();  // Trigger bot response based on selected chat
//   };

//   // Navigate to upload page
//   const handleGoToUploadPage = () => {
//     navigate('/upload');  // Navigate to upload page
//   };

//   // Load more history when clicked
//   const handleLoadMoreHistory = () => {
//     setHistoryPage((prevPage) => prevPage + 1);  // Increment page count
//     fetchChatHistory(botName, historyPage + 1); // Fetch next page of history
//   };

//   useEffect(() => {
//     if (userId) {
//       fetchBots();
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (botName && bots.length > 0) {
//       fetchChatHistory(botName);  // Fetch initial chat history when botName or bots change
//     }
//   }, [botName, bots]);

//   return (
//     <Box sx={{ display: 'flex', height: '100vh', position: 'relative' }}>
//       {/* Chat History Section */}
//       <Box
//         sx={{
//           width: 300,
//           borderRight: '1px solid #ccc',
//           padding: 2,
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >
//         <Typography variant="h6" sx={{ marginBottom: 2 }}>
//           <HistoryIcon sx={{ marginRight: 1 }} />
//           Chat History
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ marginBottom: 2 }}>
//             <ErrorIcon sx={{ marginRight: 1 }} />
//             {error}
//           </Alert>
//         )}

//         {/* Display chat history */}
//         <Box sx={{ overflowY: 'auto', flexGrow: 1, paddingBottom: 2 }}>
//           {chatHistory.length > 0 ? (
//             chatHistory.map((item, index) => (
//               <Box key={index} sx={{ display: 'flex', flexDirection: 'column', marginBottom: 2 }}>
//                 {/* User message */}
//                 <Box sx={{ alignSelf: 'flex-start', maxWidth: '80%', backgroundColor: '#f1f1f1', padding: 1, borderRadius: 2 }}>
//                   <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
//                     Q: {item.question}
//                   </Typography>
//                 </Box>

//                 {/* Bot response */}
//                 {item.response && (
//                   <Box sx={{ alignSelf: 'flex-end', maxWidth: '80%', backgroundColor: '#00796b', color: 'white', padding: 1, borderRadius: 2, marginTop: 1 }}>
//                     <Typography variant="body2">
//                       A: {item.response}
//                     </Typography>
//                   </Box>
//                 )}
//               </Box>
//             ))
//           ) : (
//             <Typography variant="body2" color="textSecondary">No chat history available.</Typography>
//           )}
//         </Box>

//         {/* "More" button if there are more than 10 chat items */}
//         {hasMoreHistory && (
//           <Box sx={{ textAlign: 'center', marginTop: 2 }}>
//             <Button
//               variant="outlined"
//               color="primary"
//               endIcon={<ExpandMoreIcon />}
//               onClick={handleLoadMoreHistory}
//               sx={{
//                 borderRadius: 20,
//                 padding: '8px 16px',
//                 fontWeight: 'bold',
//                 '&:hover': {
//                   backgroundColor: '#e0e0e0',
//                   transform: 'scale(1.05)',
//                   transition: 'transform 0.2s ease, background-color 0.3s ease',
//                 },
//               }}
//             >
//               Load More
//             </Button>
//           </Box>
//         )}
//       </Box>

//       {/* Chat Interface Section */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           padding: 3,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Chat with {botName}
//         </Typography>

//         {/* Display response from bot */}
//         {response && (
//           <Box sx={{ padding: 2, backgroundColor: '#f9f9f9', borderRadius: 1, border: '1px solid #ddd', marginBottom: 2 }}>
//             <Typography variant="body1">
//               <strong>Bot:</strong> {response}
//             </Typography>
//           </Box>
//         )}

//         {/* Question input and send button */}
//         <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//           <TextField
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//             placeholder="Ask a question..."
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             sx={{ marginBottom: 2 }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <IconButton
//               onClick={handleSendQuestion}
//               color="primary"
//               disabled={loading}
//               sx={{
//                 backgroundColor: '#00796b',
//                 color: 'white',
//                 '&:hover': {
//                   backgroundColor: '#004d40',
//                 },
//               }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
//             </IconButton>
//           </Box>
//         </Box>

//         {/* Upload Button */}
//         <Tooltip title="Upload Bot" arrow>
//           <IconButton
//             onClick={handleGoToUploadPage}
//             sx={{
//               position: 'absolute',
//               top: 16,
//               right: 60,
//               backgroundColor: '#00796b',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: '#004d40',
//               },
//             }}
//           >
//             <UploadIcon />
//           </IconButton>
//         </Tooltip>

//         {/* Logout Button */}
//         <Tooltip title="LogOut" arrow>
//           <IconButton
//             onClick={handleLogout}
//             sx={{
//               position: 'absolute',
//               top: 16,
//               right: 16,
//               backgroundColor: '#d32f2f',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: '#b71c1c',
//               },
//             }}
//           >
//             <LogoutIcon />
//           </IconButton>
//         </Tooltip>

//       </Box>
//     </Box>
//   );
// }

// export default ChatPage;




import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TextField,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Send as SendIcon,
  Upload as UploadIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

function ChatPage() {
  const { botName } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // Interleaved chat
  const [error, setError] = useState('');
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = sessionStorage.getItem('userId');

  const handleLogout = async () => {
    await saveConversation();
    sessionStorage.clear();
    navigate('/');
  };

  const fetchBots = async () => {
    try {
      const res = await axios.get('http://localhost:5000/bots', {
        headers: { UserId: userId },
      });
      setBots(res.data.bots);
    } catch (err) {
      setError('Failed to fetch bots.');
      console.error(err);
    }
  };

  const fetchChatHistory = async (botName) => {
    const bot = bots.find((b) => b.bot_name === botName);
    if (!bot) {
      setError('Bot not found.');
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/chat/history?file_id=${bot.file_id}`,
        { headers: { UserId: userId } }
      );

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

  const handleSendQuestion = async () => {
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    const bot = bots.find((b) => b.bot_name === botName);
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
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const saveConversation = async () => {
    try {
      await axios.post(
        'http://localhost:5000/chat/save',
        { chatHistory, botName },
        { headers: { UserId: userId } }
      );
    } catch (err) {
      console.error('Failed to save conversation:', err);
    }
  };

  const handleGoToUploadPage = () => navigate('/upload');

  useEffect(() => {
    if (userId) {
      fetchBots();
    }
  }, [userId]);

  useEffect(() => {
    if (botName && bots.length > 0) {
      fetchChatHistory(botName);
    }
  }, [botName, bots]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
        padding: 2,
      }}
    >
      {/* Chat Container */}
      <Box
        sx={{
          width: '60%',
          maxWidth: 800,
          height: '90%',
          backgroundColor: 'white',
          borderRadius: 4,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            padding: 2,
            borderBottom: '1px solid #ddd',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Typography variant="h6">
            Chat with <strong>{botName}</strong>
          </Typography>
        </Box>

        {/* Chat Messages */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
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
                  maxWidth: '75%',
                  padding: 1.5,
                  borderRadius: 2,
                  backgroundColor: message.sender === 'user' ? '#e0e0e0' : '#f1f1f1',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  fontSize: '0.95rem',
                }}
              >
                {message.text}
              </Box>
            </Box>
          ))}
        </Box>

{/* Chat Input */}
<Box
  sx={{
    borderTop: '1px solid #ddd',
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  }}
>
  <TextField
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent adding a new line
        handleSendQuestion(); // Trigger the send function
      }
    }}
    placeholder="Type your message..."
    variant="outlined"
    fullWidth
    multiline
    rows={2}
  />
  <IconButton
    onClick={handleSendQuestion}
    disabled={loading}
    sx={{
      backgroundColor: '#00796b',
      color: 'white',
      '&:hover': {
        backgroundColor: '#005a4d',
      },
    }}
  >
    {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
  </IconButton>
</Box>

      </Box>

      {/* Upload Button */}
      <Tooltip title="Upload Bot" arrow>
        <IconButton
          onClick={handleGoToUploadPage}
          sx={{
            position: 'absolute',
            top: 16,
            right: 60,
            backgroundColor: '#e0e0e0',
            color: '#555',
            '&:hover': {
              backgroundColor: '#c0c0c0',
            },
          }}
        >
          <UploadIcon />
        </IconButton>
      </Tooltip>

      {/* Logout Button */}
      <Tooltip title="LogOut" arrow>
        <IconButton
          onClick={handleLogout}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: '#e57373',
            color: 'white',
            '&:hover': {
              backgroundColor: '#d32f2f',
            },
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default ChatPage;
