import API from './api';

export const loginAdmin = async (data) => {
  const res = await API.post('/auth/login', data);
  return res.data;
};
