// import React from 'react';
// import { Button, Container, Typography, Box } from '@mui/material';
// import { Login, AppRegistration } from '@mui/icons-material'; // MUI Icons for Sign In and Sign Up
// import { useNavigate } from 'react-router-dom'; // To handle navigation

// function LandingPage() {
//   const navigate = useNavigate();

//   const handleSignIn = () => {
//     navigate('/login'); // Navigate to the sign-in page
//   };

//   const handleSignUp = () => {
//     navigate('/register'); // Navigate to the sign-up page
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'column',
//         textAlign: 'center',
//         backgroundColor: '#f5f5f5',
//       }}
//     >
//       <Box sx={{ mb: 4 }}>
//         <Typography variant="h3" component="h1" color="primary">
//           Welcome to Our Platform
//         </Typography>
//         <Typography variant="h6" color="textSecondary">
//           Please sign in or sign up to get started.
//         </Typography>
//       </Box>

//       <Box>
//         <Button
//           variant="contained"
//           color="primary"
//           size="large"
//           startIcon={<Login />}
//           onClick={handleSignIn}
//           sx={{ width: '200px', height: '50px', fontSize: '16px' }}
//         >
//           Sign In
//         </Button>
//         <Button
//           variant="outlined"
//           color="secondary"
//           size="large"
//           startIcon={<AppRegistration />}
//           onClick={handleSignUp}
//           sx={{ width: '200px', height: '50px', fontSize: '16px' }}
//         >
//           Sign Up
//         </Button>
//       </Box>
//     </Container>
//   );
// }

// export default LandingPage;




import React from 'react';
import { Button, Container, Typography, Box, Grid, Paper } from '@mui/material';
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
      maxWidth="lg"
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #3a8d99, #82c1cc)', // Calm gradient from teal to light cyan
        padding: 3,
        position: 'relative',
      }}
    >
      {/* Floating Illustration (for visual impact) */}
      <Box
        sx={{
          position: 'absolute',
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%',
          transform: 'translateX(-50%)',
          zIndex: -1,
          opacity: 0.2,
        }}
      >
        <img
          src="https://via.placeholder.com/500" // Replace with any engaging illustration or hero image
          alt="hero-illustration"
          style={{ width: '100%', maxWidth: '500px' }}
        />
      </Box>

      {/* Centered Card with Shadows */}
      <Paper
        elevation={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 5,
          borderRadius: 3,
          backgroundColor: '#ffffff',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h3" component="h1" color="primary" sx={{ fontWeight: 'bold', marginBottom: 2, fontFamily: 'Poppins, sans-serif' }}>
          Welcome to Our Platform
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 4, fontFamily: 'Roboto, sans-serif' }}>
          Your journey starts here. Sign in or sign up to begin!
        </Typography>

        {/* Button Grid */}
        <Grid container spacing={3} justifyContent="center">
          {/* Sign In Button */}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<Login fontSize="large" />}
              onClick={handleSignIn}
              sx={{
                width: '250px',
                height: '60px',
                fontSize: '18px',
                boxShadow: 3,
                backgroundColor: '#2a7f89', // Deep teal color for Sign In button
                '&:hover': {
                  backgroundColor: '#1e6e73', // Darker shade on hover
                  boxShadow: '0px 10px 20px rgba(42, 127, 137, 0.3)',
                },
              }}
            >
              Sign In
            </Button>
          </Grid>

          {/* Sign Up Button */}
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<AppRegistration fontSize="large" />}
              onClick={handleSignUp}
              sx={{
                width: '250px',
                height: '60px',
                fontSize: '18px',
                borderColor: '#00bcd4', // Light cyan color for Sign Up button
                color: '#00bcd4',
                '&:hover': {
                  backgroundColor: '#00bcd4', // Cyan background on hover
                  color: 'white',
                  borderColor: '#00bcd4',
                  boxShadow: '0px 10px 20px rgba(0, 188, 212, 0.3)',
                },
              }}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default LandingPage;
