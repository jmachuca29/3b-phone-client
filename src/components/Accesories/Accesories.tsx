import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  StepContent,
  StepLabel,
} from "@mui/material";
import React, { useState } from "react";
import useAppStore from "src/store/store";

const accesoriesList = ["ORIGINAL BOX"];

export const Accesories = ({ handleNext, handleBack }: any) => {
  const [setFn, survey] = useAppStore((state) => [state.setFn, state.survey]);
  const [accesories, setAccesories] = useState<string[]>(
    survey.accesories || []
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    element: string
  ) => {
    const checked = event.target.checked;
    if (checked) {
      setAccesories((accesories) => [...accesories, element]);
    } else {
      setAccesories((accesories) =>
        accesories.filter((accesory) => accesory !== element)
      );
    }
  };

  const handleSubmit = () => {
    setFn.setAccesory(accesories);
    handleNext();
  };

  return (
    <>
      <StepLabel>Indica los accesorios</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          <FormGroup>
            {accesoriesList.map((element, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onChange={(event) => handleChange(event, element)}
                  />
                }
                label={element}
              />
            ))}
          </FormGroup>
        </Box>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 1, mr: 1 }}
            >
              Continue
            </Button>
            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
          </div>
        </Box>
      </StepContent>
    </>
  );
};
