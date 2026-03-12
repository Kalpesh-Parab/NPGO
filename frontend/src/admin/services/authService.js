import axios from 'axios';

const API = 'http://localhost:5000/api/auth';

export const loginAdmin = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};
