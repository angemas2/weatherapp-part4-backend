const mongoose = require('mongoose');

const connectionString =
  "mongodb+srv://admin:QZJV7WPzeqOxShur@cluster0.eeky7lt.mongodb.net/weather";

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log('Database connected'))
  .catch(error => console.error(error));
