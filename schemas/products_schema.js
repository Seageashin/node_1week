// schemas/products.schema.js
const products = [];

// 1. Create Product
function createProduct(req, res) {
  const { productName, description, author, password } = req.body;
  console.log("!!",productName, description, author, password);
  if (!productName || !description || !author || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newProduct = {
    id: products.length + 1,
    productName,
    description,
    author,
    status: 'FOR_SALE',
    createdAt: new Date(),
    password,
  };

  products.push(newProduct);

  return res.status(201).json({ message: 'Product created successfully', product: newProduct });
}

// 2. Get Products
function getProducts(req, res) {
  const { productName, author, status } = req.query;

  let filteredProducts = [...products];

  if (productName) {
    filteredProducts = filteredProducts.filter((product) => product.productName.includes(productName));
  }

  if (author) {
    filteredProducts = filteredProducts.filter((product) => product.author.includes(author));
  }

  if (status) {
    filteredProducts = filteredProducts.filter((product) => product.status === status);
  }

  // Sort by createdAt in descending order (newest first)
  filteredProducts.sort((a, b) => b.createdAt - a.createdAt);

  return res.status(200).json({ products: filteredProducts });
}

// 3. Get Product by ID
function getProductById(req, res) {
  const productId = parseInt(req.params.productId);

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  return res.status(200).json({ product });
}

// 4. Update Product
function updateProduct(req, res) {
  const productId = parseInt(req.params.productId);
  const { productName, description, status, password } = req.body;

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const product = products[productIndex];

  if (password !== product.password) {
    return res.status(401).json({ message: 'Incorrect password.' });
  }

  // Update only the provided fields
  if (productName) product.productName = productName;
  if (description) product.description = description;
  if (status) product.status = status;

  return res.status(200).json({ message: 'Product updated successfully', product });
}

// 5. Delete Product
function deleteProduct(req, res) {
  const productId = parseInt(req.params.productId);
  const { password } = req.body;

  const productIndex = products.findIndex((p) => p.id === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found.' });
  }

  const product = products[productIndex];

  if (password !== product.password) {
    return res.status(401).json({ message: 'Incorrect password.' });
  }

  // Remove the product from the array
  products.splice(productIndex, 1);

  return res.status(200).json({ message: 'Product deleted successfully' });
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
