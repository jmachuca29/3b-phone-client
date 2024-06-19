import { Box, Button, CardMedia, StepContent, StepLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCondition } from "src/services/survey";
import useAppStore from "src/store/store";
import { useNavigate } from "react-router-dom";

const conditionList = [
  {
    id: "1",
    value: "A",
    image: "https://res.cloudinary.com/dwuk1xa8f/image/upload/v1718834504/vefgixfeq0do3vxzylkg.png",
  },
  {
    id: "2",
    value: "B",
    image: "https://res.cloudinary.com/dwuk1xa8f/image/upload/v1718834503/r3ldfwogoboi9k4iefw0.png",
  },
  {
    id: "3",
    value: "C",
    image: "https://res.cloudinary.com/dwuk1xa8f/image/upload/v1718834503/svrrjokdc82qkycfpn3j.png",
  }
];

export const Condition = ({ handleBack }: any) => {

  const [condition, setCondition] = useState<any>({});
  const setFn = useAppStore((state) => state.setFn);
  const navigate = useNavigate();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['condition'],
    queryFn: getCondition,
  })

  const selectCondition = (condition: any) => {
    setCondition(condition.description);
    setFn.setCondition(condition);
  };

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
        <Box sx={{ m: 2, display: "flex", gap: 1 }}>
          {data.data?.map((condition) => (
            <Button
              key={condition._id}
              variant="contained"
              onClick={() => selectCondition(condition)}
            >
              {condition.description}
            </Button>
          ))}
        </Box>
        <Box>
          <div>{returnConditionDescription(condition)}</div>
        </Box>
        <Box>
          <div>
            <Button
              variant="contained"
              onClick={() => { navigate('/checkout') }}
              sx={{ mt: 1, mr: 1 }}
            >
              Confirmar
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
