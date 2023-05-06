const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')


router.get('/', async (req, res) => {
  try {
    const records = await Record.find().lean().sort({ date: 'desc', createAt: 'desc' })
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    let totalAmount = 0
    records.forEach(record => {
      totalAmount += record.amount
      record.date = record.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    });
    res.render('index', { records, totalAmount, categories })
  } catch {
    console.log(error)
  }
})

module.exports = router