import React, { useState, useEffect } from 'react';
import { getCustomers, deleteCustomer } from '../Services/customerService';

const CustomerList = ({ onViewCustomer, onEditCustomer, fetchCustomers, customers, loading, searchTerm, sortBy, order, setSearchTerm, setSortBy, setOrder }) => {


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id);
        fetchCustomers();
      } catch (error) {
        console.error('Failed to delete customer:', error);
      }
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, sortBy, order]);

  return (
    <div>
      <h1>Customer List</h1>
      <div>
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
          <option value="email">Email</option>
        </select>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {customers.map((customer) => (
            <li key={customer._id}>
              {customer.firstName} {customer.lastName} ({customer.email})
              <button onClick={() => onViewCustomer(customer._id)}>View</button>
              <button onClick={() => onEditCustomer(customer._id)}>Edit</button>
              <button onClick={() => handleDelete(customer._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerList;
