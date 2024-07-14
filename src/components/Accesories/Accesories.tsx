import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  StepContent,
  StepLabel,
} from "@mui/material";
import React from "react";
import useAppStore from "src/store/store";

export const Accesories = ({ handleNext, handleBack }: any) => {
  const [setFn] = useAppStore((state) => [state.setFn, state.survey]);
  const [value, setValue] = React.useState<any>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
  };


  const handleSubmit = () => {
    setFn.setOriginalBox(value === "true");
    handleNext();
  };

  return (
    <>
      <StepLabel>¿Incluyes caja original?</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value="true" control={<Radio />} label="Si" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 1, mr: 1 }}
            >
              Continuar
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Atras
            </Button>
          </div>
        </Box>
      </StepContent>
    </>
  );
};
