import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers';

export const getCustomers = async (searchTerm, sortBy, order) => {
  const params = { searchTerm, sortBy, order };
  return await axios.get(API_URL, { params });
};

export const getCustomerById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

export const addCustomer = async (customerData) => {
  return await axios.post(API_URL, customerData);
};

export const updateCustomer = async (id, customerData) => {
  return await axios.put(`${API_URL}/${id}`, customerData);
};

export const deleteCustomer = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
