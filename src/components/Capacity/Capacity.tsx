import { Box, Button, StepContent, StepLabel } from "@mui/material";
import useAppStore from "src/store/store";

const capacityList = [
  {
    id: "1",
    value: "8GB",
  },
  {
    id: "2",
    value: "16GB",
  },
  {
    id: "3",
    value: "32GB",
  },
];

export const Capacity = ({ handleNext }: any) => {
  const setFn = useAppStore((state) => state.setFn);

  const selectCapacity = (value: string) => {
    setFn.setCapacity(value);
    handleNext();
  };

  return (
    <>
      <StepLabel>Select capacity</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          {capacityList.map((capacity) => (
            <Button
              key={capacity.id}
              variant="contained"
              onClick={() => selectCapacity(capacity.value)}
            >
              {capacity.value}
            </Button>
          ))}
        </Box>
      </StepContent>
    </>
  );
};
