import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAppStore from "src/store/store";

export const Color = ({ handleNext, handleBack }: any) => {
    const [currentProduct, setFn] = useAppStore((state) => [state.currentProduct, state.setFn]);
    const [colors, setColors] = useState<any>([]);

    const { handleSubmit, setValue, formState: { errors }, register, trigger } = useForm({
        defaultValues: {
            selectedColor: ""
        }
    });

    useEffect(() => {
        if (Object.keys(currentProduct).length === 0) return;
        const colors = currentProduct.colors;
        setColors(colors);
    }, [currentProduct]);

    const selectColor = (value: any) => {
        setValue("selectedColor", value);
        trigger("selectedColor");
    };

    const onSubmit = (data: any) => {
        const selectedColor = data.selectedColor;
        const color = colors.find((color: any) => color?._id === selectedColor)
        setFn.setColor(color);
        handleNext();
    };

    return (
        <>
            <StepLabel>Indica el color</StepLabel>
            <StepContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ m: 2, display: "flex", gap: 1 }}>
                        {colors.map((color: any) => (
                            <Button
                                key={color._id}
                                variant="contained"
                                onClick={() => selectColor(color._id)}
                            >
                                {color.description}
                            </Button>
                        ))}
                    </Box>
                    <input
                        type="hidden"
                        {...register("selectedColor", { required: "Debes seleccionar al menos un color." })}
                    />
                    {errors.selectedColor && <span style={{ color: 'red' }}>{errors.selectedColor.message}</span>}
                    <Box sx={{ mb: 2 }}>
                        <div>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Continuar
                            </Button>
                            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                                Atras
                            </Button>
                        </div>
                    </Box>
                </form>
            </StepContent>
        </>
    );
};
