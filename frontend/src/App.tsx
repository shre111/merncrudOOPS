import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import CustomerDetails from './components/CustomerDetails';
import { getCustomers } from './Services/customerService';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('firstName');
  const [order, setOrder] = useState('asc');

  const [loading, setLoading] = useState(false);
  const [viewCustomerId, setViewCustomerId] = useState(null);
  const [editCustomerId, setEditCustomerId] = useState(null);

  const handleViewCustomer = (id) => setViewCustomerId(id);
  const handleEditCustomer = (id) => setEditCustomerId(id);

  const resetViewAndEdit = () => {
    setViewCustomerId(null);
    setEditCustomerId(null);
  };

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await getCustomers(searchTerm, sortBy, order);
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!viewCustomerId && !editCustomerId && (
        <CustomerList onViewCustomer={handleViewCustomer} onEditCustomer={handleEditCustomer} fetchCustomers={fetchCustomers} customers={customers} loading={loading} setSearchTerm={setSearchTerm} setSortBy={setSortBy} setOrder={setOrder} searchTerm={searchTerm} sortBy={sortBy} order={order} />
      )}
      {viewCustomerId && <CustomerDetails customerId={viewCustomerId} />}
      {editCustomerId && <CustomerForm customerId={editCustomerId} onSubmitSuccess={resetViewAndEdit} />}
      {!viewCustomerId && !editCustomerId && <CustomerForm onSubmitSuccess={resetViewAndEdit} fetchCustomers={fetchCustomers} />}
    </div>
  );
};

export default App;
