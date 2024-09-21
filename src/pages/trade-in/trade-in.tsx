import { Container, Stack, Step, Stepper, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Accesories } from "src/components/Accesories/Accesories";
import { Capacity } from "src/components/Capacity/Capacity";
import { Characteristics } from "src/components/Characteristics/Characteristics";
import { Color } from "src/components/Color/Color";
import { Condition } from "src/components/Condition/Condition";
import { MuiPaper } from "src/components/MuiPaper/MuiPaper";
import PaymentType from "src/components/PaymentType/PaymentType";
import useAppStore from "src/store/store";

const TradeInPage = () => {
    const navigate = useNavigate();
    const [currentProduct] = useAppStore((state) => [
        state.currentProduct,
        state.survey,
    ]);
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (Object.keys(currentProduct).length === 0) {
            navigate('/')
        }
    }, [currentProduct])


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid xs={12} sm={4}>
                    <MuiPaper>
                        <Stack padding={2}>
                            <Stack component="span" alignItems="center">
                                <img
                                    src={`${currentProduct?.image?.url}`}
                                    loading="lazy"
                                />
                            </Stack>
                        </Stack>
                        <Stack padding={2} justifyContent="center" flexGrow={1}>
                            <Typography variant="h6" gutterBottom>
                                Vende tu
                            </Typography>
                            <Typography variant="h4" gutterBottom>
                                {currentProduct.description}
                            </Typography>
                        </Stack>
                    </MuiPaper>
                </Grid>
                <Grid xs={12} sm={8}>
                    <Stack padding={2}>
                        <Stepper activeStep={activeStep} orientation="vertical">
                            <Step>
                                <Capacity handleNext={handleNext} />
                            </Step>
                            <Step>
                                <Color handleNext={handleNext} handleBack={handleBack} />
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
