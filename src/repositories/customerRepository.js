const Customer = require('../models/Customer');

class CustomerRepository {
  async findAll(filter, sorting) {
    return await Customer.find(filter).sort(sorting).exec();
  }

  async findById(id) {
    return Customer.findById(id);
  }

  async create(data) {
    return Customer.create(data);
  }

  async updateById(id, data) {
    return Customer.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return Customer.findByIdAndDelete(id);
  }
}

module.exports = CustomerRepository;
