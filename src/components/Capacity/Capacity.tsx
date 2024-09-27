import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import useAppStore from "src/store/store";

function extractValuesByKey(product: any, key: string) {
    return Array.from(
      new Map(
        product?.prices
          .map((price: any) => price[key as keyof typeof price])
          .filter((value: any) => value !== undefined)
          .map((item: any) => [item._id, item])
      ).values()
    );
  }

export const Capacity = ({ handleNext }: any) => {
    const [currentProduct, setFn] = useAppStore((state) => [state.currentProduct, state.setFn]);
    const [capacities, setCapacities] = useState<any>([])

    useEffect(() => {
        if (Object.keys(currentProduct).length == 0) return
        const capacities = extractValuesByKey(currentProduct, 'capacity')
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
                <Box sx={{ m: 2, display: "flex", gap: 1 }}>
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
