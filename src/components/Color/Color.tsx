import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import useAppStore from "src/store/store";

export const Color = ({ handleNext, handleBack }: any) => {
    const [currentProduct, setFn] = useAppStore((state) => [state.currentProduct, state.setFn]);
    const [colors, setColors] = useState<any>([])

    useEffect(() => {
        if (Object.keys(currentProduct).length == 0) return
        const colors = currentProduct.colors
        setColors(colors)
    }, [])

    const selectColor = (value: any) => {
        setFn.setColor(value);
        handleNext();
    };

    const handleSubmit = () => {
        handleNext();
    };

    return (
        <>
            <StepLabel>Indica el color</StepLabel>
            <StepContent>
                <Box sx={{ m: 2, display: "flex", gap: 1 }}>
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
                <Box sx={{ mb: 2 }}>
                    <div>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            Continuar
                        </Button>
                        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                            Atras
                        </Button>
                    </div>
                </Box>
            </StepContent>
        </>
    );
};
