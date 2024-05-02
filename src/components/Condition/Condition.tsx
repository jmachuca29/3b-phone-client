import { Box, Button, StepContent, StepLabel } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCondition } from "src/services/survey";
import useAppStore from "src/store/store";
import CardCondition from "./CardCondition/CardCondition";

const conditionList = [
  {
    id: "1",
    value: "A",
    description: [
      "NO TIENE EXCEPCIONES",
      "SIN QUIÑES",
      "OBLIGATORIAMENTE MAS DE 90%"
    ],
  },
  {
    id: "2",
    value: "B",
    description: [
      "SOLO PINTURA",
      "NO ABOYADURAS",
      "SURCOS",
      "DEFORMACIONES EN LA CARCASA"
    ],
  },
  {
    id: "3",
    value: "C",
    description: [
      "RAYONES EN EL GLASS GRAVES QUE SE NOTAN PESE A TENER MICA DE VIDRIO",
      "ABOYADURAS",
      "HENDIDURAS",
      "DESPINTADO MUY NOTORIO"
    ],
  },
  {
    id: "4",
    value: "D",
    description: [
      "FALLAS EN FUNCIONAMIENTO",
      "FALLAS EN LOS BOTONES, FALLA DEL ZOCALO DE CARGA, GLASS DELANTERO Y TRASERO ROTO"
    ],
  }
];

export const Condition = ({ handleNext, handleBack }: any) => {
  const [condition, setCondition] = useState<any>({});
  const setFn = useAppStore((state) => state.setFn);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['condition'],
    queryFn: getCondition,
  })
  
  const selectCondition = (condition: any) => {
    setCondition(condition.description);
    setFn.setCondition(condition);
  };

  const returnConditionDescription = (value: string): any => {
    const descriptions = conditionList.find((condition) => condition.value === value)
    ?.description || []
    console.log('descriptions', descriptions)
    return <CardCondition descriptions={descriptions} />
  };

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <StepLabel>Condition</StepLabel>
      <StepContent>
        <Box sx={{ mb: 2 }}>
          {data.data?.map((condition) => (
            <Button
              key={condition._id}
              variant="contained"
              onClick={() => selectCondition(condition)}
            >
              {condition.description}
            </Button>
          ))}
          <div>{returnConditionDescription(condition)}</div>
        </Box>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 1, mr: 1 }}
            >
              Finish
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
