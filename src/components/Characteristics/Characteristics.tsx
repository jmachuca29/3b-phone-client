import {
  Box,
  Button,
  FormGroup,
  StepContent,
  StepLabel,
  TextField,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  serieNumberRequired: string;
  imeiNumberOneRequired: string;
  imeiNumberTwoRequired: string;
};

export const Characteristics = ({ handleNext, handleBack }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    handleNext()
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepLabel>Serie Number and Imeis</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          <FormGroup>
            <TextField
              id="serieNumber-survey"
              label="Serie Number"
              variant="outlined"
              {...register("serieNumberRequired", { required: true })}
            />
            <TextField
              id="imei_1-survey"
              label="Imei 1"
              variant="outlined"
              {...register("imeiNumberOneRequired", { required: true })}
            />
            <TextField
              id="imei_2-survey"
              label="Imei 2"
              variant="outlined"
              {...register("imeiNumberTwoRequired", { required: true })}
            />
            {errors.imeiNumberTwoRequired && (
              <span>This field is required</span>
            )}
          </FormGroup>
        </Box>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
              Continue
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
          </div>
        </Box>
      </StepContent>
    </form>
  );
};
