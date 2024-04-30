import axios, { AxiosResponse } from "axios"

const baseUrl = import.meta.env.VITE_API_URL

const getCapacity = (): Promise<AxiosResponse<any[], any>> => {
    return axios.get(`${baseUrl}/api/capacity`)
}

const getPaymentType = (): Promise<AxiosResponse<any[], any>> => {
    return axios.get(`${baseUrl}/api/payment-type`)
}

const getCondition = (): Promise<AxiosResponse<any[], any>> => {
    return axios.get(`${baseUrl}/api/grade`)
}

export {
    getCapacity,
    getPaymentType,
    getCondition
}