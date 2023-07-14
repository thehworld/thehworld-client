import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import Lottie from 'lottie-react';


import Button from '@mui/material/Button';
import { Link, useNavigate } from "react-router-dom";
import successAnimation from './successAnimation.json';


const PaymentSuccessPage = () => {
  const theme = useTheme();

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const navigate = useNavigate();
  
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Lottie
        options={lottieOptions}
        height={180}
        width={180}
        animationData={successAnimation}
        style={{ marginBottom: '2rem' }}
      />
      <Typography variant="h4" sx={{ color: green[500], marginBottom: '1rem' }}>
        Payment Successful!
      </Typography>
      <Typography variant="body1" style={{
        margin:15,
        textAlign:'center'
      }}>
        Thank you for your purchase in <b>The H World</b>. Your payment was successfully processed.
      </Typography>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '8px',
      }}
    >
<Button
      onClick={() => navigate("/")}
        style={{
          marginTop:2,
          width:'100%',
          borderRadius:1000,
          justifyContent:'center',
          alignItems:'center',
          textAlign:'center'
        }}
        variant="contained"
        sx={{ bgcolor: green[700], '&:hover': { bgcolor: green[1000] } }}
      >
        To Order
        </Button>
    </Box>
    </Box>
  );
};

export default PaymentSuccessPage;