const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    attachment: {
      type: String,
    },

    category: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model('BlogPost', blogSchema);

module.exports = Blog;
