const mongoose = require('mongoose');

//schema middleware

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters'],
  },
  price: {
    type: Number,
    default: 0, //default price if default is exist required not need to mention
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, 'Please enter product category'],
    enum: {
      values: [
        'Electronics',
        'Mobiles',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: 'Please select correct category',
    },
  },
  seller: {
    type: String,
    required: [true, 'Please enter prtoduct seller'],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [20, 'Product Stock Cannot Exceed 20'],
  },
  numOfReviews: {
    //total num.of.reviews
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
let schema = mongoose.model('Product', productSchema);

module.exports = schema;
