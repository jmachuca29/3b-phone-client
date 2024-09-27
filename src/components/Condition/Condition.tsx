import { Box, Button, CardMedia, StepContent, StepLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getCondition } from "src/services/survey";
import useAppStore from "src/store/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const conditionList = [
    {
        id: "1",
        value: "A",
        image: "https://res.cloudinary.com/dwuk1xa8f/image/upload/v1719163017/3b_iphone_grado_a_giljsa.png",
    },
    {
        id: "2",
        value: "B",
        image: "https://res.cloudinary.com/dwuk1xa8f/image/upload/v1719163017/3b_iphone_grado_b_y1aotm.png",
    },
    {
        id: "3",
        value: "C",
        image: "https://res.cloudinary.com/dwuk1xa8f/image/upload/v1719163017/3b_iphone_grado_c_t7hrtt.png"
    }
];

const returnConditionDescription = (value: string): any => {
    const image = conditionList.find((condition) => condition.value === value)
        ?.image || ''
    return image ? <CardMedia
        component="img"
        height="140"
        image={image || ''}
        alt="condition_img"
        sx={{
            height: 'auto'
        }}
    /> : null
};

export const Condition = ({ handleBack }: any) => {
    const setFn = useAppStore((state) => state.setFn);
    const navigate = useNavigate();

    const { isPending, isError, data, error } = useQuery({
        queryKey: ['condition'],
        queryFn: getCondition,
    })

    const { handleSubmit, setValue, formState: { errors }, watch, register, trigger } = useForm({
        defaultValues: {
            selectedCondition: ""
        }
    });

    const selectedCondition = watch("selectedCondition");

    const selectCondition = (value: any) => {
        setValue("selectedCondition", value);
        trigger("selectedCondition");
    };


    const onSubmit = (payload: any) => {
        const selectedCondition = payload.selectedCondition;
        const conditions = data?.data || []
        const condition = conditions.find((condition: any) => condition?.description === selectedCondition)
        setFn.setCondition(condition);
        navigate('/checkout')
    };

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <>
            <StepLabel>Condicion del equipo</StepLabel>
            <StepContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ m: 2, display: "flex", gap: 1 }}>
                        {data.data?.map((condition) => (
                            <Button
                                key={condition._id}
                                variant="contained"
                                onClick={() => selectCondition(condition.description)}
                            >
                                {condition.description}
                            </Button>
                        ))}
                    </Box>
                    <input
                        type="hidden"
                        {...register("selectedCondition", { required: "Debes seleccionar al menos una opcion." })}
                    />
                    {errors.selectedCondition && <span style={{ color: 'red' }}>{errors.selectedCondition.message}</span>}
                    <Box>
                        <div>{returnConditionDescription(selectedCondition)}</div>
                    </Box>
                    <Box>
                        <div>
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{ mt: 1, mr: 1 }}
                            >
                                Confirmar
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
