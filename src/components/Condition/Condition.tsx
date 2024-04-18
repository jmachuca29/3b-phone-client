import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useState } from "react";
// import React, { useContext } from 'react'
// import { TradeInContext } from 'src/pages/trade-in';
import useAppStore from "src/store/store";

const conditionList = [
  {
    id: "1",
    value: "A",
    description: "A description",
  },
  {
    id: "2",
    value: "B",
    description: "B description",
  },
  {
    id: "3",
    value: "C",
    description: "C description",
  },
  {
    id: "4",
    value: "D",
    description: "D description",
  },
  {
    id: "5",
    value: "E",
    description: "E description",
  },
];

export const Condition = ({ handleNext, handleBack }: any) => {
  const [condition, setCondition] = useState<string>("");
  const setFn = useAppStore((state) => state.setFn);

  const selectCondition = (value: string) => {
    setCondition(value);
    setFn.setCondition(value);
  };

  const returnConditionDescription = (value: string) => {
    return (
      conditionList.find((condition) => condition.value === value)
        ?.description || "No description available"
    );
  };

  return (
    <>
      <StepLabel>Condition</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          {conditionList.map((condition) => (
            <Button
              key={condition.id}
              variant="contained"
              onClick={() => selectCondition(condition.value)}
            >
              {condition.value}
            </Button>
          ))}
          <div>{returnConditionDescription(condition)}</div>
        </Box>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Finish
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
