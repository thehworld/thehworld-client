import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import SEO from '../../components/seo';
import LayoutOne from '../../layouts/LayoutOne';
import { Container } from 'react-bootstrap';

const steps = [
  {
    label: 'Order Placed',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Packed',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Dispatched',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Shipped',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Out for Delivery',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Delivered',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  }
];

export default function Orders() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Fragment>
      <SEO
        titleTemplate={"Orders"}
        description=""
      />
      <LayoutOne headerTop="visible">
        <Container style={{minHeight: "100vh"}}>
    <Box sx={{ maxWidth: 400 }}>
    <div>
        <h5>Order ID: 5858214</h5>
        <h5>Products: Hair Serum (2nos)</h5>
        <h5>Total: ₹599</h5>
        <h5>Payment Status: Cash on delivery</h5>

        
    </div>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                
                  <Typography variant="caption">15:23, 08 Mon 2023</Typography>
                
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Embrace nature's touch with The H World, Elevating your beauty from within.</Typography>
          {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button> */}
        </Paper>
      )}
    </Box>
    </Container>
    </LayoutOne>
    </Fragment>
  );
}