import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const login = (accountInfo: any) => {
  return axios.post(`${baseUrl}/api/auth/login`, accountInfo);
};

const getUserProfile = (token: string): Promise<any> => {
  return axios.get(`${baseUrl}/api/auth/profile`, {
    headers: { 'Authorization': 'Bearer ' + token }
  });
};

export { login, getUserProfile };
