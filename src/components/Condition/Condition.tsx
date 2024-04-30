import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCondition } from "src/services/survey";
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
  const [condition, setCondition] = useState<any>({});
  const setFn = useAppStore((state) => state.setFn);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['condition'],
    queryFn: getCondition,
  })
  
  const selectCondition = (condition: any) => {
    console.log(condition)
    setCondition(condition.description);
    setFn.setCondition(condition._id);
  };

  const returnConditionDescription = (value: string) => {
    return (
      conditionList.find((condition) => condition.value === value)
        ?.description || "No description available"
    );
  };

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <StepLabel>Condition</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          {data.data?.map((condition) => (
            <Button
              key={condition._id}
              variant="contained"
              onClick={() => selectCondition(condition)}
            >
              {condition.description}
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
