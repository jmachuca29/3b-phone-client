import { Button } from "@mui/material";
import { useContext } from "react";
import { TradeInContext } from "src/pages/trade-in";
import useAppStore from "src/store/store";

const capacityList = [
  {
    id: "1",
    value: "8GB",
  },
  {
    id: "2",
    value: "16GB",
  },
  {
    id: "3",
    value: "32GB",
  },
];

export const Capacity = () => {
  const handleNext = useContext(TradeInContext);
  const setFn = useAppStore((state) => state.setFn);

  const selectCapacity = (value: string) => {
    setFn.setCapacity(value);
    handleNext();
  };

  return capacityList.map((capacity) => (
    <Button
      key={capacity.id}
      variant="contained"
      onClick={() => selectCapacity(capacity.value)}
    >
      {capacity.value}
    </Button>
  ));
};
