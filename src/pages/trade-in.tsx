import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Step,
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
          {activeStep !== 5 && (
            <>
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
                  <Step>
                    <Capacity handleNext={handleNext} />
                  </Step>
                  <Step>
                    <Accesories
                      handleNext={handleNext}
                      handleBack={handleBack}
                    />
                  </Step>
                  <Step>
                    <Characteristics
                      handleNext={handleNext}
                      handleBack={handleBack}
                    />
                  </Step>
                  <Step>
                    <PaymentType
                      handleNext={handleNext}
                      handleBack={handleBack}
                    />
                  </Step>
                  <Step>
                    <Condition
                      handleNext={handleNext}
                      handleBack={handleBack}
                    />
                  </Step>
                </Stepper>
              </Grid>
            </>
          )}

          {activeStep === 5 && (
            <Grid xs={12}>
              <Paper square elevation={0} sx={{ p: 3 }}>
                <Typography>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                  Reset
                </Button>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default TradeInPage;
