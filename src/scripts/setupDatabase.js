const mongoose = require('mongoose');
const Customer = require('../models/Customer');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const seedCustomers = async () => {
  await Customer.deleteMany({});
  await Customer.insertMany([
    { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St' },
    { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Elm St' },
  ]);
  console.log('Database seeded');
  mongoose.connection.close();
};

seedCustomers();
