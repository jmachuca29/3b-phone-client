import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Step,
  Stepper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accesories } from "src/components/Accesories/Accesories";
import { Capacity } from "src/components/Capacity/Capacity";
import { Characteristics } from "src/components/Characteristics/Characteristics";
import { Condition } from "src/components/Condition/Condition";
import PaymentType from "src/components/PaymentType/PaymentType";
import useAppStore from "src/store/store";

export const TradeInContext = createContext<any>(null);

const TradeInPage = () => {

  const navigate = useNavigate();

  const [product, survey] = useAppStore((state) => [state.product, state.survey]);

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                      { product.description }
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
              <Card sx={{ display: "flex" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image="/static/images/cards/live-from-space.jpg"
                  alt="Live from space album cover"
                />
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                    { product.description }
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Grado { survey.condition } - { survey.capacity } - { survey.paymentType }
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      500 $
                    </Typography>
                    <Button variant="contained" sx={{ mt: 1, mr: 1 }} onClick={ ()=> navigate('/checkout') }>
                      Checkout
                    </Button>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default TradeInPage;
