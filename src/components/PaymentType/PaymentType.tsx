import { Box, StepContent, StepLabel } from "@mui/material";
import Button from "@mui/material/Button";
import useAppStore from "src/store/store";

const capacityList = [
  {
    id: "1",
    value: "REGULAR",
  },
  {
    id: "2",
    value: "EXPRESS",
  },
];

const PaymentType = ({ handleNext, handleBack }: any) => {
  const setFn = useAppStore((state) => state.setFn);

  const selectPaymentType = (value: string) => {
    setFn.setPaymentType(value);
    handleNext();
  };

  return (
    <>
      <StepLabel>Payment Type</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          {capacityList.map((capacity) => (
            <Button
              key={capacity.id}
              variant="contained"
              onClick={() => selectPaymentType(capacity.value)}
            >
              {capacity.value}
            </Button>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button variant="contained" disabled sx={{ mt: 1, mr: 1 }}>
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

export default PaymentType;
