'use strict';

var Mongoose = require('mongoose');

var homeworkSchema = Mongoose.Schema({
  name: {type: String, required: true},
  description : {type: String},
  dueDate : {type: Date, required: true},
  category : {type: String, required: true},
  isPicked : {type: Boolean, required: true, default: false},
  createdAt : {type: Date, required: true, default: Date.now},
  userId : {type: Mongoose.Schema.ObjectId, ref: 'User', required: true}
});

var Homework = Mongoose.model('Homework', homeworkSchema);
module.exports = Homework;
