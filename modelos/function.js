const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const functionSchema = new Schema(
    [{
    name: { type: String},
    function: { type: String},
    params:[]
}]);

const Function = mongoose.model('Function', functionSchema);

module.exports = Function;