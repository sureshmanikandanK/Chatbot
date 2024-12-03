import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { Login, AppRegistration } from '@mui/icons-material'; // MUI Icons for Sign In and Sign Up
import { useNavigate } from 'react-router-dom'; // To handle navigation

function LandingPage() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login'); // Navigate to the sign-in page
  };

  const handleSignUp = () => {
    navigate('/register'); // Navigate to the sign-up page
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" color="primary">
          Welcome to Our Platform
        </Typography>
        <Typography variant="h6" color="textSecondary">
          Please sign in or sign up to get started.
        </Typography>
      </Box>

      <Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Login />}
          onClick={handleSignIn}
          sx={{ width: '200px', height: '50px', fontSize: '16px' }}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          startIcon={<AppRegistration />}
          onClick={handleSignUp}
          sx={{ width: '200px', height: '50px', fontSize: '16px' }}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default LandingPage;
