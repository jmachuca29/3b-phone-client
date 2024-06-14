import axios from "axios";
import { SalesCreateDto } from "src/models/sales";

const baseUrl = import.meta.env.VITE_API_URL;

const createSale = (saleDto: SalesCreateDto) => {
  return axios.post(`${baseUrl}/api/sale`, saleDto);
};

const getSalebyUID = (uuid: string) => {
  return axios.get(`${baseUrl}/api/sale/uid/${uuid}`);
};

const getSalebyEmail = (email: string) => {
  return axios.get(`${baseUrl}/api/sale/email/${email}`);
};

export { createSale, getSalebyUID, getSalebyEmail }