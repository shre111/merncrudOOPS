const CustomerService = require('../services/customerService');

class CustomerController {

  constructor() {
    this.customerService = new CustomerService();
  }

  async getAllCustomers(req, res) {
    try {
      const { searchTerm, sortBy, order } = req.query;
      const customers = await this.customerService.getCustomers({ searchTerm, sortBy, order });

      if (!customers || customers.length === 0) {
        return res.status(404).json({ message: 'No customers found' });
      }

      res.status(200).json(customers);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getCustomerById(req, res) {
    try {
      const customer = await this.customerService.getCustomerById(req.params.id);
      res.status(200).json(customer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async createCustomer(req, res) {
    try {
      const customer = await this.customerService.createCustomer(req.body);
      res.status(201).json(customer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateCustomer(req, res) {
    try {
      const customer = await this.customerService.updateCustomer(req.params.id, req.body);
      res.status(200).json(customer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async deleteCustomer(req, res) {
    try {
      await this.customerService.deleteCustomer(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = CustomerController;
