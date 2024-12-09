// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// // import Register from './Register';
// import Register from './components/Register';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';
// import FileUpload from './components/FileUpload';
// import BotManagement from './components/BotManagement';
// import ChatHistory from './components/ChatHistory';
// // import ChatPage from './components/ChatPage';
// import ChatPage from './components/ChatPage';
// import LandingPage from './components/LandingPage';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/Register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/Chat" element={<ChatPage />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/upload" element={<FileUpload />} />
//         <Route path="/bots" element={<BotManagement />} />
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/chat-history" element={<ChatHistory />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
// import Register from './Register';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FileUpload from './components/FileUpload';
import BotManagement from './components/BotManagement';
import ChatHistory from './components/ChatHistory';
// import ChatPage from './components/ChatPage';
import ChatPage from './components/ChatPage';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/Chat" element={<PrivateRoute element={<ChatPage />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/upload" element={<PrivateRoute element={<FileUpload />} />} />
        <Route path="/bots" element={<PrivateRoute element={<BotManagement />} />} />
        <Route path="/chat-history" element={<PrivateRoute element={<ChatHistory />} />} />
        
        {/* Public Route */}
        {/* <Route path="/" element={<LandingPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
