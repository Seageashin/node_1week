// app.js
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/products_router');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("!!!");
// Routes
app.use('/products', productsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
