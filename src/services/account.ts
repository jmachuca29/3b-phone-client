import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const registerAccount = (user: any) => {
    return axios.post(`${baseUrl}/api/account`, user);
};

export default registerAccount