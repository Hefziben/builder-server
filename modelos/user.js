const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const userSchema = new Schema(
    [{
    name: { type: String,  },
    lastName: { type: String},
    userName:{ type: String},
    password:{ type: String},
    type:{ type: String },
    birthday: { type: String },
    birthPlace:{ type: String },
    email:{ type: String },
    phone:{ type: String },
    countryCode:{ type: String, default:'+63'},
    countryName:{ type: String, default:'Philippines'},      
    address:{ type: String },
    validation:{ type: String },
      active:{ type: Boolean, default:false},
    rights:[]
}]);

const User = mongoose.model('User', userSchema);

module.exports = User;