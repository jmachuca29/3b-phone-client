import { FormGroup, TextField } from "@mui/material";
import React from "react";

export const Characteristics = () => {
  return (
    <>
    <FormGroup>
      <TextField id="serieNumber-survey" label="Serie Number" variant="outlined" />
      <TextField id="imei_1-survey" label="Imei 1" variant="outlined" />
      <TextField id="imei_2-survey" label="Imei 2" variant="outlined" />
    </FormGroup>
    </>
  );
};
