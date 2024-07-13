import { Box, StepContent, StepLabel } from "@mui/material";
import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
import { getPaymentType } from "src/services/survey";
import useAppStore from "src/store/store";

const PaymentType = ({ handleNext, handleBack }: any) => {
  const setFn = useAppStore((state) => state.setFn);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['paymentType'],
    queryFn: getPaymentType,
  })

  const selectPaymentType = (value: string) => {
    setFn.setPaymentType(value);
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
      <StepLabel>Tipo de Pago</StepLabel>
      <StepContent>
        <Box sx={{ m: 2 }}>
          {data.data?.map((paymentType) => (
            <Button
              key={paymentType._id}
              variant="contained"
              onClick={() => selectPaymentType(paymentType)}
            >
              {paymentType.description}
            </Button>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
            Atras
          </Button>
        </Box>
      </StepContent>
    </>
  );

};

export default PaymentType;
