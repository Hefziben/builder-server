mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const formSchema = new Schema(
    [{
    title: { type: String,  },
    category: { type: String},
    subcategory: { type: String},
    owner: { type: String},
    userTypes:[],
    values:[],
    status: { type: String, default:'Active'}
}]);    

const Form = mongoose.model('Form', formSchema);

module.exports = Form;