const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const idSchema = new Schema(
    [{
    value: { type: String},
}]);

const Id = mongoose.model('Id', idSchema);

module.exports = Id;