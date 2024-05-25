import axios from "axios";
import { CreateSaleDTO } from "src/models/sales";

const baseUrl = import.meta.env.VITE_API_URL;

const createSale = (saleDto: CreateSaleDTO) => {
  return axios.post(`${baseUrl}/api/sale`, saleDto);
};

const getSalebyUID = (uuid: string) => {
  return axios.get(`${baseUrl}/api/sale/uid/${uuid}`);
};

export { createSale, getSalebyUID }