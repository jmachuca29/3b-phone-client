import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const getUserById = (id: string) => {
    return axios.get(`${baseUrl}/api/user/${id}`);
  };

export default getUserById