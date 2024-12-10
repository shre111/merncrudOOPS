const express = require('express');
const CustomerController = require('../controllers/customerController');

const router = express.Router();
const customerController = new CustomerController();

router.get('/',  customerController.getAllCustomers.bind(customerController));
router.get('/:id', customerController.getCustomerById.bind(customerController));
router.post('/', customerController.createCustomer.bind(customerController));
router.put('/:id', customerController.updateCustomer.bind(customerController));
router.delete('/:id', customerController.deleteCustomer.bind(customerController));

module.exports = router;
