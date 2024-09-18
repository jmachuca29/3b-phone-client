import axios, { AxiosResponse } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export type ProductPriceDto = {
    productId: string,
    gradeId: string,
    capacityId: string
}

const listProducts = (): Promise<AxiosResponse<any, any>> => {
    return axios.get(`${baseUrl}/api/product`);
};

const getProductPrice = (productPriceDto: ProductPriceDto): any => {
    return axios.post(`${baseUrl}/api/product/get-price`, productPriceDto);
};

export { listProducts, getProductPrice };
