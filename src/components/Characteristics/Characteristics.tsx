import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormGroup,
  StepContent,
  StepLabel,
  TextField,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import useAppStore from "src/store/store";

type Inputs = {
  serieNumberRequired: string;
  imeiNumberOneRequired: string;
  imeiNumberTwoRequired: string;
};

export const Characteristics = ({ handleNext, handleBack }: any) => {
  const [setFn, survey] = useAppStore((state) => [state.setFn, state.survey]);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    // watch
  } = useForm<Inputs>({
    defaultValues: {
      serieNumberRequired: survey.serieNumber,
      imeiNumberOneRequired: survey.imei1,
      imeiNumberTwoRequired: survey.imei2
    }
  });

  useEffect(() => {
    setValue('serieNumberRequired', survey.serieNumber);
    setValue('imeiNumberOneRequired', survey.imei1);
    setValue('imeiNumberTwoRequired', survey.imei2);
  }, [survey, setValue]);

  const onSubmit: SubmitHandler<Inputs> = data => {
    setFn.setSerieNumberImei(data.serieNumberRequired, data.imeiNumberOneRequired, data.imeiNumberTwoRequired);
    handleNext();
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
