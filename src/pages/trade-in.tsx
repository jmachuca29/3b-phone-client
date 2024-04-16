import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { createContext, useState } from "react";
import { Accesories } from "src/components/Accesories/Accesories";
import { Capacity } from "src/components/Capacity/Capacity";
import { Characteristics } from "src/components/Characteristics/Characteristics";
import { Condition } from "src/components/Condition/Condition";
import PaymentType from "src/components/PaymentType/PaymentType";

const steps = [
  {
    label: "Select capacity",
    description: `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`,
    component: <Capacity />,
    continueButton: false,
  },
  {
    label: "Select accesories",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
    component: <Accesories />,
    continueButton: true,
  },
  {
    label: "Serie Number and Imeis",
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    component: <Characteristics />,
    continueButton: true,
  },
  {
    label: "Payment Type",
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    component: <PaymentType />,
    continueButton: true,
  },
  {
    label: "Condition",
    description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    component: <Condition />,
    continueButton: true,
  },
];
export const TradeInContext = createContext<any>(null);

const TradeInPage = () => {
  const [activeStep, setActiveStep] = useState(0);

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
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid xs={12}>
            <Stack direction="row" padding={2}>
              <Stack padding={2}>
                <Stack component="span" alignItems="center">
                  <img
                    src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=242&h=242&fit=crop&auto=format`}
                    loading="lazy"
                  />
                </Stack>
              </Stack>
              <Stack padding={2} justifyContent="center" flexGrow={1}>
                <Typography variant="h6" gutterBottom>
                  Sell your
                </Typography>
                <Typography variant="h4" gutterBottom>
                  iPhone 15 Pro
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid xs={12}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    optional={
                      index === 4 ? (
                        <Typography variant="caption">Last step</Typography>
                      ) : null
                    }
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    <Box sx={{ mb: 2 }}>
                      <TradeInContext.Provider value={handleNext}>
                        {step.component}
                      </TradeInContext.Provider>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <div>
                        {step.continueButton && (
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            {index === steps.length - 1 ? "Finish" : "Continue"}
                          </Button>
                        )}

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
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TradeInPage;
