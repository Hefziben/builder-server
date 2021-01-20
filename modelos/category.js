mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const categorySchema = new Schema(
    [{
    name: { type: String,  },
    subcategories: [],
}]);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;