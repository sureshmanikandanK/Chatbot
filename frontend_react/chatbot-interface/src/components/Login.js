// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Container, Box, Alert, Link, Paper } from '@mui/material';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         username,
//         password,
//       });
//       sessionStorage.setItem('userId', response.data.user.userId);  // Save the user ID
//       sessionStorage.setItem('username', response.data.user.username);  // Save the user ID
//       navigate('/chat');
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <Container
//       component="main"
//       maxWidth="lg"
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//         textAlign: 'center',
//         background: 'linear-gradient(135deg, #3a8d99, #82c1cc)', // Calm gradient from teal to light cyan
//         padding: 3,
//         position: 'relative',
//       }}
//     >
//       {/* Adding a subtle texture background */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '50%',
//           height: '50%',
//           background: 'url(https://www.transparenttextures.com/patterns/asfalt-dark.png)', // Subtle texture pattern
//           opacity: 0.1,
//           zIndex: -1, // Ensures the texture stays behind the form
//         }}
//       ></Box>

//       <Paper
//         elevation={12}
//         sx={{
//           padding: 4,
//           borderRadius: 2,
//           width: '50%',
//           boxShadow: 4,
//           backgroundColor: 'white',
//           zIndex: 1,
//         }}
//       >
//         <Typography
//           variant="h4"
//           align="center"
//           gutterBottom
//           sx={{
//             fontWeight: 'bold',
//             color: '#2a7f89', // Title color
//             fontFamily: 'Poppins, sans-serif',
//             textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // Slight shadow for the text
//           }}
//         >
//           Login
//         </Typography>

//         {/* Display error message if any */}
//         {error && (
//           <Alert severity="error" sx={{ marginBottom: 2 }}>
//             {error}
//           </Alert>
//         )}

//         {/* Username input */}
//         <TextField
//           label="Username"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: '#82c1cc', // light cyan border color
//               },
//               '&:hover fieldset': {
//                 borderColor: '#2a7f89', // darker teal color on hover
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: '#2a7f89', // focus color for the input border
//               },
//             },
//           }}
//         />

//         {/* Password input */}
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: '#82c1cc', // light cyan border color
//               },
//               '&:hover fieldset': {
//                 borderColor: '#2a7f89', // darker teal color on hover
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: '#2a7f89', // focus color for the input border
//               },
//             },
//           }}
//         />

