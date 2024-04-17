import { Button } from "@mui/material";
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

export const Condition = () => {
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
    </>
  );
};
