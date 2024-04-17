import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAppStore from "src/store/store";

const accesoriesList = ["ORIGINAL BOX"];

export const Accesories = () => {
  const [accesories, setAccesories] = useState<string[]>([])
  const setFn = useAppStore((state) => state.setFn);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, element: string) => {
    const checked = event.target.checked
    if(checked) {
      setAccesories(accesories => [...accesories, element]);
    } else {
      setAccesories(accesories => accesories.filter(accesory => accesory !== element));
    }
  };

  useEffect(() => {
    setFn.setAccesory(accesories)
  }, [setFn, accesories])
  

  return (
    <FormGroup>
      {accesoriesList.map((element, index) => (
        <FormControlLabel
          key={index}
          required
          control={
            <Checkbox onChange={(event) => handleChange(event, element)} />
          }
          label={element}
        />
      ))}
    </FormGroup>
  );
};
