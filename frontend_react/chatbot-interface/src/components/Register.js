// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { TextField, Button, Typography, Container, Box, Alert, Paper, Link } from '@mui/material';

// function Register() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       await axios.post('http://localhost:5000/register', {
//         username,
//         password,
//       });
//       navigate('/login'); // Navigate to login page after successful registration
//     } catch (err) {
//       setError('Username already taken'); // Handle error (e.g., username already exists)
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
//           Register now to start chatting and connecting with others.
//         </Typography>
//         {/* Optional image or logo can be added here */}
//         <Box sx={{ width: '100%', textAlign: 'center' }}>
//           {/* Add a logo or some image here if needed */}
//         </Box>
//       </Box>

//       {/* Right section with the Register Form */}
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
//             Sign Up
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

//           {/* Register Button */}
//           <Button
//             onClick={handleRegister}
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
//             Register
//           </Button>

//           {/* Login Link */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
//             <Typography variant="body2" sx={{ color: '#4a00e0' }}>
//               Already have an account?
//             </Typography>
//             <Link href="/login" variant="body2" color="primary" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
//               Login
//             </Link>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }

// export default Register;



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert, Paper, Link } from '@mui/material';

function Register() {
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
    } else if (username.trim().length < 3) {
      setUsernameError('Username must be at least 3 characters');
    } else {
      setUsernameError('');
    }
  };

  // Validate password
  const validatePassword = () => {
    if (password.trim() === '') {
      setPasswordError('Password is required');
    } else if (password.trim().length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleRegister = async () => {
    // Reset previous errors
    setError('');
    validateUsername();
    validatePassword();

    // If there are errors, don't submit
    if (usernameError || passwordError) {
      return;
    }

    try {
      // Attempt to register the user
      await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      navigate('/login'); // Navigate to login page after successful registration
    } catch (err) {
      setError('Username already registered'); // Handle error (e.g., username already exists)
    }
  };

  // Disable the Register button if there are any errors
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
          Register now to start chatting and connecting with others.
        </Typography>
      </Box>

      {/* Right section with the Register Form */}
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
            Sign Up
          </Typography>

          {/* Display general error message */}
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
            onBlur={validateUsername}
            error={!!usernameError}
            helperText={usernameError}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px', // Rounded corners for the input fields
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
            onBlur={validatePassword}
            error={!!passwordError}
            helperText={passwordError}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px', // Rounded corners for the input fields
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

          {/* Register Button */}
          <Button
            onClick={handleRegister}
            variant="contained"
            color="primary"
            fullWidth
            disabled={isFormInvalid}  // Disable if form is invalid
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
            Register
          </Button>

          {/* Login Link */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Typography variant="body2" sx={{ color: '#4a00e0' }}>
              Already have an account?
            </Typography>
            <Link href="/login" variant="body2" color="primary" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
              Login
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;
