const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async (req, res) => {
  const record = req.body
  try {
    await Record.create(record)
  } catch {
    console.log(error)
  }
  console.log('record created')
  res.redirect('/')
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router