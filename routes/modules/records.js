const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    res.render('new', { categories })
  } catch {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  const { name, date, category, amount } = req.body
  try {
    const selectedCategory = await Category.findOne({ category }).lean()
    const { _id: categoryId, icon: categoryIcon } = selectedCategory
    await Record.create({ name, date, categoryId, amount, categoryIcon })
    res.redirect('/')
  } catch {
    console.log(error)
  }
})

router.get('/:id/edit', async (req, res) => {
  const id = req.params.id
  try {
    const record = await Record.findById(id).lean()
    record.date = record.date.toISOString().replace(/T.*/, '')
    const categories = await Category.find().lean().sort({ _id: 'asc' })
    const categoriesList = categories.map(category => {
      category.isSelected = category._id.toString() === record.categoryId.toString()
      return category
    })
    res.render('edit', { record, categoriesList })
  } catch {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const { name, date, category, amount, } = req.body
  try {
    const selectedCategory = await Category.findOne({ category }).lean()
    console.log(selectedCategory)
    const { _id: categoryId, icon: categoryIcon } = selectedCategory
    const newData = { name, date, categoryId, amount, categoryIcon }
    const record = await Record.findById(id)
    Object.assign(record, newData)
    await record.save()
    res.redirect(`/`)
  } catch {
    console.log(error)
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const record = await Record.findById(id)
    await record.remove()
    res.redirect('/')
  } catch {
    console.log(error)
  }
})

module.exports = router