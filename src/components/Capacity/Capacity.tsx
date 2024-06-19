import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import useAppStore from "src/store/store";

export const Capacity = ({ handleNext }: any) => {
  const [products, currentProduct, setFn] = useAppStore((state) => [state.products, state.currentProduct, state.setFn]);
  const [capacities, setCapacities] = useState<any>([])

  useEffect(() => {
    const productsFiltered = products.filter((product: any) => product.description === currentProduct.description)
    const capacities = productsFiltered.map((productFiltered: any) => productFiltered.capacity)
    setCapacities(capacities)
  }, [])

  const selectCapacity = (value: any) => {
    setFn.setCapacity(value);
    handleNext();
  };

  return (
    <>
      <StepLabel>Indica la capacidad</StepLabel>
      <StepContent>
        <Box sx={{ m: 2, display: "flex",gap: 1 }}>
          {capacities.map((capacity: any) => (
            <Button
              key={capacity._id}
              variant="contained"
              onClick={() => selectCapacity(capacity)}
            >
              {capacity.description}
            </Button>
          ))}
        </Box>
      </StepContent>
    </>
  );
};
