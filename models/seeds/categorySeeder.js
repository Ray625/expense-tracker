const Category = require('../category')
const db = require('../../config/mongoose')

const categoryList = [
  { category: '家居', icon: 'fa-solid fa-house' },
  { category: '交通', icon: 'fa-solid fa-van-shuttle' },
  { category: '娛樂', icon: 'fa-solid fa-face-grin-beam' },
  { category: '飲食', icon: 'fa-solid fa-utensils' },
  { category: '其他', icon: 'fa-solid fa-pen' }
]

db.once('open', async () => {
  try {
    await Category.create(categoryList)
    console.log('category created')
    process.exit()
  } catch (err) {
    console.log(err)
  }
})

