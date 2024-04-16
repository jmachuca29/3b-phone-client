import Button from "@mui/material/Button";
import { useContext } from "react";
import { TradeInContext } from "src/pages/trade-in";
import useAppStore from "src/store/store";

const capacityList = [
  {
    id: "1",
    value: "REGULAR",
  },
  {
    id: "2",
    value: "EXPRESS",
  },
];

const PaymentType = () => {
  const handleNext = useContext(TradeInContext);
  const setFn = useAppStore((state) => state.setFn);

  const selectPaymentType = (value: string) => {
    setFn.setPaymentType(value);
    handleNext();
  };

  return capacityList.map((capacity) => (
    <Button
      key={capacity.id}
      variant="contained"
      onClick={() => selectPaymentType(capacity.value)}
    >
      {capacity.value}
    </Button>
  ));
}

export default PaymentType