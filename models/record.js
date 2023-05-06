const mongoose = require('mongoose')
const category = require('./category')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    index: true,
    required: true
  },
  categoryIcon: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})



module.exports = mongoose.model('Record', recordSchema)