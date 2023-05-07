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
  createAt: {
    type: Date,
    default: Date.now
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    index: true,
    // required: true
  },
  categoryIcon: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})



module.exports = mongoose.model('Record', recordSchema)