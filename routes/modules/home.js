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

router.get('/category', async (req, res) => {
  const categorySelected = req.query.category // 使用者選的支出類別
  // 類別為'所有'則返回首頁
  if (categorySelected === 'all') {
    return res.redirect('/')
  }
  try {
    // 處理前台變化
    let categoryId
    const categoriesList = await Category.find().lean().sort({ _id: 'asc' })
    const categories = categoriesList.map(category => {
      if (category.category === categorySelected) {
        category.isSelected = true
        categoryId = category._id
      }
      return category
    })
    const records = await Record.find({ categoryId }).lean().sort({ date: 'desc', createAt: 'desc' }) // 按照時間排列
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