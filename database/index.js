// Mongoose
require('dotenv').config()
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Conectar mongoose con MongoDB
const url = process.env.CREDENTIALS;
// Connect to MongoDB
const MONGO_USERNAME = 'admin_2021_builder';
const MONGO_PASSWORD = 'Qwerty_2021';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'messageAutomation';
//const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.connection.once('open', function(){
  console.log('Conection has been made!');
}).on('error', function(error){
    console.log('Error is: ', error);
});