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
import { getAOrderDetails } from '../../apis/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useState } from 'react';

const steps = [
  {
    label: 'Order Placed',
    stage: "NEW",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Packed',
    stage: "ACCEPTED",
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Dispatched',
    stage: "DISPATCHED",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Shipped',
    stage: "SHIPPED",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Out for Delivery',
    stage: "OUTFORDELIVERY",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
  {
    label: 'Delivered',
    stage: "DELIVERED",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  }
];

export default function Orders() {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  const { orderId } = useParams();

  console.log("orderId - ", orderId);

  const [userOrders, setuserOrders] = useState("");
  const [userDetails, setuserDetails] = useState("");
  const getOrderDetailsFromId = (id) => {
        console.log("id - ", id);
        const token = Cookies.get("TID");
        getAOrderDetails(token, id).then((res) => {
            console.log("A Order Details  NUNUN- ",res);
            setuserOrders(res.data.order);
            setuserDetails(res.data.user);
            switch(res.data.order.orderStatus){
                case "NEW":
                  setActiveStep(0)
                  break;
                case "ACCEPTED":
                  setActiveStep(1)
                  break;
                case "DISPATCHED":
                  setActiveStep(2)
                  break;
                case "SHIPPED":
                  setActiveStep(3)
                  break;
                case "OUTFORDELIVERY":
                  setActiveStep(4)
                  break;
                case "DELIVERED":
                  setActiveStep(5)
                  break;
                default:
                  setActiveStep(0);
                  break;
                }
        }).catch((error) => {
            console.log("Error - ", error);
        });

  }


  useEffect(() => {
        getOrderDetailsFromId(orderId);
  }, [orderId])
  


  if(userOrders)
  return (
    <Fragment>
      <SEO
        titleTemplate={"Orders"}
        description=""
      />
      <LayoutOne headerTop="visible">
        <Container style={{minHeight: "100vh"}}>
    <Box sx={{ maxWidth: 400 }}>
    
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                
                  <Typography variant="caption">{userOrders.createdAt}</Typography>
                
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <div>
              <div>
        <h5>Order ID: {userOrders._id}</h5>
        {userOrders.orderProduct.length > 0 && userOrders.orderProduct.map((pro) => {
            return(
              <>
                <h5>{pro.id}</h5>
                {pro.product.productImages.map((img, index) => {
                    return(
                      <img src={img} height={50} width={50}/>
                    )
                })
                }
                <div>
                  {pro.product.productName}
                  {pro.product.productPrice}
                  <hr></hr>
                  {pro.product.productDiscountPrice} * {pro.qty}
                </div>
                <h5>Total: ₹{pro.orderTotal}</h5>

            </>
            )}
        )}
      <div>
        <h5>Payment Status: {userOrders.paymentMethod}</h5>

        Total Order Amount ₹{userOrders.orderTotal}
      </div>

        
    </div>
              </div>
              <Box sx={{ mb: 2 }}>
                <div>
                  {/* <Button
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
                  </Button> */}
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
  else
  return <p>Loading....
    </p>
}