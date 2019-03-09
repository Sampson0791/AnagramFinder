
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WordSchema = new Schema({
  word: {type: String, required: true}
});

module.exports = mongoose.model('Words', WordSchema);
