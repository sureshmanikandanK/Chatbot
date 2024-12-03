// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

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
//       navigate('/login');
//     } catch (err) {
//       setError('Username already taken');
//     }
//   };

//   return (
//     <div className="register-form">
//       <h2>Register</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       {error && <p>{error}</p>}
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// }

// export default Register;




import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box, Alert, Link } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/register', {
        username,
        password,
      });
      navigate('/login'); // Navigate to login page after successful registration
    } catch (err) {
      setError('Username already taken'); // Handle error (e.g., username already exists)
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Box sx={{ bgcolor: 'background.paper', padding: 3, borderRadius: 2, boxShadow: 3, width: '100%' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}
        
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <Button
          onClick={handleRegister}
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <Typography variant="body2" sx={{ marginRight: 1 }}>
            Already have an account?
          </Typography>
          <Link href="/login" variant="body2" color="primary">
            Login
          </Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
