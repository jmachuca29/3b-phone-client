import { Container, Stack, Step, Stepper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from "react";
import { Accesories } from "src/components/Accesories/Accesories";
import { Capacity } from "src/components/Capacity/Capacity";
import { Characteristics } from "src/components/Characteristics/Characteristics";
import { Condition } from "src/components/Condition/Condition";
import { MuiPaper } from "src/components/MuiPaper/MuiPaper";
import PaymentType from "src/components/PaymentType/PaymentType";
import useAppStore from "src/store/store";

const TradeInPage = () => {
  const [currentProduct] = useAppStore((state) => [
    state.currentProduct,
    state.survey,
  ]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid xs={4}>
          <MuiPaper>
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
                {currentProduct.description}
              </Typography>
            </Stack>
          </MuiPaper>
        </Grid>
        <Grid xs={8}>
            <Stack padding={2}>
              <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                  <Capacity handleNext={handleNext} />
                </Step>
                <Step>
                  <Accesories handleNext={handleNext} handleBack={handleBack} />
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
                  <Condition handleNext={handleNext} handleBack={handleBack} />
                </Step>
              </Stepper>
            </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TradeInPage;