//         {/* Login Button */}
//         <Button
//           onClick={handleLogin}
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{
//             marginTop: 2,
//             backgroundColor: '#2a7f89', // deep teal color
//             '&:hover': {
//               backgroundColor: '#1e6e73', // dark teal on hover
//             },
//             fontWeight: 'bold',
//             fontSize: '16px',
//             padding: '12px',
//             borderRadius: 2,
//           }}
//         >
//           Login
//         </Button>

//         {/* Register Link */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
//           <Typography variant="body2" sx={{ marginRight: 1, color: '#2a7f89' }}>
//             Don't have an account?
//           </Typography>
//           <Link href="/register" variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
//             Register
//           </Link>
//         </Box>
//       </Paper>
//     </Container>
//   );
// }

// export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Container, Box, Alert, Paper, Link } from '@mui/material';

// function Login() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/login', {
//         username,
//         password,
//       });
//       sessionStorage.setItem('userId', response.data.user.userId); // Save the user ID
//       sessionStorage.setItem('username', response.data.user.username); // Save the username
//       navigate('/chat');
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <Container
//       component="main"
//       maxWidth="lg"
//       sx={{
//         display: 'flex',
//         minHeight: '100vh',
//       }}
//     > 
//       {/* Left section with Welcome Message */}
//       <Box
//         sx={{
//           flex: 1,
//           backgroundColor: '#00796b',
//           color: '#fff',
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: 3,
//           flexDirection: 'column',
//         }}
//       >
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: 'bold',
//             textAlign: 'center',
//             fontFamily: 'Roboto, sans-serif',
//             marginBottom: 3,
//           }}
//         >
//           Welcome to Chat!
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{
//             textAlign: 'center',
//             fontFamily: 'Roboto, sans-serif',
//             marginBottom: 3,
//             fontWeight: 300,
//           }}
//         >
//           A place to connect, chat, and collaborate. Log in to get started.
//         </Typography>
//         {/* Optional image or logo can be added here */}
//         <Box sx={{ width: '100%', textAlign: 'center' }}>
//           {/* Add a logo or some image here if needed */}
//         </Box>
//       </Box>

//       {/* Right section with the Login Form */}
//       <Box
//         sx={{
//           flex: 1,
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: '#f5f5f5',
//           padding: 4,
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             padding: 4,
//             borderRadius: 4,
//             boxShadow: 8,
//             width: '100%',
//             maxWidth: 400,
//             backgroundColor: '#fff',
//           }}
//         >
//           <Typography
//             variant="h4"
//             align="center"
//             sx={{
//               fontWeight: 600,
//               color: '#00796b',
//               marginBottom: 3,
//               fontFamily: 'Roboto, sans-serif',
//             }}
//           >
//             Sign In
//           </Typography>

//           {/* Display error message */}
//           {error && (
//             <Alert severity="error" sx={{ marginBottom: 2 }}>
//               {error}
//             </Alert>
//           )}

//           {/* Username input */}
//           <TextField
//             label="Username"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '12px', // Rounded corners for the input fields
//                 '& fieldset': {
//                   borderColor: '#8e2de2',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: '#4a00e0',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#4a00e0',
//                 },
//               },
//             }}
//           />

//           {/* Password input */}
//           <TextField
//             label="Password"
//             type="password"
//             variant="outlined"
//             fullWidth
//             margin="normal"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 borderRadius: '12px', // Rounded corners for the input fields
//                 '& fieldset': {
//                   borderColor: '#8e2de2',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: '#4a00e0',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#4a00e0',
//                 },
//               },
//             }}
//           />

//           {/* Login Button */}
//           <Button
//             onClick={handleLogin}
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{
//               marginTop: 3,
//               backgroundColor: '#00796b',
//               '&:hover': {
//                 backgroundColor: '#999999',
//               },
//               fontWeight: 'bold',
//               padding: '12px',
//               borderRadius: 3,
//               fontSize: '16px',
//               textTransform: 'none', // Removing uppercase text transform
//             }}
//           >
//             Login
//           </Button>

//           {/* Register Link */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
//             <Typography variant="body2" sx={{ color: '#4a00e0' }}>
//               Don't have an account?
//             </Typography>
//             <Link href="/register" variant="body2" color="primary" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
//               Register
//             </Link>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }

// export default Login;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert, Paper, Link } from '@mui/material';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  // Validate username
  const validateUsername = () => {
    if (username.trim() === '') {
      setUsernameError('Username is required');
    } else {
      setUsernameError('');
    }
  };

  // Validate password
  const validatePassword = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const handleLogin = async () => {
    // Reset previous errors
    setError('');
    validateUsername();
    validatePassword();

    // If there are errors, don't submit
    if (usernameError || passwordError) {
      return;
    }

    try {
      // Attempt to login
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      // If login is successful, store user data and navigate
      sessionStorage.setItem('userId', response.data.user.userId); // Save the user ID
      sessionStorage.setItem('username', response.data.user.username); // Save the username
      navigate('/chat'); // Navigate to the chat page after successful login
    } catch (err) {
      // Check if the error response has a specific message, and set a more detailed error
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Set the server-provided error message
      } else {
        setError('Incorrect username or password. Please try again.'); // Default error message
      }
    }
  };

  // Disable the Login button if there are any errors
  const isFormInvalid = usernameError || passwordError || !username || !password;

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        display: 'flex',
        minHeight: '100vh',
      }}
    >
      {/* Left section with Welcome Message */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#00796b',
          color: '#fff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 3,
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            marginBottom: 3,
          }}
        >
          Welcome to Chat!
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            marginBottom: 3,
            fontWeight: 300,
          }}
        >
          A place to connect, chat, and collaborate. Log in to get started.
        </Typography>
      </Box>

      {/* Right section with the Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: 4,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 4,
            boxShadow: 8,
            width: '100%',
            maxWidth: 400,
            backgroundColor: '#fff',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 600,
              color: '#00796b',
              marginBottom: 3,
              fontFamily: 'Roboto, sans-serif',
            }}
          >
            Sign In
          </Typography>

          {/* Display error message */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          {/* Username input */}
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={validateUsername} // Validate on blur
            error={!!usernameError}
            helperText={usernameError}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#8e2de2',
                },
                '&:hover fieldset': {
                  borderColor: '#4a00e0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4a00e0',
                },
              },
            }}
          />

          {/* Password input */}
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword} // Validate on blur
            error={!!passwordError}
            helperText={passwordError}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                '& fieldset': {
                  borderColor: '#8e2de2',
                },
                '&:hover fieldset': {
                  borderColor: '#4a00e0',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4a00e0',
                },
              },
            }}
          />

          {/* Login Button */}
          <Button
            onClick={handleLogin}
            variant="contained"
            color="primary"
            fullWidth
            disabled={isFormInvalid} // Disable if form is invalid
            sx={{
              marginTop: 3,
              backgroundColor: '#00796b',
              '&:hover': {
                backgroundColor: '#999999',
              },
              fontWeight: 'bold',
              padding: '12px',
              borderRadius: 3,
              fontSize: '16px',
              textTransform: 'none', // Removing uppercase text transform
            }}
          >
            Login
          </Button>

          {/* Register Link */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Typography variant="body2" sx={{ color: '#4a00e0' }}>
              Don't have an account?
            </Typography>
            <Link href="/register" variant="body2" color="primary" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
              Register
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
