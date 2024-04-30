import axios, { AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const listProducts = (): Promise<AxiosResponse<any, any>> => {
  return axios.get(`${baseUrl}/api/product`);
};

export default listProducts;
