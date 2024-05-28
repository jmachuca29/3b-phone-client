import AlertType from "src/constant/alertType";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ISnackBar {
  message: string,
  key: any,
  type: AlertType
}

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
  setProducts: (products: any) => void;
  setCurrentProduct: (productDetails: any) => void;
  removeUser: () => void;
  addSnackbar: (message: string, type: AlertType) => void;
  removeSnackbar: () => void;
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
  currentProduct: any;
  products: any;
  snackPack: ISnackBar[];
  setFn: Actions;
};

const initialState = {
  currentProduct: {},
  products: [],
  survey: {
    capacity: "",
    accesories: [],
    serieNumber: "",
    imei1: "",
    imei2: "",
    paymentType: "",
    condition: "",
  },
  user: {},
  snackPack: []
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
    setCurrentProduct: (productDetails: any) => {
      set({ currentProduct: productDetails }, false, "SET CURRENT PRODUCT");
    },
    setProducts: (products: any) => {
      set({ products: products }, false, "SET PRODUCTS");
    },
    addSnackbar: (message: string, type: AlertType) => set(
      (state: AppState) => ({
        snackPack: [
          ...state.snackPack,
          { message, key: new Date().getTime(), type }
        ]

      }), false, 'ADD SNACKBAR'
    ),
    removeSnackbar: () => set(
      (state: AppState) => ({
        snackPack: state.snackPack.splice(1)
      }), false, 'REMOVE SNACKBAR'
    ),
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
