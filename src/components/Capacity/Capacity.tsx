import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCapacity } from "src/services/survey";
import useAppStore from "src/store/store";

export const Capacity = ({ handleNext }: any) => {
  const setFn = useAppStore((state) => state.setFn);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['capacity'],
    queryFn: getCapacity,
  })

  const selectCapacity = (value: string) => {
    setFn.setCapacity(value);
    handleNext();
  };

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <StepLabel>Select capacity</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          {data.data?.map((capacity) => (
            <Button
              key={capacity._id}
              variant="contained"
              onClick={() => selectCapacity(capacity._id)}
            >
              {capacity.description}
            </Button>
          ))}
        </Box>
      </StepContent>
    </>
  );
};
