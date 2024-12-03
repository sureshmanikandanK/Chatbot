// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ChatHistory() {
//   const [history, setHistory] = useState([]);
//   const [fileId, setFileId] = useState('');

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       const userId = sessionStorage.getItem('userId');
//       try {
//         const response = await axios.get('http://localhost:5000/chat/history', {
//           headers: {
//             'userId': userId,
//           },
//           params: {
//             file_id: fileId,
//           },
//         });
//         setHistory(response.data.history);
//       } catch (err) {
//         console.error('Error fetching chat history');
//       }
//     };

//     fetchChatHistory();
//   }, [fileId]);

//   return (
//     <div className="chat-history">
//       <h2>Chat History</h2>
//       <input
//         type="text"
//         placeholder="File ID"
//         value={fileId}
//         onChange={(e) => setFileId(e.target.value)}
//       />
//       <ul>
//         {history.map((entry) => (
//           <li key={entry.id}>{entry.question} - {entry.answer}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ChatHistory;
