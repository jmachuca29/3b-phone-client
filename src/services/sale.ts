import axios from "axios";
import { SalesCreateDto } from "src/models/sales";

const baseUrl = import.meta.env.VITE_API_URL;

const createSale = (saleDto: SalesCreateDto) => {
  return axios.post(`${baseUrl}/api/sale`, saleDto);
};

const getSalebyUID = (uuid: string) => {
  return axios.get(`${baseUrl}/api/sale/uid/${uuid}`);
};

const getSalesbyAccount = (id: string) => {
  return axios.get(`${baseUrl}/api/sale/account/${id}`);
};

export { createSale, getSalebyUID, getSalesbyAccount }