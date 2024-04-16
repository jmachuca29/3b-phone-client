import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";

const accesoriesList = ["ORIGINAL BOX"];

export const Accesories = () => {
  return (
    <FormGroup>
      {accesoriesList.map((accesory, index) => (
        <FormControlLabel
          key={index}
          required
          control={<Checkbox />}
          label={accesory}
        />
      ))}
    </FormGroup>
  );
};
