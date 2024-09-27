import {
    Box,
    Button,
    FormControlLabel,
    Radio,
    RadioGroup,
    StepContent,
    StepLabel,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import useAppStore from "src/store/store";

export const Accesories = ({ handleNext, handleBack }: any) => {
    const [setFn] = useAppStore((state) => [state.setFn, state.survey]);
    const { handleSubmit, setValue, formState: { errors }, register, trigger, watch } = useForm({
        defaultValues: {
            boxIncluded: ''
        }
    });

    const boxIncluded = watch("boxIncluded");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value
        setValue("boxIncluded", value);
        trigger("boxIncluded");
    };

    const onSubmit = (data: any) => {
        const value = data.boxIncluded
        setFn.setOriginalBox(value === "true");
        handleNext();
    };

    return (
        <>
            <StepLabel>¿Incluyes caja original?</StepLabel>
            <StepContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 2 }}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={boxIncluded}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="Si" />
                            <FormControlLabel value="false" control={<Radio />} label="No" />
                        </RadioGroup>
                    </Box>
                    <input
                        type="hidden"
                        {...register("boxIncluded", { required: "Debes seleccionar al menos una opcion." })}
                    />
                    {errors.boxIncluded && <span style={{ color: 'red' }}>{errors.boxIncluded.message}</span>}
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
