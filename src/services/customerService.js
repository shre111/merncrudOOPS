const CustomerRepository = require('../repositories/customerRepository');

class CustomerService {
  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async getCustomers({ searchTerm, sortBy, order = 'asc' }) {
    const filter = {};
    if (searchTerm) {
      filter.$or = [
        { firstName: new RegExp(searchTerm, 'i') },
        { lastName: new RegExp(searchTerm, 'i') },
        { email: new RegExp(searchTerm, 'i') },
      ];
    }

    const sortOrder = order === 'desc' ? -1 : 1;
    const sorting = sortBy ? { [sortBy]: sortOrder } : {};

    return await this.customerRepository.findAll(filter, sorting);
  }

  async getCustomerById(id) {
    const customer = await this.customerRepository.findById(id);
    if (!customer) throw new Error('Customer not found');
    return customer;
  }

  async createCustomer(data) {
    return this.customerRepository.create(data);
  }

  async updateCustomer(id, data) {
    return this.customerRepository.updateById(id, data);
  }

  async deleteCustomer(id) {
    const customer = await this.customerRepository.deleteById(id);
    if (!customer) throw new Error('Customer not found');
    return customer;
  }
}

module.exports = CustomerService;
