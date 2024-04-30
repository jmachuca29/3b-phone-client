import axios from "axios";
import { CreateSaleDTO } from "src/models/sales";

const baseUrl = import.meta.env.VITE_API_URL;

const createSale = (saleDto: CreateSaleDTO) => {
  return axios.post(`${baseUrl}/api/sale`, saleDto);
};

export default createSale