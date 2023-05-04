const express = require('express')
const router = express.Router()
const Record = require('../../models/record')


router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      records.forEach(record => {
        totalAmount += record.amount
        record.date = record.date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      });
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.log(err))
})

module.exports = router