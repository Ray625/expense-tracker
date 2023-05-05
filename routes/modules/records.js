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
  res.redirect('/')
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .lean()
    .then(record => {
      record.date = record.date.toISOString().replace(/T.*/, '')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const newdata = req.body
  Record.findById(id)
    .then(record => {
      Object.assign(record, newdata)
      return record.save()
    })
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router