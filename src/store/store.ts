import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Actions = {
  setCapacity: (capacity: string) => void;
  setPaymentType: (paymentType: string) => void;
  reset: () => void;
};

type AppState = {
  survey: {
    capacity: string;
    accesories: string[];
    serieNumber: string;
    imei1: string;
    imei2: string;
    paymentType: string;
    condition: string;
  };
  setFn: Actions;
};

const initialState = {
  survey: {
    capacity: "",
    accesories: [],
    serieNumber: "",
    imei1: "",
    imei2: "",
    paymentType: "",
    condition: "",
  },
};

const sharedStateAndActions = (set: any, get: any) => ({
  ...initialState,
  setFn: {
    setCapacity: (value: string) => {
      const { survey } = get();
      set({ survey: { ...survey, capacity: value } }, false, "UPDATE CAPACITY");
    },
    setPaymentType: (value: string) => {
      const { survey } = get();
      set({ survey: { ...survey, paymentType: value } }, false, "UPDATE PAYMENT TYPE");
    },
    reset: () => set(initialState, false, "RESET"),
  },
});

const useAppStore = create<AppState>()(
  devtools((set, get) => ({
    ...sharedStateAndActions(set, get),
  }))
);

export default useAppStore;
