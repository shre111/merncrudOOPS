import React, { useState, useEffect } from 'react';
import { getCustomerById } from '../Services/customerService';

const CustomerDetails = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);

  const fetchCustomer = async () => {
    try {
      const response = await getCustomerById(customerId);
      setCustomer(response.data);
    } catch (error) {
      console.error('Failed to fetch customer details:', error);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [customerId]);

  if (!customer) {
    return <p>Loading...</p>;
  }

  const cardStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '20px',
    border: '1px solid white',
    margin: 'auto',
    padding: '20px'
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={cardStyles}>
        <h2>{customer.firstName} {customer.lastName}</h2>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <p>Address: {customer.address}</p>
      </div>
    </div>
  );
};

export default CustomerDetails;
