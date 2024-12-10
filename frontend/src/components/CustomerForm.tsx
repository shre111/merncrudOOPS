import React, { useState, useEffect } from 'react';
import { addCustomer, getCustomerById, updateCustomer } from '../Services/customerService';

const CustomerForm = ({ customerId, onSubmitSuccess, fetchCustomers }) => {
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const fetchCustomer = async () => {
    if (customerId) {
      try {
        const response = await getCustomerById(customerId);
        setCustomerData(response.data);
      } catch (error) {
        console.error('Failed to fetch customer:', error);
      }
    }
  };

  const handleChange = (e) => {
    setCustomerData({
      ...customerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (customerId) {
        await updateCustomer(customerId, customerData);
      } else {
        await addCustomer(customerData);
      }
      await fetchCustomers()
      onSubmitSuccess();
    } catch (error) {
      console.error('Failed to submit customer:', error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" value={customerData.firstName} onChange={handleChange} placeholder="First Name" required />
      <input name="lastName" value={customerData.lastName} onChange={handleChange} placeholder="Last Name" required />
      <input name="email" value={customerData.email} onChange={handleChange} placeholder="Email" required />
      <input name="phone" value={customerData.phone} onChange={handleChange} placeholder="Phone Number" />
      <input name="address" value={customerData.address} onChange={handleChange} placeholder="Address" />
      <button type="submit">{customerId ? 'Update' : 'Add'} Customer</button>
    </form>
  );
};

export default CustomerForm;
