const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const formDataSchema = new Schema(
    [{
    file: { type: String},
    formData: { type: Object},
    template:{ type: Object, default:''}
}]);

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;