const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const formSchema = new Schema(
    [{
    formId: { type: String},    
    title: { type: String},
    password: { type: String},
    category: { type: String},
    subcategory: { type: String},
    owner: { type: String},
    userTypes:[],
    values:[],
    tags:[],
    template:{ type: Boolean, default:false},
    status: { type: String, default:'Active'},
    formType:{ type: String, default:'Public'},
    function:{},
    functionResult:{}
}]);    

const Form = mongoose.model('Form', formSchema);

module.exports = Form;