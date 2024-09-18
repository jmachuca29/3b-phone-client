import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import useAppStore from "src/store/store";

export const Color = ({ handleNext }: any) => {
  const [currentProduct, setFn] = useAppStore((state) => [state.currentProduct, state.setFn]);
  const [colors, setColors] = useState<any>([])

  useEffect(() => {
    if(Object.keys(currentProduct).length == 0) return
    const colors = currentProduct.colors
    setColors(colors)
  }, [])

  const selectColor = (value: any) => {
    setFn.setColor(value);
    handleNext();
  };

  return (
    <>
      <StepLabel>Indica el color</StepLabel>
      <StepContent>
        <Box sx={{ m: 2, display: "flex",gap: 1 }}>
          {colors.map((color: any) => (
            <Button
              key={color._id}
              variant="contained"
              onClick={() => selectColor(color)}
            >
              {color.description}
            </Button>
          ))}
        </Box>
      </StepContent>
    </>
  );
};
