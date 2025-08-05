const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/simple-ecom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Product Schema
const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.post('/products', async (req, res) => {
  try {
    const { title, price } = req.body;
    const product = new Product({ title, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Attempting to delete product with id: ${id}`);
    const result = await Product.findByIdAndDelete(id);
    if (result) {
      console.log(`Product with id: ${id} deleted successfully.`);
      res.status(204).send();
    } else {
      console.log(`Product with id: ${id} not found.`);
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(`Error deleting product with id: ${id}`, error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});