import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Actions = {
  setCapacity: (capacity: string) => void;
  setPaymentType: (paymentType: string) => void;
  setCondition: (condition: string) => void;
  setAccesory: (accesory: string[]) => void;
  setSerieNumberImei: (
    serieNumber: string,
    imei1: string,
    imei2: string
  ) => void;
  setUser: (infoUser: any) => void;
  setProduct: (productDetails: any) => void;
  removeUser: () => void;
  reset: () => void;
};

type AppState = {
  survey: {
    capacity: any;
    accesories: string[];
    serieNumber: string;
    imei1: string;
    imei2: string;
    paymentType: any;
    condition: any;
  };
  user: any;
  product: any;
  setFn: Actions; 
};

const initialState = {
  product: {},
  survey: {
    capacity: "",
    accesories: [],
    serieNumber: "",
    imei1: "",
    imei2: "",
    paymentType: "",
    condition: "",
  },
  user: {}
};

const sharedStateAndActions = (set: any, get: any) => ({
  ...initialState,
  setFn: {
    setCapacity: (value: string) => {
      const { survey } = get();
      set({ survey: { ...survey, capacity: value } }, false, "SET CAPACITY");
    },
    setPaymentType: (value: string) => {
      const { survey } = get();
      set(
        { survey: { ...survey, paymentType: value } },
        false,
        "SET PAYMENT TYPE"
      );
    },
    setCondition: (value: string) => {
      const { survey } = get();
      set({ survey: { ...survey, condition: value } }, false, "SET CONDITION");
    },
    setAccesory: (value: string[]) => {
      const { survey } = get();
      set({ survey: { ...survey, accesories: value } }, false, "SET ACCESORY");
    },
    setSerieNumberImei: (serieNumber: string, imei1: string, imei2: string) => {
      const { survey } = get();
      set(
        { survey: { ...survey, serieNumber, imei1, imei2 } },
        false,
        "SET SERIENUMBER AND IMEI"
      );
    },
    setUser: (infoUser: any) => {
      set({ user: infoUser }, false, "SET USER");
    },
    setProduct: (productDetails: any) => {
      set({ product: productDetails }, false, "SET PRODUCT");
    },
    removeUser: () => {
      set({ user: initialState.user }, false, "REMOVE USER");
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
