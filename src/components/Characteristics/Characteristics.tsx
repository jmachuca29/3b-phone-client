import { useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
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
  } = useForm<Inputs>({
    defaultValues: {
      serieNumberRequired: survey.serieNumber,
      imeiNumberOneRequired: survey.imei1,
      imeiNumberTwoRequired: survey.imei2,
    },
  });

  useEffect(() => {
    setValue("serieNumberRequired", survey.serieNumber);
    setValue("imeiNumberOneRequired", survey.imei1);
    setValue("imeiNumberTwoRequired", survey.imei2);
  }, [survey, setValue]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setFn.setSerieNumberImei(
      data.serieNumberRequired,
      data.imeiNumberOneRequired,
      data.imeiNumberTwoRequired
    );
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <StepLabel>Datos del equipo</StepLabel>
      <StepContent>
        <Grid container>
          <Grid xs={12} sm={8}>
            <FormGroup sx={{ gap: 2 }}>
              <TextField
                id="serieNumber-survey"
                label="Numero de Serie"
                variant="outlined"
                error={!!errors.serieNumberRequired}
                helperText={errors.serieNumberRequired && 'Numero serie consta de 15 dígitos' }
                {...register("serieNumberRequired", { required: true, minLength: 15, maxLength: 15 })}
              />
              <TextField
                id="imei_1-survey"
                label="Imei 1"
                variant="outlined"
                error={!!errors.imeiNumberOneRequired}
                helperText={errors.imeiNumberOneRequired && 'El IMEI consta de 15 dígitos' }
                {...register("imeiNumberOneRequired", { required: true, minLength: 15, maxLength: 15 })}
              />
              <TextField
                id="imei_2-survey"
                label="Imei 2"
                variant="outlined"
                error={!!errors.imeiNumberTwoRequired}
                helperText={errors.imeiNumberTwoRequired && 'El IMEI consta de 15 dígitos' }
                {...register("imeiNumberTwoRequired", { required: true, minLength: 15, maxLength: 15 })}
              />
            </FormGroup>
          </Grid>
        </Grid>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
              Continuar
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Atras
            </Button>
          </div>
        </Box>
      </StepContent>
    </form>
  );
};
