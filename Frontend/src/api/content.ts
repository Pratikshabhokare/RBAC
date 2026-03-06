import api from './index';

export const getPublicContent = async () => {
  const response = await api.get('/public');
  return response.data;
};

export const getUserContent = async () => {
  const response = await api.get('/user');
  return response.data;
};

export const getAdminContent = async () => {
  const response = await api.get('/admin');
  return response.data;
};
